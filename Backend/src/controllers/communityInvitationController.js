import crypto from "crypto";
import prisma from "../config/prisma.js";

/* =====================================================
   CREATE COMMUNITY INVITATION
===================================================== */

export const createCommunityInvitation = async (req, res) => {
  try {
    const userId = req.user.userId;

    /*
      Check whether the user already belongs to a community.
      If yes, the invitation will point to that community.
      If no, communityId remains null.
    */

    const existingMembership = await prisma.communityMember.findFirst({
      where: {
        userId,
        status: "ACTIVE",
      },
      orderBy: {
        joinedAt: "asc",
      },
      select: {
        id: true,
        communityId: true,
        community: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    });

    if (existingMembership && !existingMembership.community.isActive) {
      return res.status(400).json({
        success: false,
        message:
          "Your current community is inactive. You cannot create an invitation.",
      });
    }

    /*
      Generate a unique invitation token.
    */

    const token = crypto.randomBytes(32).toString("hex");

    /*
      Invitation expires after 7 days.
    */

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await prisma.communityInvitation.create({
      data: {
        token,

        inviterId: userId,

        communityId: existingMembership?.communityId || null,

        expiresAt,
      },

      include: {
        inviter: {
          select: {
            id: true,
            name: true,
          },
        },

        community: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Invitation created successfully.",

      invitation: {
        id: invitation.id,
        token: invitation.token,
        expiresAt: invitation.expiresAt,

        inviter: invitation.inviter,

        community: invitation.community,
      },
    });
  } catch (error) {
    console.error("Create community invitation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create community invitation.",
    });
  }
};

/* =====================================================
   GET INVITATION DETAILS
===================================================== */

export const getCommunityInvitation = async (req, res) => {
  try {
    const { token } = req.params;

    const invitation = await prisma.communityInvitation.findUnique({
      where: {
        token,
      },

      include: {
        inviter: {
          select: {
            id: true,
            name: true,
          },
        },

        community: {
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
            city: true,
            state: true,
            country: true,
            isActive: true,
          },
        },
      },
    });

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found.",
      });
    }

    if (invitation.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "This invitation is no longer available.",
      });
    }

    if (invitation.expiresAt && invitation.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "This invitation has expired.",
      });
    }

    if (invitation.community && !invitation.community.isActive) {
      return res.status(400).json({
        success: false,
        message: "This community is currently inactive.",
      });
    }

    return res.json({
      success: true,

      invitation: {
        id: invitation.id,
        token: invitation.token,
        expiresAt: invitation.expiresAt,

        inviter: invitation.inviter,

        community: invitation.community,
      },
    });
  } catch (error) {
    console.error("Get community invitation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load invitation.",
    });
  }
};

/* =====================================================
   ACCEPT COMMUNITY INVITATION
===================================================== */

export const acceptCommunityInvitation = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { token } = req.params;

    /*
        Find invitation.
      */

    const invitation = await prisma.communityInvitation.findUnique({
      where: {
        token,
      },
    });

    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: "Invitation not found.",
      });
    }

    if (invitation.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "This invitation is no longer available.",
      });
    }

    if (invitation.expiresAt && invitation.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "This invitation has expired.",
      });
    }

    /*
        Prevent a user from accepting their own invitation.
      */

    if (invitation.inviterId === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot accept your own invitation.",
      });
    }

    /*
        Check whether the invited user is already
        a member of the invitation's community.
      */

    if (invitation.communityId) {
      const existingMembership = await prisma.communityMember.findUnique({
        where: {
          communityId_userId: {
            communityId: invitation.communityId,
            userId,
          },
        },
      });

      if (existingMembership) {
        return res.status(409).json({
          success: false,
          message: "You are already a member of this community.",
        });
      }
    }

    /*
        IMPORTANT:
        Everything below happens inside a transaction.
      */

    const result = await prisma.$transaction(async (tx) => {
      let communityId = invitation.communityId;

      /*
            CASE 1:
            Inviter already belongs to a community.
          */

      if (!communityId) {
        /*
              Check again inside transaction because
              the inviter may have joined/created a
              community after generating the invitation.
            */

        const inviterMembership = await tx.communityMember.findFirst({
          where: {
            userId: invitation.inviterId,
            status: "ACTIVE",
          },
          orderBy: {
            joinedAt: "asc",
          },
          select: {
            communityId: true,
          },
        });

        if (inviterMembership) {
          communityId = inviterMembership.communityId;
        }
      }

      /*
            CASE 2:
            Neither the invitation nor the inviter
            has a community.

            Therefore create a new community.
          */

      if (!communityId) {
        const inviter = await tx.user.findUnique({
          where: {
            id: invitation.inviterId,
          },
          select: {
            id: true,
            name: true,
          },
        });

        if (!inviter) {
          throw new Error("Invitation inviter not found.");
        }

        const newCommunity = await tx.community.create({
          data: {
            name: `${inviter.name}'s Hanumant Seva Community`,

            description: "A community started through Hanumant Seva referrals.",

            createdById: invitation.inviterId,
          },
        });

        communityId = newCommunity.id;

        /*
              Make inviter the ROOT member.
            */

        await tx.communityMember.create({
          data: {
            communityId,
            userId: invitation.inviterId,

            referredById: null,

            role: "MEMBER",

            status: "ACTIVE",
          },
        });
      }

      /*
            Find the inviter's membership inside
            this community.

            This becomes B's parent in the tree.
          */

      let inviterMembership = await tx.communityMember.findUnique({
        where: {
          communityId_userId: {
            communityId,
            userId: invitation.inviterId,
          },
        },
      });

      /*
            Safety fallback.
          */

      if (!inviterMembership) {
        inviterMembership = await tx.communityMember.create({
          data: {
            communityId,
            userId: invitation.inviterId,

            referredById: null,

            role: "MEMBER",

            status: "ACTIVE",
          },
        });
      }

      /*
            Add the invited user underneath
            the inviter.
          */

      const newMember = await tx.communityMember.create({
        data: {
          communityId,

          userId,

          referredById: inviterMembership.id,

          role: "MEMBER",

          status: "ACTIVE",
        },

        include: {
          community: {
            select: {
              id: true,
              name: true,
            },
          },

          referredBy: {
            select: {
              id: true,

              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      /*
            Mark invitation as accepted.
          */

      await tx.communityInvitation.update({
        where: {
          id: invitation.id,
        },

        data: {
          status: "ACCEPTED",
        },
      });

      return newMember;
    });

    return res.status(200).json({
      success: true,

      message:
        "Invitation accepted successfully. You have joined the community.",

      member: result,
    });
  } catch (error) {
    console.error("Accept community invitation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept community invitation.",
    });
  }
};

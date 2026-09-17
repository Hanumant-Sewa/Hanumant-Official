import prisma from "../config/prisma.js";

/* =====================================================
   GET COMMUNITY REFERRERS
===================================================== */

export const getCommunityReferrers = async (req, res) => {
  try {
    const communityId = Number(req.params.communityId);

    if (!Number.isInteger(communityId)) {
      return res.status(400).json({
        message: "Invalid community ID.",
      });
    }

    const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    });

    if (!community) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    if (!community.isActive) {
      return res.status(400).json({
        message: "This community is currently inactive.",
      });
    }

    const members = await prisma.communityMember.findMany({
      where: {
        communityId,
        status: "ACTIVE",
      },
      orderBy: {
        joinedAt: "asc",
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.json({
      success: true,
      community,
      members,
    });
  } catch (error) {
    console.error("Get community referrers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load community members.",
    });
  }
};
/* =====================================================
   JOIN COMMUNITY
===================================================== */

export const joinCommunity = async (req, res) => {
  try {
    const communityId = Number(req.params.communityId);

    const { referredById } = req.body;

    if (!Number.isInteger(communityId)) {
      return res.status(400).json({
        message: "Invalid community ID.",
      });
    }

    const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!community) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    if (!community.isActive) {
      return res.status(400).json({
        message: "This community is currently inactive.",
      });
    }

    const userId = req.user.userId;

    const existingMember = await prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          communityId,
          userId,
        },
      },
    });

    if (existingMember) {
      return res.status(409).json({
        message: "You are already a member of this community.",
      });
    }

    let validReferredById = null;

    if (
      referredById !== undefined &&
      referredById !== null &&
      referredById !== ""
    ) {
      const referrerId = Number(referredById);

      if (!Number.isInteger(referrerId)) {
        return res.status(400).json({
          message: "Invalid referrer.",
        });
      }

      const referrer = await prisma.communityMember.findFirst({
        where: {
          id: referrerId,
          communityId,
          status: "ACTIVE",
        },
      });

      if (!referrer) {
        return res.status(400).json({
          message: "Selected referrer is not a member of this community.",
        });
      }

      validReferredById = referrer.id;
    }

    const member = await prisma.communityMember.create({
      data: {
        communityId,
        userId,
        referredById: validReferredById,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
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

    return res.status(201).json({
      success: true,
      message: "You have joined the community successfully.",
      member,
    });
  } catch (error) {
    console.error("Join community error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to join community.",
    });
  }
};
/* =====================================================
   GET COMMUNITY REFERRAL TREE
===================================================== */

export const getCommunityTree = async (req, res) => {
  try {
    const communityId = Number(req.params.communityId);

    if (!Number.isInteger(communityId)) {
      return res.status(400).json({
        message: "Invalid community ID.",
      });
    }

    const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
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
    });

    if (!community) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    const members = await prisma.communityMember.findMany({
      where: {
        communityId,
        status: "ACTIVE",
      },
      orderBy: {
        joinedAt: "asc",
      },
      select: {
        id: true,
        userId: true,
        referredById: true,
        role: true,
        status: true,
        joinedAt: true,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.json({
      success: true,
      community,
      members,
    });
  } catch (error) {
    console.error("Get community tree error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load community tree.",
    });
  }
};
/* =====================================================
   GET MY COMMUNITY
===================================================== */

export const getMyCommunity = async (req, res) => {
  try {
    const userId = req.user.userId;

    const membership = await prisma.communityMember.findFirst({
      where: {
        userId,
        status: "ACTIVE",
      },
      orderBy: {
        joinedAt: "asc",
      },
      include: {
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
            createdAt: true,
          },
        },
      },
    });

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "You are not a member of any community.",
      });
    }

    return res.status(200).json({
      success: true,
      membership: {
        id: membership.id,
        role: membership.role,
        referredById: membership.referredById,
        joinedAt: membership.joinedAt,
      },
      community: membership.community,
    });
  } catch (error) {
    console.error("Get my community error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load your community.",
    });
  }
};

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Heart,
  Users,
  CalendarDays,
  Award,
  ClipboardList,
  ArrowRight,
  HandHeart,
  LoaderCircle,
  AlertCircle,
  Clock,
  MapPin,
  CheckCircle2,
  UserPlus,
  Copy,
  Check,
  QrCode,
  Share2,
  X,
  ExternalLink,
  WalletCards,
  Building2,
  Target,
  Bell,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Swal from "sweetalert2";

function Dashboard() {
  const navigate = useNavigate();

  // =========================================================
  // DASHBOARD STATE
  // =========================================================

  const [dashboard, setDashboard] = useState(null);
  const [volunteerDashboard, setVolunteerDashboard] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // DONATION STATE
  // =========================================================

  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [donationsError, setDonationsError] = useState("");

  // =========================================================
  // TRANSPARENCY STATE
  // =========================================================

  const [transparency, setTransparency] = useState(null);
  const [transparencyLoading, setTransparencyLoading] = useState(false);
  const [transparencyError, setTransparencyError] = useState("");

  // =========================================================
  // COMMUNITY STATE
  // =========================================================

  const [myCommunity, setMyCommunity] = useState(null);
  const [communityMembers, setCommunityMembers] = useState([]);
  const [communityLoading, setCommunityLoading] = useState(false);
  const [communityError, setCommunityError] = useState("");

  // =========================================================
  // INVITATION STATE
  // =========================================================

  const [invitation, setInvitation] = useState(null);
  const [invitationLoading, setInvitationLoading] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const [copied, setCopied] = useState(false);

  // =========================================================
  // FETCH MAIN DASHBOARD
  // =========================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const dashboardResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/dashboard`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (dashboardResponse.status === 401) {
          navigate("/login");
          return;
        }

        const dashboardData = await dashboardResponse.json();

        if (!dashboardResponse.ok) {
          throw new Error(dashboardData.message || "Failed to load dashboard");
        }

        setDashboard(dashboardData);

        // =====================================================
        // VOLUNTEER DASHBOARD
        // =====================================================

        try {
          const volunteerResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/volunteer-dashboard`,
            {
              method: "GET",
              credentials: "include",
            },
          );

          if (volunteerResponse.ok) {
            const volunteerData = await volunteerResponse.json();

            setVolunteerDashboard(volunteerData);
          }
        } catch (volunteerError) {
          console.log("Volunteer dashboard unavailable:", volunteerError);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);

        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // =========================================================
  // FETCH USER DONATIONS
  // =========================================================

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        setDonationsLoading(true);
        setDonationsError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/donations/my`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load your donations.");
        }

        const donationList = data.donations || data.data || [];

        setDonations(Array.isArray(donationList) ? donationList : []);
      } catch (err) {
        console.error("Donation History Error:", err);

        setDonationsError(err.message || "Unable to load donation history.");
      } finally {
        setDonationsLoading(false);
      }
    };

    fetchMyDonations();
  }, [navigate]);

  // =========================================================
  // FETCH TRANSPARENCY
  // =========================================================

  useEffect(() => {
    const fetchTransparency = async () => {
      try {
        setTransparencyLoading(true);
        setTransparencyError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/transparency`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load transparency information.",
          );
        }

        setTransparency(data);
      } catch (err) {
        console.error("Transparency Error:", err);

        setTransparencyError(
          err.message || "Unable to load transparency information.",
        );
      } finally {
        setTransparencyLoading(false);
      }
    };

    fetchTransparency();
  }, []);

  // =========================================================
  // FETCH MY COMMUNITY
  // =========================================================

  useEffect(() => {
    const fetchMyCommunity = async () => {
      try {
        setCommunityLoading(true);
        setCommunityError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/communities/my`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        /*
          404 means the user has not joined
          a community yet.
        */

        if (response.status === 404) {
          setMyCommunity(null);
          setCommunityMembers([]);
          return;
        }

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load your community.");
        }

        setMyCommunity({
          membership: data.membership,
          community: data.community,
        });

        // =====================================================
        // FETCH COMMUNITY TREE
        // =====================================================

        const communityId = data.community?.id;

        if (!communityId) {
          return;
        }

        const treeResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/communities/${communityId}/tree`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (treeResponse.ok) {
          const treeData = await treeResponse.json();

          setCommunityMembers(
            Array.isArray(treeData.members) ? treeData.members : [],
          );
        }
      } catch (err) {
        console.error("Community Error:", err);

        setCommunityError(err.message || "Unable to load your community.");
      } finally {
        setCommunityLoading(false);
      }
    };

    fetchMyCommunity();
  }, [navigate]);

  // =========================================================
  // CREATE INVITATION
  // =========================================================

  const handleCreateInvitation = async () => {
    try {
      setInvitationLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/community-invitations/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to create invitation.");
      }

      const token = data.invitation?.token;

      if (!token) {
        throw new Error("Invitation token was not returned.");
      }

      const invitationUrl = `${window.location.origin}/community/invite/${token}`;

      setInvitation({
        ...data.invitation,
        url: invitationUrl,
      });

      setCopied(false);
    } catch (error) {
      console.error("Invitation Error:", error);

      Swal.fire({
        title: "Unable to Create Invitation",
        text: error.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#fffaf3",
        color: "#3b2a1f",
        confirmButtonColor: "#e87524",
      });
    } finally {
      setInvitationLoading(false);
    }
  };

  // =========================================================
  // COPY INVITATION
  // =========================================================

  const handleCopyInvitation = async () => {
    if (!invitation?.url) return;

    try {
      await navigator.clipboard.writeText(invitation.url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setShowInviteModal(false);
      }, 900);
    } catch (error) {
      console.error("Copy Error:", error);

      Swal.fire({
        title: "Copy Failed",
        text: "Please copy the invitation link manually.",
        icon: "warning",
        confirmButtonText: "OK",
        background: "#fffaf3",
        color: "#3b2a1f",
        confirmButtonColor: "#e87524",
      });
    }
  };

  // =========================================================
  // SHARE INVITATION
  // =========================================================

  const handleShareInvitation = async () => {
    if (!invitation?.url) return;

    const shareData = {
      title: "Join Hanumant Seva",
      text:
        `${user?.name || "A Hanumant Seva member"} ` +
        "invited you to join Hanumant Seva.",
      url: invitation.url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);

        setShowInviteModal(false);
      } else {
        await navigator.clipboard.writeText(invitation.url);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
          setShowInviteModal(false);
        }, 900);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share Error:", error);

        Swal.fire({
          title: "Unable to Share",
          text: "We could not open the sharing options.",
          icon: "warning",
          confirmButtonText: "OK",
          background: "#fffaf3",
          color: "#3b2a1f",
          confirmButtonColor: "#e87524",
        });
      }
    }
  };

  // =========================================================
  // OPEN INVITE MODAL
  // =========================================================

  const handleOpenInvite = async () => {
    setShowInviteModal(true);

    if (!invitation) {
      await handleCreateInvitation();
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatAmount = (amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      return "₹0";
    }

    return numericAmount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  // =========================================================
  // BUILD COMMUNITY TREE
  // =========================================================

  const buildCommunityTree = () => {
    if (!communityMembers.length) {
      return [];
    }

    const memberMap = new Map();

    communityMembers.forEach((member) => {
      memberMap.set(member.id, {
        ...member,
        children: [],
      });
    });

    const roots = [];

    communityMembers.forEach((member) => {
      const currentMember = memberMap.get(member.id);

      if (member.referredById && memberMap.has(member.referredById)) {
        memberMap.get(member.referredById).children.push(currentMember);
      } else {
        roots.push(currentMember);
      }
    });

    return roots;
  };

  // =========================================================
  // RENDER COMMUNITY TREE
  // =========================================================

  const renderCommunityMember = (member, level = 0) => {
    return (
      <div
        key={member.id}
        style={{
          marginLeft: level > 0 ? `${Math.min(level * 22, 88)}px` : "0",
          marginBottom: "10px",
        }}
      >
        <div className="profile-detail-item">
          <div className="profile-detail-icon">
            <User size={18} />
          </div>

          <div>
            <span>{level === 0 ? "Community Member" : "Referred Member"}</span>

            <strong>{member.user?.name || "Member"}</strong>
          </div>
        </div>

        {member.children?.map((child) =>
          renderCommunityMember(child, level + 1),
        )}
      </div>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <LoaderCircle className="loading-spinner" size={40} />

        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="dashboard-error">
        <AlertCircle size={40} />

        <h2>Unable to load dashboard</h2>

        <p>{error}</p>

        <button
          type="button"
          className="dashboard-outline-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  // =========================================================
  // DATA
  // =========================================================

  const { user, stats = {} } = dashboard;

  const isVolunteer = user?.role === "VOLUNTEER";

  const isUser = user?.role === "USER";

  const volunteerProfile = volunteerDashboard?.volunteerProfile || {};

  const application = volunteerDashboard?.application || {};

  const volunteerStats = volunteerDashboard?.statistics || {};

  const upcomingEvents = volunteerDashboard?.upcomingEvents || [];

  const tasks = volunteerDashboard?.tasks || [];

  const communityTree = buildCommunityTree();

  // =========================================================
  // DONATION HELPERS
  // =========================================================

  const getDonationAmount = (donation) => {
    return (
      donation?.amount || donation?.amountPaid || donation?.totalAmount || 0
    );
  };

  const getDonationStatus = (donation) => {
    return String(donation?.status || "").toUpperCase();
  };

  const successfulDonations = donations.filter(
    (donation) => getDonationStatus(donation) === "SUCCESS",
  );

  const totalDonated = successfulDonations.reduce(
    (total, donation) => total + Number(getDonationAmount(donation)),
    0,
  );

  const transparencySummary = transparency?.summary || {};

  const recentExpenses = transparency?.recentExpenses || [];

  const totalTransparencyDonations = Number(
    transparencySummary.totalDonations || 0,
  );

  const totalTransparencyExpenses = Number(
    transparencySummary.totalExpenses || 0,
  );

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="dashboard-page">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="dashboard-hero">
        <div className="dashboard-container">
          <div className="dashboard-welcome">
            <div className="dashboard-avatar">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="dashboard-welcome-content">
              <span className="dashboard-label">Welcome back</span>

              <h1>{user?.name}</h1>

              <p>
                {isVolunteer
                  ? "Continue your journey of seva and compassion."
                  : "Continue your journey with Hanumant Seva."}
              </p>
            </div>
          </div>

          <div className="dashboard-status">
            <span className="status-dot"></span>

            {user?.status}
          </div>
        </div>
      </section>

      {/* ===================================================
          MAIN CONTAINER
      =================================================== */}

      <main className="dashboard-container">
        {/* =================================================
            STATS
        ================================================= */}

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <Heart size={22} />
            </div>

            <div>
              <span className="stat-label">Donations</span>

              <strong>{stats.donations || 0}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <HandHeart size={22} />
            </div>

            <div>
              <span className="stat-label">Volunteer Applications</span>

              <strong>{stats.volunteerApplications || 0}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <Users size={22} />
            </div>

            <div>
              <span className="stat-label">Communities</span>

              <strong>{stats.communities || 0}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span className="stat-label">Events</span>

              <strong>{stats.events || 0}</strong>
            </div>
          </div>

          {isVolunteer && (
            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <ClipboardList size={22} />
              </div>

              <div>
                <span className="stat-label">Tasks</span>

                <strong>
                  {volunteerStats.tasksCompleted || volunteerStats.tasks || 0}
                </strong>
              </div>
            </div>
          )}
        </section>

        {/* =================================================
            PROFILE + QUICK ACTIONS
        ================================================= */}

        <div className="dashboard-main-grid">
          {/* ================= PROFILE ================= */}

          <section className="dashboard-card profile-card">
            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">My Profile</span>

                <h2>Personal Information</h2>
              </div>

              <User size={22} />
            </div>

            <div className="profile-details">
              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <User size={18} />
                </div>

                <div>
                  <span>Name</span>

                  <strong>{user?.name || "-"}</strong>
                </div>
              </div>

              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <Mail size={18} />
                </div>

                <div>
                  <span>Email</span>

                  <strong>{user?.email || "-"}</strong>
                </div>
              </div>

              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <Phone size={18} />
                </div>

                <div>
                  <span>Phone</span>

                  <strong>{user?.phone || "-"}</strong>
                </div>
              </div>

              <div className="profile-detail-item">
                <div className="profile-detail-icon">
                  <Award size={18} />
                </div>

                <div>
                  <span>Role</span>

                  <strong>{user?.role || "-"}</strong>
                </div>
              </div>
            </div>

            <Link to="/volunteer/profile" className="dashboard-outline-button">
              View Profile
              <ArrowRight size={17} />
            </Link>
          </section>

          {/* ================= QUICK ACTIONS ================= */}

          <section className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">Quick Access</span>

                <h2>What would you like to do?</h2>
              </div>

              <ArrowRight size={22} />
            </div>

            <div className="quick-actions">
              {isUser && (
                <Link to="/volunteer" className="quick-action">
                  <div className="quick-action-icon">
                    <HandHeart size={21} />
                  </div>

                  <div>
                    <strong>Become a Volunteer</strong>

                    <span>Join our seva activities</span>
                  </div>

                  <ArrowRight size={17} />
                </Link>
              )}

              <Link to="/donate" className="quick-action">
                <div className="quick-action-icon">
                  <Heart size={21} />
                </div>

                <div>
                  <strong>Make a Donation</strong>

                  <span>Support our mission</span>
                </div>

                <ArrowRight size={17} />
              </Link>

              <Link to="/community" className="quick-action">
                <div className="quick-action-icon">
                  <Users size={21} />
                </div>

                <div>
                  <strong>Join Community</strong>

                  <span>Connect with others</span>
                </div>

                <ArrowRight size={17} />
              </Link>

              <button
                type="button"
                className="quick-action"
                onClick={handleOpenInvite}
              >
                <div className="quick-action-icon">
                  <UserPlus size={21} />
                </div>

                <div>
                  <strong>Invite Friends</strong>

                  <span>Grow the Seva community</span>
                </div>

                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        </div>

        {/* =================================================
            MY DONATIONS
        ================================================= */}

        <section className="dashboard-card dashboard-full-card">
          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">Your Support</span>

              <h2>Your Donation History</h2>
            </div>

            <WalletCards size={22} />
          </div>

          {donationsLoading ? (
            <div className="dashboard-empty-state">
              <LoaderCircle size={35} className="loading-spinner" />

              <h3>Loading your donations</h3>

              <p>We're retrieving your donation history.</p>
            </div>
          ) : donationsError ? (
            <div className="dashboard-empty-state">
              <AlertCircle size={35} />

              <h3>Unable to load donations</h3>

              <p>{donationsError}</p>

              <button
                type="button"
                className="dashboard-outline-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : donations.length === 0 ? (
            <div className="dashboard-empty-state">
              <Heart size={35} />

              <h3>No donations yet</h3>

              <p>
                Your donation history will appear here whenever you support
                Hanumant Seva.
              </p>

              <Link to="/donate" className="dashboard-outline-button">
                Make Your First Donation
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <>
              <div className="activity-grid">
                <div className="activity-item">
                  <div className="activity-icon">
                    <Heart size={20} />
                  </div>

                  <div>
                    <span>Successful Donations</span>

                    <strong>{successfulDonations.length}</strong>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">
                    <WalletCards size={20} />
                  </div>

                  <div>
                    <span>Total Supported</span>

                    <strong>{formatAmount(totalDonated)}</strong>
                  </div>
                </div>
              </div>

              <div className="dashboard-events">
                {donations.slice(0, 5).map((donation) => {
                  const status = getDonationStatus(donation);

                  return (
                    <div
                      className="dashboard-event"
                      key={donation.id || donation._id}
                    >
                      <div className="dashboard-event-icon">
                        <Heart size={20} />
                      </div>

                      <div className="dashboard-event-content">
                        <h3>Donation to Hanumant Seva</h3>

                        <p>
                          Your donation supports Hanumant Seva's ongoing
                          programs and activities.
                        </p>

                        <div className="dashboard-event-meta">
                          <span>
                            <WalletCards size={15} />

                            {formatAmount(getDonationAmount(donation))}
                          </span>

                          <span>
                            <CalendarDays size={15} />

                            {formatDate(
                              donation.createdAt ||
                                donation.donatedAt ||
                                donation.date,
                            )}
                          </span>

                          <span>
                            <CheckCircle2 size={15} />

                            {status || "PENDING"}
                          </span>
                        </div>

                        {status === "SUCCESS" && (
                          <div
                            style={{
                              marginTop: "12px",
                            }}
                          >
                            <button
                              type="button"
                              className="dashboard-outline-button"
                              onClick={() => {
                                document
                                  .getElementById("dashboard-transparency")
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                  });
                              }}
                            >
                              See Fund Utilization
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>

        {/* =================================================
            MY COMMUNITY
        ================================================= */}

        <section className="dashboard-card dashboard-full-card">
          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">Community</span>

              <h2>My Community</h2>
            </div>

            <Users size={22} />
          </div>

          {communityLoading ? (
            <div className="dashboard-empty-state">
              <LoaderCircle size={35} className="loading-spinner" />

              <h3>Loading your community</h3>

              <p>We're loading your community connections.</p>
            </div>
          ) : communityError ? (
            <div className="dashboard-empty-state">
              <AlertCircle size={35} />

              <h3>Unable to load community</h3>

              <p>{communityError}</p>
            </div>
          ) : !myCommunity?.community ? (
            <div className="dashboard-empty-state">
              <Users size={35} />

              <h3>You're not part of a community yet</h3>

              <p>
                Join a community or accept an invitation from another Hanumant
                Seva member.
              </p>

              <Link to="/community/join" className="dashboard-outline-button">
                Join a Community
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <>
              <div className="profile-details">
                <div className="profile-detail-item">
                  <div className="profile-detail-icon">
                    <Building2 size={18} />
                  </div>

                  <div>
                    <span>Community</span>

                    <strong>{myCommunity.community.name}</strong>
                  </div>
                </div>

                <div className="profile-detail-item">
                  <div className="profile-detail-icon">
                    <Users size={18} />
                  </div>

                  <div>
                    <span>Members</span>

                    <strong>{communityMembers.length}</strong>
                  </div>
                </div>

                <div className="profile-detail-item">
                  <div className="profile-detail-icon">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <span>Joined</span>

                    <strong>
                      {formatDate(myCommunity.membership?.joinedAt)}
                    </strong>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "24px",
                }}
              >
                <div className="dashboard-card-header">
                  <div>
                    <span className="card-eyebrow">Referral Network</span>

                    <h2>Community Tree</h2>
                  </div>

                  <Users size={20} />
                </div>

                {communityTree.length > 0 ? (
                  <div className="profile-details">
                    {communityTree.map((rootMember) =>
                      renderCommunityMember(rootMember),
                    )}
                  </div>
                ) : (
                  <div className="dashboard-empty-state">
                    <Users size={30} />

                    <h3>No community connections yet</h3>

                    <p>Invite friends to grow your community network.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        {/* =================================================
            TRANSPARENCY
        ================================================= */}

        <section
          className="dashboard-card dashboard-full-card"
          id="dashboard-transparency"
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">Transparency</span>

              <h2>How Donations Are Used</h2>
            </div>

            <WalletCards size={22} />
          </div>

          <p
            style={{
              marginBottom: "24px",
            }}
          >
            Donations are pooled to support Hanumant Seva's programs. Expenses
            recorded by the organization are shown below for transparency.
          </p>

          {transparencyLoading ? (
            <div className="dashboard-empty-state">
              <LoaderCircle size={35} className="loading-spinner" />

              <h3>Loading transparency information</h3>

              <p>
                We're retrieving the latest donation and fund utilization
                details.
              </p>
            </div>
          ) : transparencyError ? (
            <div className="dashboard-empty-state">
              <AlertCircle size={35} />

              <h3>Unable to load transparency information</h3>

              <p>{transparencyError}</p>

              <button
                type="button"
                className="dashboard-outline-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="activity-grid">
                <div className="activity-item">
                  <div className="activity-icon">
                    <Heart size={20} />
                  </div>

                  <div>
                    <span>Total Donations Received</span>

                    <strong>{formatAmount(totalTransparencyDonations)}</strong>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">
                    <WalletCards size={20} />
                  </div>

                  <div>
                    <span>Funds Utilized</span>

                    <strong>{formatAmount(totalTransparencyExpenses)}</strong>
                  </div>
                </div>
              </div>

              {recentExpenses.length > 0 ? (
                <div
                  className="dashboard-events"
                  style={{
                    marginTop: "24px",
                  }}
                >
                  {recentExpenses.slice(0, 5).map((expense) => (
                    <div className="dashboard-event" key={expense.id}>
                      <div className="dashboard-event-icon">
                        <WalletCards size={20} />
                      </div>

                      <div className="dashboard-event-content">
                        <h3>{expense.title}</h3>

                        <p>
                          {expense.description ||
                            "Campaign expense recorded by Hanumant Seva."}
                        </p>

                        <div className="dashboard-event-meta">
                          <span>
                            <WalletCards size={15} />

                            {formatAmount(expense.amount)}
                          </span>

                          <span>
                            <CalendarDays size={15} />

                            {formatDate(expense.expenseDate)}
                          </span>

                          {expense.category && (
                            <span>
                              <ClipboardList size={15} />

                              {expense.category}
                            </span>
                          )}
                        </div>

                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "14px",
                          }}
                        >
                          <strong>Campaign:</strong>{" "}
                          {expense.campaign?.title || "Campaign"}
                        </div>

                        {expense.receiptUrl && (
                          <div
                            style={{
                              marginTop: "12px",
                            }}
                          >
                            <a
                              href={expense.receiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="dashboard-outline-button"
                            >
                              View Receipt
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty-state">
                  <WalletCards size={35} />

                  <h3>No expenses recorded yet</h3>

                  <p>
                    Campaign expenses will appear here as funds are utilized.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* =================================================
            VOLUNTEER APPLICATION
        ================================================= */}

        {application?.status && (
          <section className="dashboard-card dashboard-full-card">
            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">Volunteer Journey</span>

                <h2>Application Status</h2>
              </div>

              {application.status === "APPROVED" ? (
                <CheckCircle2 size={24} />
              ) : (
                <Clock size={24} />
              )}
            </div>

            <div className="volunteer-application-status">
              <div className="application-status-content">
                <span>Current Status</span>

                <strong>{application.status}</strong>

                {application.preferredArea && (
                  <p>Preferred Activities: {application.preferredArea}</p>
                )}
              </div>

              <Link
                to="/volunteer/application-status"
                className="dashboard-outline-button"
              >
                View Application
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        )}

        {/* =================================================
            UPCOMING EVENTS
        ================================================= */}

        {isVolunteer && (
          <section className="dashboard-card dashboard-full-card">
            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">Volunteer Activities</span>

                <h2>Upcoming Events</h2>
              </div>

              <CalendarDays size={22} />
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="dashboard-events">
                {upcomingEvents.map((event) => (
                  <div className="dashboard-event" key={event.id}>
                    <div className="dashboard-event-icon">
                      <CalendarDays size={20} />
                    </div>

                    <div className="dashboard-event-content">
                      <h3>{event.title}</h3>

                      {event.description && <p>{event.description}</p>}

                      <div className="dashboard-event-meta">
                        {event.location && (
                          <span>
                            <MapPin size={15} />
                            {event.location}
                          </span>
                        )}

                        <span>
                          <CalendarDays size={15} />

                          {event.startDate ? formatDate(event.startDate) : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <CalendarDays size={35} />

                <h3>No upcoming events</h3>

                <p>New volunteer opportunities will appear here.</p>

                <Link
                  to="/volunteer/events"
                  className="dashboard-outline-button"
                >
                  Explore Events
                  <ArrowRight size={17} />
                </Link>
              </div>
            )}
          </section>
        )}

        {/* =================================================
            CURRENT TASKS
        ================================================= */}

        {isVolunteer && (
          <section className="dashboard-card dashboard-full-card">
            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">My Work</span>

                <h2>Current Tasks</h2>
              </div>

              <ClipboardList size={22} />
            </div>

            {tasks.length > 0 ? (
              <div className="dashboard-task-list">
                {tasks.map((task) => (
                  <div className="dashboard-task" key={task.id}>
                    <div className="dashboard-task-icon">
                      <ClipboardList size={20} />
                    </div>

                    <div className="dashboard-task-content">
                      <h3>{task.title}</h3>

                      {task.description && <p>{task.description}</p>}

                      <span
                        className={`task-status task-${String(
                          task.status || "",
                        ).toLowerCase()}`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <ClipboardList size={35} />

                <h3>No current tasks</h3>

                <p>Your assigned volunteer tasks will appear here.</p>

                <Link
                  to="/volunteer/tasks"
                  className="dashboard-outline-button"
                >
                  View My Tasks
                  <ArrowRight size={17} />
                </Link>
              </div>
            )}
          </section>
        )}

        {/* =================================================
            VOLUNTEER RESOURCES
        ================================================= */}

        {isVolunteer && (
          <section className="dashboard-card dashboard-full-card">
            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">Volunteer Resources</span>

                <h2>Manage Your Seva</h2>
              </div>

              <HandHeart size={22} />
            </div>

            <div className="quick-actions">
              <Link to="/volunteer/events" className="quick-action">
                <div className="quick-action-icon">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <strong>Volunteer Events</strong>

                  <span>View upcoming seva activities</span>
                </div>

                <ArrowRight size={17} />
              </Link>

              <Link to="/volunteer/tasks" className="quick-action">
                <div className="quick-action-icon">
                  <ClipboardList size={21} />
                </div>

                <div>
                  <strong>My Tasks</strong>

                  <span>Manage your volunteer work</span>
                </div>

                <ArrowRight size={17} />
              </Link>

              <Link to="/volunteer/certificates" className="quick-action">
                <div className="quick-action-icon">
                  <Award size={21} />
                </div>

                <div>
                  <strong>My Certificates</strong>

                  <span>View your achievements</span>
                </div>

                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        )}

        {/* =================================================
            YOUR IMPACT
        ================================================= */}

        <section className="dashboard-card dashboard-full-card">
          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">Your Contribution</span>

              <h2>Your Impact</h2>
            </div>

            <Target size={22} />
          </div>

          <div className="activity-grid">
            <div className="activity-item">
              <div className="activity-icon">
                <Clock size={20} />
              </div>

              <div>
                <span>Volunteer Hours</span>

                <strong>{volunteerProfile.totalHours || 0}</strong>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <CalendarDays size={20} />
              </div>

              <div>
                <span>Events Participated</span>

                <strong>{volunteerProfile.totalEvents || 0}</strong>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <Award size={20} />
              </div>

              <div>
                <span>Certificates</span>

                <strong>{stats.certificates || 0}</strong>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <Heart size={20} />
              </div>

              <div>
                <span>Impact</span>

                <strong>{volunteerStats.impact || 0}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            EXPLORE
        ================================================= */}

        <section className="dashboard-card dashboard-full-card">
          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">Discover</span>

              <h2>Explore Hanumant Seva</h2>
            </div>

            <Heart size={22} />
          </div>

          <div className="quick-actions">
            <Link to="/volunteer/certificates" className="quick-action">
              <div className="quick-action-icon">
                <Award size={21} />
              </div>

              <div>
                <strong>My Certificates</strong>

                <span>View your achievements</span>
              </div>

              <ArrowRight size={17} />
            </Link>

            <Link to="/volunteer/tasks" className="quick-action">
              <div className="quick-action-icon">
                <ClipboardList size={21} />
              </div>

              <div>
                <strong>My Tasks</strong>

                <span>Manage your volunteer work</span>
              </div>

              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* =================================================
            ACCOUNT OVERVIEW
        ================================================= */}

        <section className="dashboard-card dashboard-full-card">
          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">Overview</span>

              <h2>Account Overview</h2>
            </div>

            <User size={22} />
          </div>

          <div className="activity-grid">
            <div className="activity-item">
              <div className="activity-icon">
                <ClipboardList size={20} />
              </div>

              <div>
                <span>Tasks</span>

                <strong>{stats.tasks || 0}</strong>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <Award size={20} />
              </div>

              <div>
                <span>Certificates</span>

                <strong>{stats.certificates || 0}</strong>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <Bell size={20} />
              </div>

              <div>
                <span>Notifications</span>

                <strong>{stats.notifications || 0}</strong>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <CalendarDays size={20} />
              </div>

              <div>
                <span>Events</span>

                <strong>{stats.events || 0}</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          INVITE FRIENDS MODAL
      ===================================================== */}

      {showInviteModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="invite-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowInviteModal(false)}
        >
          <div
            className="dashboard-card"
            style={{
              width: "min(100%, 560px)",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close invitation"
              onClick={() => setShowInviteModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <X size={22} />
            </button>

            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">Community</span>

                <h2 id="invite-modal-title">Invite Friends</h2>
              </div>

              <UserPlus size={22} />
            </div>

            {invitationLoading ? (
              <div className="dashboard-empty-state">
                <LoaderCircle size={35} className="loading-spinner" />

                <h3>Creating your invitation</h3>

                <p>Please wait a moment.</p>
              </div>
            ) : !invitation ? (
              <div className="dashboard-empty-state">
                <UserPlus size={35} />

                <h3>Bring someone into the Seva family</h3>

                <p>
                  Create a personal invitation and share it with someone you
                  know.
                </p>

                <button
                  type="button"
                  className="dashboard-outline-button"
                  onClick={handleCreateInvitation}
                >
                  <UserPlus size={17} />
                  Create Invitation
                </button>
              </div>
            ) : (
              <>
                <div className="dashboard-empty-state">
                  {copied ? <Check size={35} /> : <Share2 size={35} />}

                  <h3>{copied ? "Link copied" : "Your invitation is ready"}</h3>

                  <p>
                    Share the link with a friend. After they register or log in,
                    they can accept your invitation.
                  </p>
                </div>

                <div className="profile-details">
                  <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                      <Share2 size={18} />
                    </div>

                    <div>
                      <span>Invitation Link</span>

                      <strong
                        style={{
                          wordBreak: "break-all",
                        }}
                      >
                        {invitation.url}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="quick-actions">
                  <button
                    type="button"
                    className="quick-action"
                    onClick={handleCopyInvitation}
                  >
                    <div className="quick-action-icon">
                      {copied ? <Check size={21} /> : <Copy size={21} />}
                    </div>

                    <div>
                      <strong>{copied ? "Link Copied" : "Copy Link"}</strong>

                      <span>Copy and share anywhere</span>
                    </div>

                    <ArrowRight size={17} />
                  </button>

                  <button
                    type="button"
                    className="quick-action"
                    onClick={handleShareInvitation}
                  >
                    <div className="quick-action-icon">
                      <Share2 size={21} />
                    </div>

                    <div>
                      <strong>Share Invitation</strong>

                      <span>Share through available apps</span>
                    </div>

                    <ArrowRight size={17} />
                  </button>

                  <button
                    type="button"
                    className="quick-action"
                    onClick={() => setShowQrModal(true)}
                  >
                    <div className="quick-action-icon">
                      <QrCode size={21} />
                    </div>

                    <div>
                      <strong>Show QR Code</strong>

                      <span>Let your friend scan to join</span>
                    </div>

                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          QR CODE MODAL
      ===================================================== */}

      {showQrModal && invitation?.url && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="dashboard-card"
            style={{
              width: "min(100%, 430px)",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close QR code"
              onClick={() => setShowQrModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <X size={22} />
            </button>

            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">Invitation</span>

                <h2 id="qr-modal-title">Scan to Join</h2>
              </div>

              <QrCode size={22} />
            </div>

            <div className="dashboard-empty-state">
              <p>
                Ask your friend to scan this QR code using their phone camera.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  margin: "15px auto 20px",
                  width: "fit-content",
                }}
              >
                <QRCodeSVG value={invitation.url} size={220} level="H" />
              </div>

              <button
                type="button"
                className="dashboard-outline-button"
                onClick={() => setShowQrModal(false)}
              >
                Done
                <Check size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

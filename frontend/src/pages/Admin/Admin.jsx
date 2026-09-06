import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  IndianRupee,
  Megaphone,
  CalendarDays,
  UsersRound,
  ClipboardList,
  ShieldCheck,
  Menu,
  X,
  RefreshCw,
  CheckCircle,
  XCircle,
  Eye,
  Home,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "../../css/Admin.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/admin`;

function Admin() {
  const { user, logout } = useAuth();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [events, setEvents] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationFilter, setApplicationFilter] = useState("PENDING");
  const [refreshing, setRefreshing] = useState(false);

  /* =====================================================
     API HELPER
  ===================================================== */

  const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  };

  /* =====================================================
     DASHBOARD
  ===================================================== */

  const loadDashboard = async () => {
    const data = await apiRequest("/dashboard");
    setDashboard(data);
  };

  /* =====================================================
     USERS
  ===================================================== */

  const loadUsers = async () => {
    const data = await apiRequest("/users");
    setUsers(data.users || []);
  };

  /* =====================================================
     VOLUNTEER APPLICATIONS
  ===================================================== */

  const loadApplications = async () => {
    const endpoint =
      applicationFilter === "ALL"
        ? "/volunteer-applications"
        : `/volunteer-applications?status=${applicationFilter}`;

    const data = await apiRequest(endpoint);

    setApplications(data.applications || []);
  };

  /* =====================================================
     DONATIONS
  ===================================================== */

  const loadDonations = async () => {
    const data = await apiRequest("/donations");

    setDonations(data.donations || []);
  };

  /* =====================================================
     CAMPAIGNS
  ===================================================== */

  const loadCampaigns = async () => {
    const data = await apiRequest("/campaigns");

    setCampaigns(data.campaigns || []);
  };

  /* =====================================================
     EVENTS
  ===================================================== */

  const loadEvents = async () => {
    const data = await apiRequest("/events");

    setEvents(data.events || []);
  };

  /* =====================================================
     COMMUNITIES
  ===================================================== */

  const loadCommunities = async () => {
    const data = await apiRequest("/communities");

    setCommunities(data.communities || []);
  };

  /* =====================================================
     AUDIT LOGS
  ===================================================== */

  const loadAuditLogs = async () => {
    const data = await apiRequest("/audit-logs");

    setAuditLogs(data.logs || []);
  };

  /* =====================================================
     LOAD SECTION
  ===================================================== */

  const loadSection = async (section = activeSection) => {
    try {
      setLoading(true);

      switch (section) {
        case "dashboard":
          await loadDashboard();
          break;

        case "users":
          await loadUsers();
          break;

        case "volunteers":
          await loadApplications();
          break;

        case "donations":
          await loadDonations();
          break;

        case "campaigns":
          await loadCampaigns();
          break;

        case "events":
          await loadEvents();
          break;

        case "communities":
          await loadCommunities();
          break;

        case "audit":
          await loadAuditLogs();
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Unable to Load",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadSection("dashboard");
  }, []);

  useEffect(() => {
    if (activeSection !== "dashboard") {
      loadSection(activeSection);
    }
  }, [activeSection, applicationFilter]);

  /* =====================================================
     REFRESH
  ===================================================== */

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await loadSection(activeSection);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Dashboard refreshed",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  /* =====================================================
     APPROVE APPLICATION
  ===================================================== */

  const approveApplication = async (application) => {
    const result = await Swal.fire({
      title: "Approve Volunteer?",
      text: `Approve ${application.user.name} as a volunteer?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await apiRequest(`/volunteer-applications/${application.id}/approve`, {
        method: "PATCH",
        body: JSON.stringify({
          adminRemarks: "Approved by administrator.",
        }),
      });

      Swal.fire({
        title: "Approved",
        text: `${application.user.name} is now a volunteer.`,
        icon: "success",
        confirmButtonColor: "#e87524",
      });

      setSelectedApplication(null);

      await loadApplications();
      await loadDashboard();
    } catch (error) {
      Swal.fire({
        title: "Approval Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     REJECT APPLICATION
  ===================================================== */

  const rejectApplication = async (application) => {
    const { value: remarks } = await Swal.fire({
      title: "Reject Application",
      input: "textarea",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Enter reason...",
      inputAttributes: {
        "aria-label": "Reason for rejection",
      },
      showCancelButton: true,
      confirmButtonText: "Reject Application",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      inputValidator: (value) => {
        if (!value?.trim()) {
          return "Please provide a reason.";
        }

        return undefined;
      },
    });

    if (!remarks) {
      return;
    }

    try {
      await apiRequest(`/volunteer-applications/${application.id}/reject`, {
        method: "PATCH",
        body: JSON.stringify({
          adminRemarks: remarks.trim(),
        }),
      });

      Swal.fire({
        title: "Application Rejected",
        icon: "success",
        confirmButtonColor: "#e87524",
      });

      setSelectedApplication(null);

      await loadApplications();
      await loadDashboard();
    } catch (error) {
      Swal.fire({
        title: "Rejection Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     USER STATUS
  ===================================================== */

  const changeUserStatus = async (selectedUser, status) => {
    try {
      await apiRequest(`/users/${selectedUser.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
        }),
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "User status updated",
        showConfirmButton: false,
        timer: 1600,
      });

      await loadUsers();
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e87524",
      });
    }
  };

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const navigateSection = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  /* =====================================================
     BACK TO WEBSITE
  ===================================================== */

  const handleBackToWebsite = () => {
    window.location.href = "/";
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  /* =====================================================
     FORMAT
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  /* =====================================================
     SIDEBAR ITEMS
  ===================================================== */

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "volunteers",
      label: "Volunteer Applications",
      icon: HeartHandshake,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "donations",
      label: "Donations",
      icon: IndianRupee,
    },
    {
      id: "campaigns",
      label: "Campaigns",
      icon: Megaphone,
    },
    {
      id: "events",
      label: "Events",
      icon: CalendarDays,
    },
    {
      id: "communities",
      label: "Communities",
      icon: UsersRound,
    },
    {
      id: "audit",
      label: "Audit Logs",
      icon: ShieldCheck,
    },
  ];

  /* =====================================================
     RENDER DASHBOARD
  ===================================================== */

  const renderDashboard = () => {
    if (!dashboard) return null;

    const stats = dashboard.stats;

    return (
      <div className="admin-dashboard-home">
        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Users size={22} />
            </div>

            <div>
              <span>Total Users</span>
              <strong>{stats.totalUsers}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <HeartHandshake size={22} />
            </div>

            <div>
              <span>Volunteers</span>
              <strong>{stats.totalVolunteers}</strong>
            </div>
          </div>

          <div className="admin-stat-card admin-stat-warning">
            <div className="admin-stat-icon">
              <ClipboardList size={22} />
            </div>

            <div>
              <span>Pending Applications</span>
              <strong>{stats.pendingVolunteerApplications}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <IndianRupee size={22} />
            </div>

            <div>
              <span>Total Donations</span>
              <strong>
                {formatCurrency(
                  stats.totalDonationAmount ?? stats.donationAmount,
                )}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Megaphone size={22} />
            </div>

            <div>
              <span>Active Campaigns</span>
              <strong>{stats.activeCampaigns}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>Upcoming Events</span>
              <strong>{stats.upcomingEvents}</strong>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Recent Volunteer Applications</h3>
                <p>Latest requests waiting for review.</p>
              </div>

              <button
                className="admin-text-button"
                onClick={() => navigateSection("volunteers")}
              >
                View All
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {(
                    dashboard.recentApplications ||
                    dashboard.recentVolunteerApplications
                  )?.length ? (
                    (
                      dashboard.recentApplications ||
                      dashboard.recentVolunteerApplications
                    ).map((application) => (
                      <tr key={application.id}>
                        <td>{application.user.name}</td>

                        <td>{application.user.email}</td>

                        <td>
                          <span
                            className={`admin-status admin-status-${application.status.toLowerCase()}`}
                          >
                            {application.status}
                          </span>
                        </td>

                        <td>{formatDate(application.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="admin-empty">
                        No applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Recent Donations</h3>
                <p>Latest donation activity.</p>
              </div>

              <button
                className="admin-text-button"
                onClick={() => navigateSection("donations")}
              >
                View All
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.recentDonations?.length ? (
                    dashboard.recentDonations.map((donation) => (
                      <tr key={donation.id}>
                        <td>
                          {donation.isAnonymous
                            ? "Anonymous"
                            : donation.donorName ||
                              donation.user?.name ||
                              "Unknown"}
                        </td>

                        <td>{formatCurrency(donation.amount)}</td>

                        <td>
                          <span
                            className={`admin-status admin-status-${donation.status.toLowerCase()}`}
                          >
                            {donation.status}
                          </span>
                        </td>

                        <td>{formatDate(donation.donatedAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="admin-empty">
                        No donations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER VOLUNTEERS
  ===================================================== */

  const renderVolunteers = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Volunteer Applications</h2>
            <p>Review and manage volunteer requests.</p>
          </div>

          <select
            className="admin-filter"
            value={applicationFilter}
            onChange={(e) => setApplicationFilter(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
            <option value="ALL">All Applications</option>
          </select>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Contact</th>
                  <th>Skills</th>
                  <th>Preferred Area</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.length ? (
                  applications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <div className="admin-user-cell">
                          <strong>{application.user.name}</strong>
                          <small>#{application.id}</small>
                        </div>
                      </td>

                      <td>
                        <div>{application.user.email}</div>
                        <small>{application.user.phone || "No phone"}</small>
                      </td>

                      <td>{application.skills || "Not specified"}</td>

                      <td>{application.preferredArea || "Not specified"}</td>

                      <td>
                        <span
                          className={`admin-status admin-status-${application.status.toLowerCase()}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td>{formatDate(application.createdAt)}</td>

                      <td>
                        <button
                          className="admin-icon-button"
                          title="View application"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye size={17} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="admin-empty">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER USERS
  ===================================================== */

  const renderUsers = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Users</h2>
            <p>Manage registered users and account status.</p>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length ? (
                  users.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="admin-user-cell">
                          <strong>{item.name}</strong>
                          <small>{item.email}</small>
                        </div>
                      </td>

                      <td>{item.phone || "—"}</td>

                      <td>
                        <span className="admin-role">{item.role}</span>
                      </td>

                      <td>
                        <span
                          className={`admin-status admin-status-${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>{formatDate(item.createdAt)}</td>

                      <td>
                        {item.id !== user?.id && (
                          <select
                            className="admin-small-select"
                            value={item.status}
                            onChange={(e) =>
                              changeUserStatus(item, e.target.value)
                            }
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="SUSPENDED">Suspended</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-empty">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER DONATIONS
  ===================================================== */

  const renderDonations = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Donations</h2>
            <p>Monitor donation and payment activity.</p>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Campaign</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {donations.length ? (
                  donations.map((donation) => (
                    <tr key={donation.id}>
                      <td>
                        {donation.isAnonymous
                          ? "Anonymous"
                          : donation.donorName ||
                            donation.user?.name ||
                            "Unknown"}
                      </td>

                      <td>
                        <strong>{formatCurrency(donation.amount)}</strong>
                      </td>

                      <td>{donation.paymentMethod}</td>

                      <td>{donation.campaign?.title || "General Donation"}</td>

                      <td>
                        <span
                          className={`admin-status admin-status-${donation.status.toLowerCase()}`}
                        >
                          {donation.status}
                        </span>
                      </td>

                      <td>{formatDate(donation.donatedAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-empty">
                      No donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER CAMPAIGNS
  ===================================================== */

  const renderCampaigns = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Campaigns</h2>
            <p>Monitor all NGO campaigns.</p>
          </div>
        </div>

        <div className="admin-card-grid">
          {campaigns.map((campaign) => (
            <div className="admin-management-card" key={campaign.id}>
              <div className="admin-management-card-top">
                <span
                  className={`admin-status admin-status-${campaign.status.toLowerCase()}`}
                >
                  {campaign.status}
                </span>

                <span>#{campaign.id}</span>
              </div>

              <h3>{campaign.title}</h3>

              <p>{campaign.description || "No campaign description."}</p>

              <div className="admin-progress-info">
                <span>Raised</span>
                <strong>{formatCurrency(campaign.raisedAmount)}</strong>
              </div>

              <div className="admin-progress-track">
                <div
                  className="admin-progress-bar"
                  style={{
                    width: `${Math.min(
                      100,
                      Number(
                        campaign.targetAmount
                          ? (Number(campaign.raisedAmount) /
                              Number(campaign.targetAmount)) *
                              100
                          : 0,
                      ),
                    )}%`,
                  }}
                />
              </div>

              <div className="admin-management-meta">
                <span>Target: {formatCurrency(campaign.targetAmount)}</span>

                <span>Donations: {campaign._count?.donations || 0}</span>
              </div>
            </div>
          ))}
        </div>

        {!campaigns.length && (
          <div className="admin-empty-card">No campaigns found.</div>
        )}
      </div>
    );
  };

  /* =====================================================
     RENDER EVENTS
  ===================================================== */

  const renderEvents = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Events</h2>
            <p>Monitor volunteer events and registrations.</p>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Capacity</th>
                  <th>Registrations</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {events.length ? (
                  events.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <strong>{event.title}</strong>
                      </td>

                      <td>{event.location || event.city || "—"}</td>

                      <td>{formatDate(event.startDate)}</td>

                      <td>{event.capacity || "Unlimited"}</td>

                      <td>{event._count?.registrations || 0}</td>

                      <td>
                        <span
                          className={`admin-status admin-status-${event.status.toLowerCase()}`}
                        >
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-empty">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER COMMUNITIES
  ===================================================== */

  const renderCommunities = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Communities</h2>
            <p>Monitor NGO communities and members.</p>
          </div>
        </div>

        <div className="admin-card-grid">
          {communities.map((community) => (
            <div className="admin-management-card" key={community.id}>
              <div className="admin-management-card-top">
                <span
                  className={
                    community.isActive
                      ? "admin-status admin-status-active"
                      : "admin-status admin-status-inactive"
                  }
                >
                  {community.isActive ? "ACTIVE" : "INACTIVE"}
                </span>

                <span>#{community.id}</span>
              </div>

              <h3>{community.name}</h3>

              <p>{community.description || "No description."}</p>

              <div className="admin-management-meta">
                <span>{community.city || "No city"}</span>

                <span>Members: {community._count?.members || 0}</span>
              </div>
            </div>
          ))}
        </div>

        {!communities.length && (
          <div className="admin-empty-card">No communities found.</div>
        )}
      </div>
    );
  };

  /* =====================================================
     RENDER AUDIT
  ===================================================== */

  const renderAuditLogs = () => {
    return (
      <div className="admin-content-section">
        <div className="admin-section-toolbar">
          <div>
            <h2>Audit Logs</h2>
            <p>Security history of administrative actions.</p>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.length ? (
                  auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.user?.name || "System"}</td>

                      <td>
                        <span className="admin-action-badge">{log.action}</span>
                      </td>

                      <td>{log.entity || "—"}</td>

                      <td>{log.details || "—"}</td>

                      <td>{formatDate(log.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="admin-empty">
                      No audit logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =====================================================
     CONTENT SWITCH
  ===================================================== */

  const renderContent = () => {
    if (loading) {
      return (
        <div className="admin-loading">
          <div className="admin-spinner" />
          <p>Loading admin data...</p>
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return renderDashboard();

      case "volunteers":
        return renderVolunteers();

      case "users":
        return renderUsers();

      case "donations":
        return renderDonations();

      case "campaigns":
        return renderCampaigns();

      case "events":
        return renderEvents();

      case "communities":
        return renderCommunities();

      case "audit":
        return renderAuditLogs();

      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}
      >
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={22} />
          </div>

          <div>
            <strong>Hanumant Seva</strong>
            <span>Admin Panel</span>
          </div>

          <button
            className="admin-mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <nav className="admin-navigation">
          <span className="admin-navigation-title">MANAGEMENT</span>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`admin-nav-item ${
                  activeSection === item.id ? "admin-nav-item-active" : ""
                }`}
                onClick={() => navigateSection(item.id)}
              >
                <Icon size={19} />

                <span>{item.label}</span>

                {item.id === "volunteers" &&
                  dashboard?.stats?.pendingVolunteerApplications > 0 && (
                    <b className="admin-nav-count">
                      {dashboard.stats.pendingVolunteerApplications}
                    </b>
                  )}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          {/* BACK TO WEBSITE */}
          <button
            className="admin-back-website-button"
            onClick={handleBackToWebsite}
          >
            <Home size={18} />
            <span>Back to Website</span>
          </button>

          <div className="admin-admin-profile">
            <div className="admin-avatar">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <strong>{user?.name}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button className="admin-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* ADMIN TOPBAR */}
        <header className="admin-topbar">
          <button
            className="admin-mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="admin-page-heading">
            <span>ADMINISTRATION</span>

            <h1>
              {menuItems.find((item) => item.id === activeSection)?.label ||
                "Dashboard"}
            </h1>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-refresh-button"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh"
            >
              <RefreshCw size={18} className={refreshing ? "admin-spin" : ""} />
            </button>

            <div className="admin-topbar-user">
              <div className="admin-avatar">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <strong>{user?.name}</strong>
                <span>ADMIN</span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="admin-page-content">{renderContent()}</section>
      </main>

      {/* APPLICATION MODAL */}
      {selectedApplication && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedApplication(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span>VOLUNTEER APPLICATION</span>
                <h2>{selectedApplication.user.name}</h2>
              </div>

              <button
                className="admin-modal-close"
                onClick={() => setSelectedApplication(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-grid">
                <div className="admin-detail-item">
                  <span>Name</span>
                  <strong>{selectedApplication.user.name}</strong>
                </div>

                <div className="admin-detail-item">
                  <span>Email</span>
                  <strong>{selectedApplication.user.email}</strong>
                </div>

                <div className="admin-detail-item">
                  <span>Phone</span>
                  <strong>
                    {selectedApplication.user.phone || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Applied</span>
                  <strong>{formatDate(selectedApplication.createdAt)}</strong>
                </div>

                <div className="admin-detail-item">
                  <span>Skills</span>
                  <strong>
                    {selectedApplication.skills || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Preferred Area</span>
                  <strong>
                    {selectedApplication.preferredArea || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Availability</span>
                  <strong>
                    {selectedApplication.availability || "Not provided"}
                  </strong>
                </div>

                <div className="admin-detail-item">
                  <span>Experience</span>
                  <strong>
                    {selectedApplication.experience || "Not provided"}
                  </strong>
                </div>
              </div>

              <div className="admin-detail-long">
                <span>Motivation</span>
                <p>{selectedApplication.motivation}</p>
              </div>
            </div>

            {selectedApplication.status === "PENDING" && (
              <div className="admin-modal-actions">
                <button
                  className="admin-danger-button"
                  onClick={() => rejectApplication(selectedApplication)}
                >
                  <XCircle size={17} />
                  Reject
                </button>

                <button
                  className="admin-success-button"
                  onClick={() => approveApplication(selectedApplication)}
                >
                  <CheckCircle size={17} />
                  Approve Volunteer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

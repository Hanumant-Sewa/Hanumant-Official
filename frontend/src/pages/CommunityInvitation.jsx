import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Users, UserPlus, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function CommunityInvitation() {
  const { token } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const loadInvitation = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/community-invitations/${token}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load invitation.");
        }

        setInvitation(data.invitation);
      } catch (error) {
        console.error("Invitation Load Error:", error);

        Swal.fire({
          title: "Invalid Invitation",
          text: error.message || "This invitation is not available.",
          icon: "error",
          confirmButtonText: "Go to Dashboard",
          background: "#fffaf3",
          color: "#3b2a1f",
          confirmButtonColor: "#e87524",
        }).then(() => {
          navigate("/dashboard");
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadInvitation();
    }
  }, [token, navigate]);

  const handleAcceptInvitation = async () => {
    // User is not logged in
    if (!user) {
      navigate("/login", {
        state: {
          from: `/community/invite/${token}`,
        },
      });

      return;
    }

    try {
      setAccepting(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/community-invitations/${token}/accept`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to accept invitation.");
      }

      await Swal.fire({
        title: "Welcome to the Community!",
        text: data.message || "You have successfully joined the community.",
        icon: "success",
        confirmButtonText: "View Community",
        background: "#fffaf3",
        color: "#3b2a1f",
        confirmButtonColor: "#e87524",
      });

      navigate("/community");
    } catch (error) {
      console.error("Accept Invitation Error:", error);

      Swal.fire({
        title: "Unable to Accept",
        text:
          error.message ||
          "Something went wrong while accepting the invitation.",
        icon: "error",
        confirmButtonText: "OK",
        background: "#fffaf3",
        color: "#3b2a1f",
        confirmButtonColor: "#e87524",
      });
    } finally {
      setAccepting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <section className="dashboard-card dashboard-full-card">
            <div className="dashboard-empty-state">
              <p>Loading invitation...</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <section className="dashboard-card dashboard-full-card">
          <div className="dashboard-card-header">
            <div>
              <span className="dashboard-card-label">COMMUNITY INVITATION</span>

              <h2>Join Hanumant Seva</h2>
            </div>

            <div className="quick-action-icon">
              <UserPlus size={24} />
            </div>
          </div>

          <div className="dashboard-empty-state">
            <div className="quick-action-icon">
              <Users size={32} />
            </div>

            <h3>
              {invitation.inviter?.name || "A Hanumant Seva member"} invited you
            </h3>

            <p>
              Join the Hanumant Seva community and become part of a growing
              network of people serving together.
            </p>

            {invitation.community ? (
              <p>
                <strong>Community:</strong> {invitation.community.name}
              </p>
            ) : (
              <p>
                <strong>Community:</strong> A new community will be created when
                you accept this invitation.
              </p>
            )}

            <button
              type="button"
              className="dashboard-outline-button"
              onClick={handleAcceptInvitation}
              disabled={accepting}
            >
              {accepting ? (
                "Joining..."
              ) : user ? (
                <>
                  <CheckCircle size={18} />
                  Accept Invitation
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Login to Accept
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CommunityInvitation;

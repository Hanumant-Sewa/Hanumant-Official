import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Edit3,
  Mail,
  Phone,
  MapPin,
  UserRound,
  CalendarDays,
  BriefcaseBusiness,
  Save,
  X,
} from "lucide-react";

import "../css/VolunteerProfile.css";

function VolunteerProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    skills: "",
    avatar: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET VOLUNTEER PROFILE
  // ==========================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/volunteer-profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load profile");
      }

      const profileData = data.profile;

      setProfile({
        fullName: profileData.fullName || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        age: profileData.age || "",
        city: profileData.city || "",
        skills: profileData.skills || "",
        avatar: profileData.avatar || "",
      });
    } catch (error) {
      console.error("Profile Error:", error);
      setError(error.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // PHOTO SELECT
  // ==========================================

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Allow only images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Photo size should be less than 5 MB.");
      return;
    }

    setSelectedPhoto(file);

    // Preview selected image
    const previewUrl = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      avatar: previewUrl,
    }));
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/volunteer-profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: profile.fullName,
            phone: profile.phone,
            age: profile.age ? Number(profile.age) : null,
            city: profile.city,
            skills: profile.skills,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update profile with backend response
      if (data.profile) {
        setProfile((prev) => ({
          ...prev,
          fullName: data.profile.fullName || prev.fullName,
          email: data.profile.email || prev.email,
          phone: data.profile.phone || prev.phone,
          age: data.profile.age ?? prev.age,
          city: data.profile.city || prev.city,
          skills: data.profile.skills || prev.skills,
          avatar: data.profile.avatar || prev.avatar,
        }));
      }

      setSelectedPhoto(null);
      setEditMode(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update Profile Error:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    setSelectedPhoto(null);
    setEditMode(false);

    // Reload original backend data
    fetchProfile();
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="volunteer-profile-page">
        <div className="container">
          <div className="profile-loading">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="volunteer-profile-page">
      {/* ========================================
          HERO
      ======================================== */}

      <section className="volunteer-page-hero">
        <div className="container">
          <div className="volunteer-hero-content">
            <button
              className="back-btn"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>

            <div className="volunteer-hero-text">
              <span>VOLUNTEER PROFILE</span>

              <h1>My Profile</h1>

              <p>
                Manage your personal information and volunteer details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PROFILE
      ======================================== */}

      <section className="volunteer-profile-section">
        <div className="container">
          {/* Error */}
          {error && (
            <div className="profile-error">
              {error}
            </div>
          )}

          <div className="volunteer-profile-card">
            {/* ==================================
                PROFILE HEADER
            ================================== */}

            <div className="volunteer-profile-header">
              <div className="volunteer-profile-avatar-wrapper">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Volunteer"
                    className="volunteer-profile-avatar"
                  />
                ) : (
                  <div className="volunteer-profile-avatar default-avatar">
                    <UserRound size={48} />
                  </div>
                )}

                {editMode && (
                  <>
                    <button
                      type="button"
                      className="profile-camera-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={18} />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>

              <div className="volunteer-profile-heading">
                <h2>{profile.fullName || "Volunteer"}</h2>

                <p>
                  <Mail size={16} />
                  {profile.email || "Email not available"}
                </p>
              </div>

              {!editMode && (
                <button
                  type="button"
                  className="btn profile-edit-btn"
                  onClick={() => setEditMode(true)}
                >
                  <Edit3 size={17} />
                  Edit Profile
                </button>
              )}
            </div>

            {/* ==================================
                PROFILE DETAILS
            ================================== */}

            <div className="volunteer-profile-details">
              {/* NAME */}

              <div className="profile-detail-box">
                <div className="profile-detail-icon">
                  <UserRound size={20} />
                </div>

                <div className="profile-detail-content">
                  <span>Full Name</span>

                  {editMode ? (
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  ) : (
                    <strong>{profile.fullName || "Not provided"}</strong>
                  )}
                </div>
              </div>

              {/* EMAIL */}

              <div className="profile-detail-box">
                <div className="profile-detail-icon">
                  <Mail size={20} />
                </div>

                <div className="profile-detail-content">
                  <span>Email</span>

                  <strong>
                    {profile.email || "Not provided"}
                  </strong>
                </div>
              </div>

              {/* PHONE */}

              <div className="profile-detail-box">
                <div className="profile-detail-icon">
                  <Phone size={20} />
                </div>

                <div className="profile-detail-content">
                  <span>Phone Number</span>

                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <strong>{profile.phone || "Not provided"}</strong>
                  )}
                </div>
              </div>

              {/* AGE */}

              <div className="profile-detail-box">
                <div className="profile-detail-icon">
                  <CalendarDays size={20} />
                </div>

                <div className="profile-detail-content">
                  <span>Age</span>

                  {editMode ? (
                    <input
                      type="number"
                      name="age"
                      value={profile.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      min="1"
                      max="100"
                    />
                  ) : (
                    <strong>
                      {profile.age || "Not provided"}
                    </strong>
                  )}
                </div>
              </div>

              {/* CITY */}

              <div className="profile-detail-box">
                <div className="profile-detail-icon">
                  <MapPin size={20} />
                </div>

                <div className="profile-detail-content">
                  <span>City</span>

                  {editMode ? (
                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                    />
                  ) : (
                    <strong>{profile.city || "Not provided"}</strong>
                  )}
                </div>
              </div>

              {/* SKILLS */}

              <div className="profile-detail-box">
                <div className="profile-detail-icon">
                  <BriefcaseBusiness size={20} />
                </div>

                <div className="profile-detail-content">
                  <span>Skills</span>

                  {editMode ? (
                    <input
                      type="text"
                      name="skills"
                      value={profile.skills}
                      onChange={handleChange}
                      placeholder="Example: Teaching, Event Management"
                    />
                  ) : (
                    <strong>
                      {profile.skills || "Not provided"}
                    </strong>
                  )}
                </div>
              </div>
            </div>

            {/* ==================================
                PHOTO INFO
            ================================== */}

            {editMode && (
              <div className="profile-photo-info">
                <Camera size={17} />

                <span>
                  Click the camera icon to choose a new profile photo.
                  Maximum size: 5 MB.
                </span>
              </div>
            )}

            {/* ==================================
                ACTION BUTTONS
            ================================== */}

            {editMode && (
              <div className="profile-edit-actions">
                <button
                  type="button"
                  className="btn profile-cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn profile-save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  <Save size={17} />

                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default VolunteerProfile;
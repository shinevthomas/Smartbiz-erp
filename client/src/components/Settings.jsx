import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

import "./Settings.css";

function Settings() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userId = user?.id || user?._id;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    address: "",
    currency: "INR",
    gst: 18,
    theme: "light",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/profile/${userId}`
      );

      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        companyName: res.data.companyName || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
        currency: res.data.currency || "INR",
        gst: res.data.gst ?? 18,
        theme: res.data.theme || "light",
      });
    } catch (err) {
      console.log(err);
      toast.error("Unable to load profile");
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    setSavingProfile(true);

    try {
      await axios.put(
        `http://localhost:5000/api/users/profile/${userId}`,
        profile
      );

      const updatedUser = {
        ...user,
        name: profile.name,
        email: profile.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async () => {
    if (!password.oldPassword || !password.newPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (password.newPassword.length < 6) {
      toast.error("New password must contain at least 6 characters");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setChangingPassword(true);

    try {
      await axios.put(
        `http://localhost:5000/api/users/change-password/${userId}`,
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        }
      );

      toast.success("Password changed successfully");

      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Password change failed"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const togglePassword = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const getInitial = () => {
    if (profile.name) {
      return profile.name.charAt(0).toUpperCase();
    }

    if (profile.email) {
      return profile.email.charAt(0).toUpperCase();
    }

    return "U";
  };

  return (
    <div className="settings-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="settings-top">

        <div>
          <span className="settings-eyebrow">
            ACCOUNT SETTINGS
          </span>

          <h1>Settings</h1>

          <p>
            Manage your profile, business information and account security.
          </p>
        </div>

      </div>


      {/* =========================================
          PROFILE SUMMARY
      ========================================= */}

      <div className="profile-banner">

        <div className="profile-left">

          <div className="profile-avatar">
            {getInitial()}
          </div>

          <div className="profile-details">

            <h2>
              {profile.name || "User"}
            </h2>

            <p>
              <FiMail />
              {profile.email || "No email available"}
            </p>

            <div className="profile-status">
              <FiCheckCircle />
              Active Account
            </div>

          </div>

        </div>

        <div className="profile-role">

          <span>ACCOUNT ROLE</span>

          <strong>
            <FiShield />
            Employee
          </strong>

        </div>

      </div>


      {/* =========================================
          SETTINGS CONTENT
      ========================================= */}

      <div className="settings-layout">


        {/* =======================================
            LEFT - PROFILE
        ======================================= */}

        <div className="settings-card profile-card">

          <div className="card-header">

            <div className="card-icon blue">
              <FiUser />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>
                Update your personal and business details.
              </p>
            </div>

          </div>


          <div className="form-grid">

            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <div className="input-wrapper">

                <FiUser />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={profile.name}
                  onChange={handleProfileChange}
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <FiMail />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={profile.email}
                  onChange={handleProfileChange}
                />

              </div>

            </div>


            {/* COMPANY */}

            <div className="form-group">

              <label>
                Company Name
              </label>

              <div className="input-wrapper">

                <FiBriefcase />

                <input
                  type="text"
                  name="companyName"
                  placeholder="Your company name"
                  value={profile.companyName}
                  onChange={handleProfileChange}
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <div className="input-wrapper">

                <FiPhone />

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={profile.phone}
                  onChange={handleProfileChange}
                />

              </div>

            </div>


            {/* ADDRESS */}

            <div className="form-group full">

              <label>
                Business Address
              </label>

              <div className="input-wrapper textarea-wrapper">

                <FiMapPin />

                <textarea
                  name="address"
                  placeholder="Enter business address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  rows="4"
                />

              </div>

            </div>


            {/* CURRENCY */}

            <div className="form-group">

              <label>
                Currency
              </label>

              <div className="input-wrapper">

                <FiDollarSign />

                <select
                  name="currency"
                  value={profile.currency}
                  onChange={handleProfileChange}
                >
                  <option value="INR">
                    Indian Rupee (₹)
                  </option>

                  <option value="USD">
                    US Dollar ($)
                  </option>

                  <option value="EUR">
                    Euro (€)
                  </option>

                  <option value="GBP">
                    British Pound (£)
                  </option>

                </select>

              </div>

            </div>


            {/* GST */}

            <div className="form-group">

              <label>
                GST Rate
              </label>

              <div className="input-wrapper">

                <FiDollarSign />

                <input
                  type="number"
                  name="gst"
                  min="0"
                  max="100"
                  value={profile.gst}
                  onChange={handleProfileChange}
                />

                <span className="input-suffix">
                  %
                </span>

              </div>

            </div>

          </div>


          <div className="card-footer">

            <span>
              Changes will be applied to your ERP account.
            </span>

            <button
              className="primary-btn"
              onClick={saveProfile}
              disabled={savingProfile}
            >

              <FiSave />

              {savingProfile
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>


        {/* =======================================
            RIGHT - SECURITY
        ======================================= */}

        <div className="settings-card security-card">

          <div className="card-header">

            <div className="card-icon green">
              <FiLock />
            </div>

            <div>
              <h2>Account Security</h2>
              <p>
                Keep your account secure with a strong password.
              </p>
            </div>

          </div>


          <div className="security-notice">

            <FiShield />

            <div>
              <strong>Password Security</strong>

              <p>
                Use at least 6 characters with a combination
                of letters and numbers.
              </p>
            </div>

          </div>


          {/* CURRENT PASSWORD */}

          <div className="form-group">

            <label>
              Current Password
            </label>

            <div className="input-wrapper">

              <FiLock />

              <input
                type={
                  showPasswords.old
                    ? "text"
                    : "password"
                }
                name="oldPassword"
                placeholder="Enter current password"
                value={password.oldPassword}
                onChange={handlePasswordChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  togglePassword("old")
                }
              >
                {showPasswords.old
                  ? <FiEyeOff />
                  : <FiEye />
                }
              </button>

            </div>

          </div>


          {/* NEW PASSWORD */}

          <div className="form-group">

            <label>
              New Password
            </label>

            <div className="input-wrapper">

              <FiLock />

              <input
                type={
                  showPasswords.new
                    ? "text"
                    : "password"
                }
                name="newPassword"
                placeholder="Enter new password"
                value={password.newPassword}
                onChange={handlePasswordChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  togglePassword("new")
                }
              >
                {showPasswords.new
                  ? <FiEyeOff />
                  : <FiEye />
                }
              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="form-group">

            <label>
              Confirm New Password
            </label>

            <div className="input-wrapper">

              <FiLock />

              <input
                type={
                  showPasswords.confirm
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm new password"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  togglePassword("confirm")
                }
              >
                {showPasswords.confirm
                  ? <FiEyeOff />
                  : <FiEye />
                }
              </button>

            </div>

          </div>


          <button
            className="security-btn"
            onClick={changePassword}
            disabled={changingPassword}
          >

            <FiLock />

            {changingPassword
              ? "Updating Password..."
              : "Update Password"}

          </button>


          <div className="security-footer">

            <FiShield />

            <span>
              Your password is encrypted and securely stored.
            </span>

          </div>

        </div>

      </div>


      {/* =========================================
          BOTTOM INFORMATION
      ========================================= */}

      <div className="settings-bottom">

        <div>
          <FiShield />

          <div>
            <strong>Your account is protected</strong>

            <p>
              SmartBiz ERP uses secure authentication
              to protect your business data.
            </p>
          </div>
        </div>

        <span>
          SmartBiz ERP • 2026
        </span>

      </div>

    </div>
  );
}

export default Settings;
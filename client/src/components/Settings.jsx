import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Settings.css";

function Settings() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    address: "",
    currency: "INR",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/users/${user._id}`
      );

      setProfile(res.data);

    } catch (err) {

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

    try {

      await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        profile
      );

      toast.success("Profile Updated Successfully");

    } catch (err) {

      toast.error("Failed to update profile");

    }

  };

  const changePassword = async () => {

    if (password.newPassword !== password.confirmPassword) {

      toast.error("Passwords do not match");

      return;

    }

    try {

      await axios.put(
        `http://localhost:5000/api/users/change-password/${user._id}`,
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        }
      );

      toast.success("Password Changed");

      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Password change failed"
      );

    }

  };

  return (

    <div className="settings-page">

      <h1 className="settings-title">

        ⚙ Settings

      </h1>

      <div className="settings-grid">

        {/* COMPANY INFORMATION */}

        <div className="settings-card">

          <h2>🏢 Company Information</h2>

          <div className="form-group">

            <label>Company Name</label>

            <input
              type="text"
              name="companyName"
              value={profile.companyName}
              onChange={handleProfileChange}
            />

          </div>

          <div className="form-group">

            <label>Business Email</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />

          </div>

          <div className="form-group">

            <label>Address</label>

            <textarea
              rows="3"
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
            />

          </div>

          <div className="form-group">

            <label>Currency</label>

            <select
              name="currency"
              value={profile.currency}
              onChange={handleProfileChange}
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>

          </div>

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            💾 Save Company Details
          </button>

        </div>
                {/* USER PROFILE */}

        <div className="settings-card">

          <h2>👤 User Profile</h2>

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />

          </div>

          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />

          </div>

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            Save Profile
          </button>

        </div>

        {/* CHANGE PASSWORD */}

        <div className="settings-card">

          <h2>🔒 Change Password</h2>

          <div className="form-group">

            <label>Current Password</label>

            <input
              type="password"
              name="oldPassword"
              value={password.oldPassword}
              onChange={handlePasswordChange}
            />

          </div>

          <div className="form-group">

            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
            />

          </div>

          <div className="form-group">

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
            />

          </div>

          <button
            className="password-btn"
            onClick={changePassword}
          >
            Update Password
          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;
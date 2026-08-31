import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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

      setProfile(res.data);
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
    try {
      await axios.put(
        `http://localhost:5000/api/users/profile/${userId}`,
        profile
      );

      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
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
        `http://localhost:5000/api/users/change-password/${userId}`,
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        }
      );

      toast.success("Password Changed Successfully");

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
    }
  };

  return (
    <div className="settings-page">

      <div className="settings-header">

  <div className="profile-avatar">
    {profile.name
      ? profile.name.charAt(0).toUpperCase()
      : "U"}
  </div>

  <div className="profile-info">

    <h1>{profile.name || "User"}</h1>

    <p>{profile.email}</p>

    <span className="role-badge">
      👤 Employee
    </span>

  </div>

</div>

      <div className="settings-grid">

        <div className="settings-card">

          <h2>👤 User Profile</h2>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </div>

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
            <label>Phone</label>
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
              rows="4"
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

          <div className="form-group">
            <label>GST (%)</label>

            <input
              type="number"
              name="gst"
              value={profile.gst}
              onChange={handleProfileChange}
            />
          </div>

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            💾 Save Profile
          </button>

        </div>

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
            🔐 Change Password
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;
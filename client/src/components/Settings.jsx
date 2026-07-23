import { useState, useEffect } from "react";
import "./Settings.css";

function Settings() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    company: "",
    email: "",
    phone: "",
    address: "",
    currency: "Indian Rupee (₹)",
    notifications: true,
    darkMode: false,
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem("erpSettings");

    if (storedSettings) {
      const data = JSON.parse(storedSettings);

      setSettings(data);

      if (data.darkMode) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedSettings = {
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    };

    setSettings(updatedSettings);

    if (name === "darkMode") {
      if (checked) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(
        "erpSettings",
        JSON.stringify(settings)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      alert("Failed to save settings");
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h1>⚙ Settings</h1>

        {saved && (
          <div className="success-message">
            ✅ Settings Saved Successfully
          </div>
        )}

        <label>Company Name</label>
        <input
          type="text"
          name="company"
          value={settings.company}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={settings.phone}
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          rows="4"
          name="address"
          value={settings.address}
          onChange={handleChange}
        />

        <label>Currency</label>
        <select
          name="currency"
          value={settings.currency}
          onChange={handleChange}
        >
          <option>Indian Rupee (₹)</option>
          <option>US Dollar ($)</option>
          <option>Euro (€)</option>
          <option>Pound (£)</option>
        </select>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
            Enable Dark Mode
          </label>
        </div>

        <button
          className="save-btn"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
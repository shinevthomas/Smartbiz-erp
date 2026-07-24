import "./Topbar.css";

function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="topbar">

      <h2>SmartBiz ERP Dashboard</h2>

      <div className="topbar-right">

        <button className="notification-btn">
          🔔
        </button>

        <div className="profile">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <span>{user?.name}</span>

        </div>

      </div>

    </header>
  );
}

export default Topbar;
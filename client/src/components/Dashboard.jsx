import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>SmartBiz ERP</h2>

        <ul>
  <li><Link className="menu-link" to="/dashboard">🏠 Dashboard</Link></li>
<li><Link className="menu-link" to="/inventory">📦 Inventory</Link></li>
<li><Link className="menu-link" to="/sales">💰 Sales</Link></li>
<li><Link className="menu-link" to="/customers">👥 Customers</Link></li>
<li><Link className="menu-link" to="/invoices">🧾 Invoices</Link></li>
<li><Link className="menu-link" to="/reports">📊 Reports</Link></li>
<li><Link className="menu-link" to="/settings">⚙️ Settings</Link></li>
</ul>
      </aside>

      <main className="content">
        <h1>Dashboard</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Products</h3>
            <h2>250</h2>
          </div>

          <div className="card">
            <h3>Sales Today</h3>
            <h2>₹12,500</h2>
          </div>

          <div className="card">
            <h3>Customers</h3>
            <h2>98</h2>
          </div>

          <div className="card">
            <h3>Invoices</h3>
            <h2>35</h2>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
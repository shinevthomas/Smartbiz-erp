import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

import "./App.css";

const menuItems = [
  { id: "dashboard", icon: "▦", label: "Dashboard" },
  { id: "inventory", icon: "⬡", label: "Inventory", badge: 4 },
  { id: "sales", icon: "🛒", label: "Sales / POS" },
  { id: "customers", icon: "♧", label: "Customers" },
  { id: "invoices", icon: "▤", label: "Invoices" },
  { id: "reports", icon: "▥", label: "Reports" },
  { id: "settings", icon: "⚙", label: "Settings" },
];

const invoices = [
  {
    id: "#INV-1001",
    customer: "Acme Corporation",
    date: "Aug 27, 2026",
    amount: "$4,250.00",
    status: "Paid",
  },
  {
    id: "#INV-1002",
    customer: "Global Traders",
    date: "Aug 26, 2026",
    amount: "$2,890.00",
    status: "Pending",
  },
  {
    id: "#INV-1003",
    customer: "Tech Solutions",
    date: "Aug 25, 2026",
    amount: "$1,750.00",
    status: "Paid",
  },
  {
    id: "#INV-1004",
    customer: "Metro Supplies",
    date: "Aug 24, 2026",
    amount: "$980.00",
    status: "Overdue",
  },
  {
    id: "#INV-1005",
    customer: "Prime Industries",
    date: "Aug 23, 2026",
    amount: "$3,420.00",
    status: "Paid",
  },
];

const products = [
  {
    name: "Wireless Keyboard",
    sku: "KB-1001",
    stock: 4,
    price: "$49.99",
  },
  {
    name: "USB-C Hub",
    sku: "HB-2002",
    stock: 7,
    price: "$39.99",
  },
  {
    name: "Bluetooth Mouse",
    sku: "MS-3003",
    stock: 9,
    price: "$29.99",
  },
  {
    name: "27-inch Monitor",
    sku: "MN-4004",
    stock: 3,
    price: "$299.99",
  },
];

const sales = [
  {
    customer: "Acme Corporation",
    product: "Laptop Pro 15",
    amount: "$1,299",
    time: "10 min ago",
  },
  {
    customer: "Global Traders",
    product: "Wireless Keyboard",
    amount: "$149",
    time: "35 min ago",
  },
  {
    customer: "Tech Solutions",
    product: "27-inch Monitor",
    amount: "$599",
    time: "1 hour ago",
  },
  {
    customer: "Prime Industries",
    product: "USB-C Hub",
    amount: "$119",
    time: "2 hours ago",
  },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const currentMenu =
    menuItems.find((item) => item.id === activePage) || menuItems[0];

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">S</div>
          <div>
            <div className="brand-name">SmartBiz</div>
            <div className="brand-subtitle">ERP Suite</div>
          </div>
        </div>

        <nav className="navigation">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => {
                setActivePage(item.id);
                setMobileMenu(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>

              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <span className="nav-icon">⇥</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="mobile-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>

          <div className="search-wrapper">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices, customers, products..."
            />
          </div>

          <div className="topbar-actions">
            <button
              className="icon-button"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <div className="notification-container">
              <button
                className="icon-button"
                onClick={() => setNotifications(!notifications)}
              >
                ♢
                <span className="notification-badge">3</span>
              </button>

              {notifications && (
                <div className="notification-menu">
                  <h4>Notifications</h4>
                  <div className="notification">
                    <strong>Low stock</strong>
                    <span>Wireless Keyboard is running low.</span>
                  </div>
                  <div className="notification">
                    <strong>New invoice</strong>
                    <span>Invoice #INV-1006 was created.</span>
                  </div>
                  <div className="notification">
                    <strong>Payment received</strong>
                    <span>Acme Corporation paid $4,250.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="profile">
              <div className="avatar">RA</div>
              <div className="profile-info">
                <strong>Rajesh Admin</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <section className="content">
          {activePage === "dashboard" && <Dashboard />}

          {activePage === "inventory" && (
            <InventoryPage search={search} />
          )}

          {activePage === "sales" && <SalesPage />}

          {activePage === "customers" && <CustomersPage />}

          {activePage === "invoices" && <InvoicesPage />}

          {activePage === "reports" && <ReportsPage />}

          {activePage === "settings" && <SettingsPage />}
        </section>
      </main>
    </div>
  );
}

function PageHeader({ icon, title, subtitle, button }) {
  return (
    <div className="page-header">
      <div>
        <div className="page-title">
          <span className="page-title-icon">{icon}</span>
          <h1>{title}</h1>
        </div>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {button && <button className="primary-button">{button}</button>}
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <PageHeader
        icon="📊"
        title="Dashboard"
        subtitle="Welcome back, Rajesh. Here's what's happening today."
      />

      <div className="stats-grid">
        <StatCard
          icon="💰"
          title="Total Revenue"
          value="$48,290"
          change="+12.5%"
          positive
          color="green"
        />

        <StatCard
          icon="🛒"
          title="Total Sales"
          value="1,248"
          change="+8.2%"
          positive
          color="blue"
        />

        <StatCard
          icon="👥"
          title="Customers"
          value="3,842"
          change="+5.7%"
          positive
          color="purple"
        />

        <StatCard
          icon="📦"
          title="Products"
          value="1,426"
          change="-2.1%"
          color="orange"
        />
      </div>

      <div className="dashboard-grid">
        <div className="card sales-chart-card">
          <div className="card-header">
            <div>
              <h3>Sales Overview</h3>
              <p>Revenue performance over the last 7 months</p>
            </div>

            <select>
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
          </div>

          <SalesChart />
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Sales by Category</h3>
              <p>Current month</p>
            </div>
          </div>

          <CategoryChart />
        </div>
      </div>

      <div className="three-column">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Recent Invoices</h3>
              <p>Latest billing activity</p>
            </div>
            <button className="text-button">View all</button>
          </div>

          <div className="invoice-list">
            {invoices.slice(0, 4).map((invoice) => (
              <div className="invoice-row" key={invoice.id}>
                <div className="invoice-icon">▤</div>
                <div className="invoice-info">
                  <strong>{invoice.id}</strong>
                  <span>{invoice.customer}</span>
                </div>
                <div className="invoice-right">
                  <strong>{invoice.amount}</strong>
                  <Status status={invoice.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Low Stock</h3>
              <p>Products requiring attention</p>
            </div>
            <button className="text-button">Inventory</button>
          </div>

          <div className="stock-list">
            {products.map((product) => (
              <div className="stock-row" key={product.sku}>
                <div className="product-image">📦</div>
                <div className="product-info">
                  <strong>{product.name}</strong>
                  <span>{product.sku}</span>
                </div>
                <div
                  className={`stock-count ${
                    product.stock <= 4 ? "danger" : "warning"
                  }`}
                >
                  {product.stock} left
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Recent Sales</h3>
              <p>Latest transactions</p>
            </div>
            <button className="text-button">View all</button>
          </div>

          <div className="sale-list">
            {sales.map((sale, index) => (
              <div className="sale-row" key={index}>
                <div className="sale-avatar">
                  {sale.customer.charAt(0)}
                </div>

                <div className="sale-info">
                  <strong>{sale.customer}</strong>
                  <span>{sale.product}</span>
                </div>

                <div className="sale-right">
                  <strong>{sale.amount}</strong>
                  <span>{sale.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon, title, value, change, positive, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>

      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small className={positive ? "positive" : "negative"}>
          {positive ? "↗" : "↘"} {change}{" "}
          <em>vs last month</em>
        </small>
      </div>
    </div>
  );
}

function SalesChart() {
  const values = [38, 52, 45, 70, 61, 82, 74, 91, 78, 96, 86, 108];

  return (
    <div className="chart">
      <div className="chart-y">
        <span>$60k</span>
        <span>$45k</span>
        <span>$30k</span>
        <span>$15k</span>
        <span>$0</span>
      </div>

      <div className="chart-area">
        <div className="grid-line line1" />
        <div className="grid-line line2" />
        <div className="grid-line line3" />
        <div className="grid-line line4" />

        <div className="bars">
          {values.map((value, index) => (
            <div className="bar-wrapper" key={index}>
              <div
                className="bar"
                style={{ height: `${value * 0.7}%` }}
              />
              <span>
                {[
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                ][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryChart() {
  return (
    <div className="category-chart">
      <div className="donut">
        <div className="donut-center">
          <strong>$48K</strong>
          <span>Total</span>
        </div>
      </div>

      <div className="category-list">
        <Category color="green" name="Electronics" value="42%" />
        <Category color="blue" name="Accessories" value="27%" />
        <Category color="purple" name="Software" value="18%" />
        <Category color="orange" name="Other" value="13%" />
      </div>
    </div>
  );
}

function Category({ color, name, value }) {
  return (
    <div className="category-item">
      <div>
        <span className={`dot ${color}`} />
        {name}
      </div>
      <strong>{value}</strong>
    </div>
  );
}

function Status({ status }) {
  const className = status.toLowerCase();

  return <span className={`status ${className}`}>{status}</span>;
}

function InventoryPage({ search }) {
  const filtered = products.filter((product) =>
    `${product.name} ${product.sku}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader
        icon="📦"
        title="Inventory"
        subtitle="Manage products, stock and warehouse inventory."
        button="+ Add Product"
      />

      <div className="stats-grid">
        <StatCard
          icon="📦"
          title="Total Products"
          value="1,426"
          change="+4.8%"
          positive
          color="blue"
        />
        <StatCard
          icon="⚠"
          title="Low Stock"
          value="24"
          change="+3"
          color="orange"
        />
        <StatCard
          icon="✓"
          title="In Stock"
          value="1,389"
          change="+2.4%"
          positive
          color="green"
        />
        <StatCard
          icon="✕"
          title="Out of Stock"
          value="13"
          change="-5.2%"
          positive
          color="red"
        />
      </div>

      <div className="card table-card">
        <div className="card-header">
          <div>
            <h3>Products</h3>
            <p>Current inventory</p>
          </div>
          <button className="secondary-button">Export</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((product) => (
              <tr key={product.sku}>
                <td>
                  <div className="table-product">
                    <div className="product-image">📦</div>
                    <strong>{product.name}</strong>
                  </div>
                </td>
                <td>{product.sku}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Status
                    status={product.stock <= 5 ? "Low Stock" : "In Stock"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SalesPage() {
  return (
    <>
      <PageHeader
        icon="🛒"
        title="Sales / POS"
        subtitle="Create sales orders and manage transactions."
        button="+ New Sale"
      />

      <div className="stats-grid">
        <StatCard
          icon="💰"
          title="Today's Sales"
          value="$8,420"
          change="+14.2%"
          positive
          color="green"
        />
        <StatCard
          icon="🧾"
          title="Transactions"
          value="128"
          change="+9.4%"
          positive
          color="blue"
        />
        <StatCard
          icon="↩"
          title="Returns"
          value="7"
          change="-2.1%"
          positive
          color="orange"
        />
        <StatCard
          icon="💳"
          title="Average Order"
          value="$65.78"
          change="+6.3%"
          positive
          color="purple"
        />
      </div>

      <div className="card table-card">
        <div className="card-header">
          <div>
            <h3>Today's Transactions</h3>
            <p>Sales activity</p>
          </div>
          <button className="primary-button">Open POS</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.customer}</td>
                <td>{sale.product}</td>
                <td>{sale.amount}</td>
                <td>{sale.time}</td>
                <td>
                  <Status status="Completed" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CustomersPage() {
  const customers = [
    ["Acme Corporation", "acme@example.com", "+1 555-0101", "$12,450"],
    ["Global Traders", "global@example.com", "+1 555-0102", "$9,820"],
    ["Tech Solutions", "tech@example.com", "+1 555-0103", "$7,430"],
    ["Prime Industries", "prime@example.com", "+1 555-0104", "$6,290"],
    ["Metro Supplies", "metro@example.com", "+1 555-0105", "$4,980"],
  ];

  return (
    <>
      <PageHeader
        icon="👥"
        title="Customers"
        subtitle="Manage your customer relationships."
        button="+ Add Customer"
      />

      <div className="stats-grid">
        <StatCard
          icon="👥"
          title="Total Customers"
          value="3,842"
          change="+5.7%"
          positive
          color="purple"
        />
        <StatCard
          icon="✓"
          title="Active Customers"
          value="3,218"
          change="+4.2%"
          positive
          color="green"
        />
        <StatCard
          icon="★"
          title="New This Month"
          value="184"
          change="+12.8%"
          positive
          color="blue"
        />
        <StatCard
          icon="⚠"
          title="Outstanding"
          value="$18,420"
          change="+2.3%"
          color="orange"
        />
      </div>

      <div className="card table-card">
        <div className="card-header">
          <div>
            <h3>Customer List</h3>
            <p>All customers</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Purchases</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>
                  <strong>{customer[0]}</strong>
                </td>
                <td>{customer[1]}</td>
                <td>{customer[2]}</td>
                <td>{customer[3]}</td>
                <td>
                  <Status status="Active" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function InvoicesPage() {
  return (
    <>
      <PageHeader
        icon="🧾"
        title="Invoices"
        subtitle="Create and manage customer invoices."
        button="+ Create Invoice"
      />

      <div className="stats-grid">
        <StatCard
          icon="💰"
          title="Total Invoiced"
          value="$68,420"
          change="+10.4%"
          positive
          color="blue"
        />
        <StatCard
          icon="✓"
          title="Paid"
          value="$48,290"
          change="+12.5%"
          positive
          color="green"
        />
        <StatCard
          icon="◷"
          title="Pending"
          value="$12,840"
          change="+3.8%"
          color="orange"
        />
        <StatCard
          icon="!"
          title="Overdue"
          value="$7,290"
          change="-6.2%"
          positive
          color="red"
        />
      </div>

      <div className="card table-card">
        <div className="card-header">
          <div>
            <h3>Invoices</h3>
            <p>Invoice history</p>
          </div>
          <button className="secondary-button">Export</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>
                  <strong>{invoice.id}</strong>
                </td>
                <td>{invoice.customer}</td>
                <td>{invoice.date}</td>
                <td>{invoice.amount}</td>
                <td>
                  <Status status={invoice.status} />
                </td>
                <td>
                  <button className="table-action">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ReportsPage() {
  return (
    <>
      <PageHeader
        icon="📈"
        title="Reports"
        subtitle="Analyze your business performance."
      />

      <div className="report-grid">
        <ReportCard
          icon="📊"
          title="Sales Report"
          description="Analyze sales performance by date, product and customer."
        />

        <ReportCard
          icon="📦"
          title="Inventory Report"
          description="View stock levels, valuation and product movement."
        />

        <ReportCard
          icon="💰"
          title="Financial Report"
          description="Track revenue, expenses, profit and cash flow."
        />

        <ReportCard
          icon="👥"
          title="Customer Report"
          description="Understand customer purchases and activity."
        />
      </div>

      <div className="card report-large">
        <div className="card-header">
          <div>
            <h3>Revenue Performance</h3>
            <p>Monthly revenue vs expenses</p>
          </div>
        </div>

        <SalesChart />
      </div>
    </>
  );
}

function ReportCard({ icon, title, description }) {
  return (
    <div className="report-card">
      <div className="report-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="text-button">View Report →</button>
    </div>
  );
}

function SettingsPage() {
  return (
    <>
      <PageHeader
        icon="⚙"
        title="Settings"
        subtitle="Manage your ERP configuration."
      />

      <div className="settings-grid">
        <div className="card settings-menu">
          <button className="settings-active">General</button>
          <button>Company Profile</button>
          <button>Users & Permissions</button>
          <button>Tax Settings</button>
          <button>Invoice Settings</button>
          <button>Notifications</button>
          <button>Security</button>
        </div>

        <div className="card settings-content">
          <h3>General Settings</h3>
          <p>Configure your SmartBiz ERP system.</p>

          <label>Company Name</label>
          <input defaultValue="SmartBiz Technologies" />

          <label>Company Email</label>
          <input defaultValue="admin@smartbiz.com" />

          <label>Currency</label>
          <select defaultValue="USD">
            <option value="USD">USD - US Dollar</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="EUR">EUR - Euro</option>
          </select>

          <label>Timezone</label>
          <select defaultValue="Asia/Kolkata">
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">
              America/New York
            </option>
          </select>

          <button className="primary-button save-button">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

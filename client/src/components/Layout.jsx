import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`main-section ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <Topbar
  collapsed={collapsed}
  setCollapsed={setCollapsed}
/>

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;
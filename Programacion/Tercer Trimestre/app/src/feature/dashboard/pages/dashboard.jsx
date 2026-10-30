import React from "react";
import { Sidebar } from "../components/sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <div className="dashboard-layout">
        <aside className="sidebar-container">
          <Sidebar />
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

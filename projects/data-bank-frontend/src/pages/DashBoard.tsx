import React from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function DashBoard() {
  return (
    <div className="flex h-screen bg-[#171618]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

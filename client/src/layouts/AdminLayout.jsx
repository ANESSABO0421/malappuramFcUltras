import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar - fixed height, scrolls if content overflows */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between fixed top-0 left-0 h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-blue-400">Admin Panel</h2>
            <nav className="flex flex-col gap-3">
              <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>
              <Link to="/admin/teams" className="hover:text-blue-400">Teams</Link>
              <Link to="/admin/matches" className="hover:text-blue-400">Matches</Link>
              <Link to="/admin/latest" className="hover:text-blue-400">Add latest Match</Link>
              <Link to="/" className="hover:text-blue-400">Back to Site</Link>
            </nav>
          </div>
          <footer className="text-sm text-gray-500 mt-8">
            Super League Kerala © {new Date().getFullYear()}
          </footer>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 h-screen overflow-y-auto p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

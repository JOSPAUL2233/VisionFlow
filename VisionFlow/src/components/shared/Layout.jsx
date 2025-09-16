import React from "react";
import Navbar from "../../features/navbar/Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="ml-64 overflow-auto">
        <div className="">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
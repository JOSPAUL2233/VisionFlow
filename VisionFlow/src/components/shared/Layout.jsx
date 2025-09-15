import React from "react";
import Navbar from "../../features/navbar/Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}

export default Layout;
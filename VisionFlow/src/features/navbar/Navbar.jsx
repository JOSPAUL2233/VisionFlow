import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";

function Navbar() {
  // Provide a fallback empty array to avoid undefined errors
  const navItems = useSelector((state) => state.navbar.navItems) || [];
  return (
    <nav className="bg-white shadow-md p-4 w-64 min-h-screen">
      <ul className="flex flex-col gap-2">
        {navItems.length === 0 ? (
          <li className="text-gray-400 p-2">No navigation items</li>
        ) : (
          [...navItems]
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              const IconComponent = Icons[item.icon] || Icons.Folder;
              return (
                <li key={item.order}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${
                        isActive ? "bg-blue-100 font-semibold" : ""
                      }`
                    }
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.name}
                  </NavLink>
                </li>
              );
            })
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

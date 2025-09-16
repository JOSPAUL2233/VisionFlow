import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import LogoutButton from "../../ui/LogoutButton";

function Navbar() {

  const navItems = useSelector((state) => state.navbar.navItems) || [];
  const {user} = useSelector((state)=>state.auth);
  
  return (
    <nav className="bg-slate-900 text-white w-64 h-screen flex flex-col shadow-xl fixed left-0 top-0 z-50">


      {/*-----------------------------------------------------Header-----------------------------------------------------*/}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Icons.Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Vision Flow
            </h1>
            <p className="text-xs text-slate-300">{user.loginName} ({user.roleName})</p>
          </div>
        </div>
      </div>

      {/*-----------------------------------------------------Navigation Items-----------------------------------------------------*/}
      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.length === 0 ? (
            <li className="px-3 py-2 text-slate-400 text-sm">
              <div className="flex items-center gap-3">
                <Icons.AlertCircle className="w-4 h-4" />
                No navigation items
              </div>
            </li>
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
                        `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`
                      }
                    >
                      <IconComponent className={`w-5 h-5 transition-transform duration-200 ${
                        ({ isActive }) => isActive ? "scale-110" : "group-hover:scale-105"
                      }`} />
                      <span className="font-medium">{item.name}</span>
                      <div className={`ml-auto w-1 h-1 rounded-full transition-all duration-200 ${
                        ({ isActive }) => isActive ? "bg-white" : "bg-transparent group-hover:bg-slate-400"
                      }`} />
                    </NavLink>
                  </li>
                );
              })
          )}
        </ul>
      </div>

      {/*-----------------------------------------------------Footer-----------------------------------------------------*/}
      <div className="p-3 border-t border-slate-700 mt-auto">
        <div className="px-3 py-2">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
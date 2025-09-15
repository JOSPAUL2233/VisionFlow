import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/auth/authSlice";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(clearUser());
      toast.success("Logged out ✅");
      navigate("/login");
    } catch {
      toast.error("Logout failed ❌");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all duration-200 ease-in-out"
    >
      <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
      <span className="font-medium">Sign Out</span>
    </button>
  );
}

export default LogoutButton;

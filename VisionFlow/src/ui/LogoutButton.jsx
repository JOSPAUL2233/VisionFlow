import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/auth/authSlice";
import authApi from "../api/authApi";
import { toast } from "react-toastify";
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
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}

export default LogoutButton;

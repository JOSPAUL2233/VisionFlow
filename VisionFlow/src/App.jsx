import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setUser, clearUser } from "./features/auth/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import authApi from "./api/authApi";

// Pages
import UserManagementHome from "./pages/UserManagementHome";
import ProjectHome from "./pages/ProjectHome";
import LoginPage from "./pages/LoginPage";
import AuthCheck from "./components/AuthCheck";
import { setNavItems } from "./features/navbar/NavbarSlice";
import { useEffect, useState } from "react";
import Layout from "./components/shared/Layout";
import commonApi from "./api/commonApi";
import DashboardDetails from "./features/dashboard/DashboardDetails";
import TaskHome from "./pages/TaskHome";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  const { user } = useSelector((state) => state.auth);

  //---FETCH USER DETAILS---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.me();
        if (res.data) {
          dispatch(setUser(res.data));
        }
      } catch (err) {
        dispatch(clearUser());
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []); 

  //---FETCH NAVBAR ITEMS---
  useEffect(() => {
    if (user) {
      const fetchNavbar = async () => {
        try {
          const res = await commonApi.getNavbarList({ userId: user.userId, roleId: user.roleId });
          dispatch(setNavItems(res.data.data));
        } catch (err) {
          console.error("Failed to fetch navbar", err);
        }
      };
      fetchNavbar();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            toastClassName="rounded-lg shadow-xl"
          />

          <Routes>
            
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/users"
              element={
                <AuthCheck>
                  <Layout>
                    <UserManagementHome />
                  </Layout>
                </AuthCheck>
              }
            />
            <Route
              path="/projects"
              element={
                <AuthCheck>
                  <Layout>
                    <ProjectHome />
                  </Layout>
                </AuthCheck>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthCheck>
                  <Layout>
                    <DashboardDetails />
                  </Layout>
                </AuthCheck>
              }
            />
            <Route
              path="/tasks"
              element={
                <AuthCheck>
                  <Layout>
                    <TaskHome />
                  </Layout>
                </AuthCheck>
              }
            />

            {/* By Default: redirect to login if no match */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;

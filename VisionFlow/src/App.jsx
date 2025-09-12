import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setUser, clearUser } from "./features/auth/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import authApi from "./api/authApi";

// Pages
import UserManagementHome from "./pages/UserManagementHome";
import ProjectHome from "./pages/ProjectHome";
import LoginPage from "./pages/LoginPage";
import AuthCheck from "./components/AuthCheck";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.me(); // GET /auth/me
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

  if (loading) {
    return <div>Loading...</div>; // spinner/splash screen
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
                  <UserManagementHome />
                </AuthCheck>
              }
            />
            <Route
              path="/projects"
              element={
                <AuthCheck>
                  <ProjectHome />
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

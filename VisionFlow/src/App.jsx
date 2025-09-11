import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/Store";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import UserManagementHome from "./pages/UserManagementHome";
import ProjectHome from "./pages/ProjectHome";
import LoginPage from "./pages/LoginPage";
import AuthCheck from "./components/AuthCheck";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

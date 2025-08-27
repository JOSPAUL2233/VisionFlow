import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/Store"
import { ToastContainer } from "react-toastify";
import UserManagementIndex from "./pages/UserManagementIndex"

function App() {
  
const queryClient = new QueryClient();
  return (
    <>
    <Provider store={store}>   {/* ✅ Redux context */}
      <QueryClientProvider client={queryClient}>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          toastClassName="rounded-lg shadow-xl"
        />
        <UserManagementIndex />
      </QueryClientProvider>
    </Provider>
    </>
  );
}

export default App;
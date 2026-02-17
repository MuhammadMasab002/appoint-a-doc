import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";

import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./services/context/AdminContext";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import AllApointments from "./pages/Admin/AllApointments";

function App() {
  const { authToken } = useContext(AdminContext);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {
          // If authToken exists, user is logged in, else show login page
          // This is a simple client-side check. In a real app, you should also verify the token's validity with the backend.
          authToken ? (
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorList />} />
              <Route path="/all-appointments" element={<AllApointments />} />

              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
          ) : (
            <Route path="/login" element={<SignIn />} />
          )
        }
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

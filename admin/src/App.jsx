import { Navigate, Route, Routes } from "react-router-dom";
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
import { DoctorContext } from "./services/context/DoctorContext";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";

function App() {
  const { authToken } = useContext(AdminContext);
  const { doctorToken } = useContext(DoctorContext);
  const isAuthenticated = Boolean(authToken || doctorToken);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <Navigate
                  to={authToken ? "/admin-dashboard" : "/doctor-dashboard"}
                  replace
                />
              }
            />
            {/* Admin routes */}
            {authToken && (
              <>
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorList />} />
                <Route path="/all-appointments" element={<AllApointments />} />
              </>
            )}

            {/* Doctor routes */}
            {doctorToken && (
              <>
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route
                  path="/doctor-appointments"
                  element={<DoctorAppointments />}
                />
              </>
            )}

            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
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

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import { ToastContainer } from "react-toastify";

const GuestOnlyRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />

          <Route path="/appointment/:doc_id" element={<Appointment />} />

          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />

          <Route
            path="/login"
            element={
              <GuestOnlyRoute>
                <SignIn />
              </GuestOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestOnlyRoute>
                <SignUp />
              </GuestOnlyRoute>
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

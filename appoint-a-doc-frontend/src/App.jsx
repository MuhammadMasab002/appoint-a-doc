import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />

          <Route path="/appointment/:doc_id" element={<Appointment />} />

          <Route path="/my-profile" element={<MyProfile />} />

          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

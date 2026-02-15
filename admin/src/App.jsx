import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route>
          <Route path="/login" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

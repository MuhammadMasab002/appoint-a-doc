import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";
import Sidebar from "../components/navigation/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="lg:flex flex-1">
        <div className="hidden lg:block">
          <Sidebar variant="desktop" />
        </div>
        <main className="flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

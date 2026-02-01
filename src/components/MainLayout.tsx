import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-skysoft">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>

      {/* Main Content */}
      <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div >
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;

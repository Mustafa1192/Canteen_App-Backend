import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Outlet />
    </div>
  );
}

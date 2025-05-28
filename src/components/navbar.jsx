import React from "react";
import LogoCls from "../assets/img/logocls.png";

export const Navbar = () => {
  return (
    <nav className="flex justify-center fixed top-0 left-0 right-0 bg-white z-10">
      <img src={LogoCls} alt="Logo" className="w-24" />
    </nav>
  );
};

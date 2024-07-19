import React from "react";
import LogoCls from "../assets/img/logocls.png";

export const Navbar = () => {
  return (
    <div className="flex justify-center">
      <img src={LogoCls} alt="Logo" className="w-24" />
    </div>
  );
};

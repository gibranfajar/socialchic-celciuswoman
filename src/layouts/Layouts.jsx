import React from "react";
import { Navbar } from "../components/navbar";

export const Layouts = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="relative min-h-screen">{children}</main>
    </React.Fragment>
  );
};

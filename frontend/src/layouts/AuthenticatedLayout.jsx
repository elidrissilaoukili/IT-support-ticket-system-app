import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../authentication/hooks/useAuth";

import NavbarDash from "../components/NavbarDash";


export default function Authenticated({ children }) {
  const user = useAuth();

  return (
    <div>
      <NavbarDash />

      <main>{children}</main>
    </div>
  );
}

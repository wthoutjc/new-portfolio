"use client";
import { useEffect } from "react";

// Components
import { FullsizeLoader } from "@/components/ui/fullsize-loader/fullsize-loader";

// SignOut
import { signOut } from "@/lib/actions/auth.action";

const LogoutPage = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <FullsizeLoader size="medium" text="Cerrando sesión, espere por favor..." />
  );
};

export default LogoutPage;

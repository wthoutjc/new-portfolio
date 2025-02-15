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
    <div className="flex absolute w-screen h-screen bg-[#112233] justify-center z-50">
      <FullsizeLoader
        size="medium"
        text="Cerrando sesión, espere por favor..."
      />
    </div>
  );
};

export default LogoutPage;

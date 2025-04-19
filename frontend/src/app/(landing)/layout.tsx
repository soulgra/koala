import { Footer } from "@/components/layouts/default/footer";
import { Navbar } from "@/components/layouts/default/header";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

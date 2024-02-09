import { ReactNode } from "react";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }} className="--pad">
        {children}
      </div>

      <Footer />
    </>
  );
};

export default Layout;

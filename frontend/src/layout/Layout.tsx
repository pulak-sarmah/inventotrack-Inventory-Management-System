import { ReactNode } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/Footer";

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

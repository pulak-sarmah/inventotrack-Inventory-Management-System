import { ReactNode, useRef, useState } from "react";
import "./sideBar.scss";
import { TbCircleLetterI } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import { menu } from "../../constants";
import SideBarItems from "./SideBarItems";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  children: ReactNode;
}

const SideBar = ({ children }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(sideBarRef, () => setIsOpen(false));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="layout">
      <div
        ref={sideBarRef}
        className="sidebar"
        style={{ width: isOpen ? "20rem" : "6rem" }}
      >
        <div className="top_section" onClick={toggleSidebar}>
          <div
            className="logo"
            style={{ display: isOpen ? "block" : "none" }}
            onClick={() => navigate("/")}
          >
            <TbCircleLetterI size={35} style={{ cursor: "pointer" }} />
          </div>

          <div
            className="bars"
            style={{
              cursor: "pointer",
              marginLeft: isOpen ? "10rem" : "0px",
            }}
          >
            <HiMenuAlt3 />
          </div>
        </div>

        {menu.map((item) => {
          return <SideBarItems key={item.id} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          transition: "all 0.5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default SideBar;

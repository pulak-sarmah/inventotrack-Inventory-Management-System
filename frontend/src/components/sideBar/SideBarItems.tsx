import { useEffect, useState } from "react";
import { Item } from "../../types/types";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./sideBar.scss";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active" : "link";
const activeSublink = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active" : "link";

interface SideBarItemsProps {
  item: Item;
  isOpen: boolean;
}

const SideBarItems = ({ item, isOpen }: SideBarItemsProps) => {
  const [expandMenu, setExpandMenu] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setExpandMenu(false);
    }
  }, [isOpen]);

  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "sidebar-item s-parents open" : "sidebar-item s-parents"
        }
      >
        <div
          className="sidebar-title"
          style={{ cursor: "pointer" }}
          onClick={() => setExpandMenu(isOpen && !expandMenu)}
        >
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight size={25} className="arrow-icon" />
        </div>

        <div className="sidebar-content">
          {item.childrens.map((child) => {
            return (
              <div
                key={child.id}
                className="s-child"
                style={{ cursor: "pointer" }}
              >
                <NavLink to={child.path} className={activeSublink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">{child.title}</div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path!} className={activeLink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SideBarItems;

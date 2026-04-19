import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import Hamburger from "./Hamburger";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Toggle collapse
  const [isOpenSideBar, setIsOpenSideBar] = useState(false); // Toggle sidebar

  return (
    <div>
      {/* Sidebar desktop */}
      <div
        className={`fixed top-0 left-0 h-full bg-slate-200 dark:bg-[rgb(22,27,34)] dark:text-[#A3B3BC] max-md:hidden block
        } ${
          isCollapsed ? "px-0" : "pr-32 pl-5"
        } transition-all duration-500 ease-out`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[7%] p-4 relative">
          <BsLayoutSidebarInset
            size={27}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="cursor-pointer hover:text-gray-500"
          />
        </div>
        {/* Navigation Items */}
        <ul className="p-4 space-y-6">
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <RxDashboard size={27} />
              {!isCollapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <GoPerson size={27} />
              {!isCollapsed && <span>Profile</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <IoSettingsOutline size={27} />
              {!isCollapsed && <span>Settings</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <TbLogout size={27} />
              {!isCollapsed && <span>Logout</span>}
            </a>
          </li>
        </ul>        
      </div>
      {/* Sidebar mobile */}
      {/* hamburger menu */}
      <div
        className="cursor-pointer hidden max-md:block hover:text-gray-500 z-50 top-4 left-4 fixed"
        onClick={() => setIsOpenSideBar(!isOpenSideBar)}
      >
        <Hamburger size={27} />
      </div>
      <div
        className={`fixed top-0 left-0 h-full hidden max-md:block transition-all pr-32 dark:bg-[rgb(22,27,34)] dark:text-[#A3B3BC]
          transform ease-in-out duration-500 z-20 ${
            isOpenSideBar ? "translate-x-[0vw]" : "-translate-x-[100vw]"
          }`}
      >
        {/* Navigation Items */}
        <ul className={`p-4 mt-14 space-y-6 `}>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <RxDashboard size={27} />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <GoPerson size={27} />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <IoSettingsOutline size={27} />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <TbLogout size={27} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
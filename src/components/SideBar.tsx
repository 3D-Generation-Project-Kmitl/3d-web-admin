import { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink as Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import {
  MdSpaceDashboard,
  MdVerifiedUser,
  MdReport,
  MdShoppingCart,
} from "react-icons/md";
import { FaUserAlt, FaMoneyCheckAlt } from "react-icons/fa";
function SideBar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "แดชบอร์ด", icon: <MdSpaceDashboard size={20} />, to: "/" },
    {
      title: "จัดการการยืนยันตัวตน",
      icon: <MdVerifiedUser size={20} />,
      to: "/verify",
    },
    {
      title: "จัดการบัญชีผู้ใช้",
      icon: <FaUserAlt size={20} />,
      to: "/user",
    },
    {
      title: "คำขอถอนเงิน",
      icon: <FaMoneyCheckAlt size={20} />,
      to: "/withdraw",
    },
    {
      title: "จัดการรายงาน",
      icon: <MdReport size={20} />,
      to: "/report",
    },
    {
      title: "จัดการสินค้า",
      icon: <MdShoppingCart size={20} />,
      to: "/product",
    },
  ];

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-white h-screen p-5  pt-8 relative duration-300`}
    >
      <div
        className={`absolute flex justify-center bg-primary cursor-pointer -right-3 top-9 border-gray-200
             border-2 rounded-full p-1 ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      >
        <IoIosArrowBack size={18} className="text-white" />
      </div>

      <div className="flex gap-x-4 items-center">
        <img
          alt="logo"
          src={logo}
          className={`cursor-pointer duration-500 w-10 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-primary origin-left font-medium text-2xl duration-200 
          ${!open && "scale-0"}`}
        >
          Marketplace
        </h1>
      </div>

      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <Link
            to={menu.to}
            key={index}
            className={({ isActive }) =>
              `flex my-3 rounded-md px-2 py-3 cursor-pointer hover:bg-lightWhite text-black text-sm items-center gap-x-4 ${
                isActive && "shadow-sm font-semibold"
              } `
            }
          >
            {menu.icon}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {menu.title}
            </span>
          </Link>
        ))}
      </ul>
      <div className="absolute flex bottom-3 my-3 rounded-md px-2 py-3 cursor-pointer hover:bg-lightWhite text-black text-sm items-center gap-x-4">
        <BiLogOut size={20} className="text-primary" />
        <span
          className={`${
            !open && "hidden"
          } origin-left duration-200 hover:text-primary`}
        >
          ออกจากระบบ
        </span>
      </div>
    </div>
  );
}

export default SideBar;

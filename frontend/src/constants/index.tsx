export const brandStats = [
  {
    number: "500",
    title: "Brands Owners",
    id: 1,
  },
  {
    number: "2K",
    title: "Active Users",
    id: 2,
  },
  {
    number: "50+",
    title: "Partners",
    id: 3,
  },
];

import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

export const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
    id: 1,
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
    id: 2,
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    id: 3,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
        id: 1,
      },
      {
        title: "Edit Profile",
        path: "/profile-update",
        id: 2,
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
    id: 4,
  },
];

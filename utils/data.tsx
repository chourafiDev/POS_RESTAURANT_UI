import { FaUsers } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { RiHome6Fill } from "react-icons/ri";
import { BsFillClockFill } from "react-icons/bs";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";

// Icons
import {
  burger,
  cake,
  dish,
  dessert,
  doughnut,
  meat,
  pizza,
  salad,
  sushi,
  taco,
  juice,
  soup,
  chicken,
  fish,
} from "@/utils/assets";

export const categories = [
  {
    id: 1,
    name: "Burger",
    icon: burger,
  },
  {
    id: 2,
    name: "Cacke",
    icon: cake,
  },
  {
    id: 3,
    name: "Dish",
    icon: dish,
  },
  {
    id: 4,
    name: "Doughnut",
    icon: doughnut,
  },
  {
    id: 5,
    name: "Juice",
    icon: juice,
  },
  {
    id: 6,
    name: "Pizza",
    icon: pizza,
  },
  {
    id: 7,
    name: "Sushi",
    icon: sushi,
  },
  {
    id: 8,
    name: "Taco",
    icon: taco,
  },
  {
    id: 9,
    name: "Salad",
    icon: salad,
  },
  {
    id: 10,
    name: "Meat",
    icon: meat,
  },
  {
    id: 11,
    name: "Dessert",
    icon: dessert,
  },
  {
    id: 12,
    name: "Soup",
    icon: soup,
  },
  {
    id: 13,
    name: "Chicken",
    icon: chicken,
  },
  {
    id: 14,
    name: "Fish",
    icon: fish,
  },
];

export const links = [
  {
    title: "Home",
    link: "/",
    icon: <RiHome6Fill size={20} />,
  },
  {
    title: "Order",
    link: "/order",
    icon: <HiShoppingCart size={20} />,
  },
  {
    title: "Users",
    link: "/users",
    icon: <FaUsers size={20} />,
  },
  {
    title: "Tables",
    link: "/tables",
    icon: <RiLayoutMasonryFill size={20} />,
  },
  {
    title: "History",
    link: "/history",
    icon: <BsFillClockFill size={20} />,
  },
  {
    title: "Settings",
    link: "/setting",
    icon: <AiFillSetting size={20} />,
  },
];

export const statusList = ["Available", "Booked", "Billed", "Occupied"];

export const statistics = [
  {
    id: "revenue",
    total: 2.045,
  },
  {
    id: "totalOrders",
    total: 82,
  },
  {
    id: "totalCustomers",
    total: 43,
  },
  {
    id: "totalEmployees",
    total: 27,
  },
];

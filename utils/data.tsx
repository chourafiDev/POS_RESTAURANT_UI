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

export const oredrs = [
  {
    id: 1,
    title: "Breadtalk With Foam",
    desc: "No Chocolate",
    price: 22.56,
    total: 2,
    image: "bread.jpg",
  },
  {
    id: 2,
    title: "Special Spicy Fried Rice",
    desc: "Not Spicy",
    price: 22.56,
    total: 2,
    image: "bread.jpg",
  },
  {
    id: 3,
    title: "Seblak Beef Macaroni",
    desc: "Spicy with 10 Chilies",
    price: 22.56,
    total: 2,
    image: "bread.jpg",
  },
];

export const ordersList = [
  {
    orderId: "#906753",
    table: "T-6",
    Qta: 8,
    time: "20:30pm",
    price: 40.99,
  },
  {
    orderId: "#906893",
    table: "T-10",
    Qta: 6,
    time: "23:00pm",
    price: 40.99,
  },
  {
    orderId: "#956753",
    table: "T-5",
    Qta: 3,
    time: "09:00pm",
    price: 40.99,
  },
  {
    orderId: "#906798",
    table: "T-2",
    Qta: 2,
    time: "20:00pm",
    price: 40.99,
  },
  {
    orderId: "#906243",
    table: "T-1",
    Qta: 9,
    time: "14:00pm",
    price: 40.99,
  },
  {
    orderId: "#909053",
    table: "T-12",
    Qta: 4,
    time: "15:00pm",
    price: 40.99,
  },
  {
    orderId: "#906353",
    table: "T-15",
    Qta: 3,
    time: "10:30pm",
    price: 40.99,
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

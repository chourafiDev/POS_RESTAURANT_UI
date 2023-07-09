import { FaUsers } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { RiHome6Fill } from "react-icons/ri";
import { BsFillClockFill } from "react-icons/bs";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import {
  burger,
  cake,
  dessert,
  dish,
  doughnut,
  juice,
  meat,
  pizza,
  salad,
  sushi,
  taco,
} from "./assets";

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

export const categories = [
  {
    id: 1,
    name: "All",
    icon: dish,
  },
  {
    id: 2,
    name: "Burger",
    icon: burger,
  },
  {
    id: 3,
    name: "Juice",
    icon: juice,
  },
  {
    id: 4,
    name: "Salad",
    icon: salad,
  },
  {
    id: 5,
    name: "Taco",
    icon: taco,
    total: 50,
  },
  {
    id: 6,
    name: "Dessert",
    icon: dessert,
  },
  {
    id: 7,
    name: "Pizza",
    icon: pizza,
  },
  {
    id: 8,
    name: "Sushi",
    icon: sushi,
  },
  {
    id: 9,
    name: "Meat",
    icon: meat,
  },
  {
    id: 10,
    name: "Cake",
    icon: cake,
  },
  {
    id: 11,
    name: "Doughnut",
    icon: doughnut,
  },
];

export const menu = [
  {
    id: 1,
    title: "Tacos Salsa With Chicken",
    price: 17.22,
    image: "tacos-salsa.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 2,
    title: "Chicken Burger With Fries",
    price: 17.22,
    image: "black-chicken.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 3,
    title: "Meat Burger With Chips",
    price: 17.22,
    image: "meat-burger.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 4,
    title: "Meat Burger With Fries",
    price: 17.22,
    image: "meat-burger.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 5,
    title: "Strawberry Juice With Seed",
    price: 17.22,
    image: "strawberry-juice.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 6,
    title: "Orange Juice With Seed",
    price: 17.22,
    image: "orange-juice.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 7,
    title: "Orange Juice With Basil",
    price: 17.22,
    image: "orange-juice.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 8,
    title: "Vegetable Salad With Eggs",
    price: 17.22,
    image: "vegetable-salad.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 9,
    title: "Meat Sushi Maki With Tuna",
    price: 17.22,
    image: "sushi.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  {
    id: 10,
    title: "Meat Sushi Maki With Tuna",
    price: 17.22,
    image: "sushi.jpg",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
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

export const tables = [
  {
    number: "T-01",
    guests: 4,
    status: "available",
  },
  {
    number: "T-02",
    guests: 4,
    status: "occupied",
  },
  {
    number: "T-03",
    guests: 8,
    status: "occupied",
  },
  {
    number: "T-04",
    guests: 4,
    status: "occupied",
  },
  {
    number: "T-05",
    guests: 4,
    status: "booked",
  },
  {
    number: "T-06",
    guests: 4,
    status: "occupied",
  },
  {
    number: "T-07",
    guests: 8,
    status: "occupied",
  },
  {
    number: "T-08",
    guests: 8,
    status: "billed",
  },
  {
    number: "T-09",
    guests: 4,
    status: "billed",
  },
  {
    number: "T-10",
    guests: 8,
    status: "billed",
  },
  {
    number: "T-11",
    guests: 4,
    status: "available",
  },
  {
    number: "T-12",
    guests: 4,
    status: "booked",
  },
  {
    number: "T-13",
    guests: 8,
    status: "booked",
  },
  {
    number: "T-14",
    guests: 8,
    status: "available",
  },
  {
    number: "T-15",
    guests: 4,
    status: "available",
  },
  {
    number: "T-16",
    guests: 4,
    status: "occupied",
  },
  {
    number: "T-17",
    guests: 8,
    status: "billed",
  },
  {
    number: "T-18",
    guests: 8,
    status: "billed",
  },
  {
    number: "T-19",
    guests: 4,
    status: "occupied",
  },
  {
    number: "T-20",
    guests: 4,
    status: "available",
  },
];

export const history = [
  {
    orderId: 9038734,
    date: "28 jun, 2023",
    table: "T1",
    price: 45.67,
    paymentType: "Debut",
  },
  {
    orderId: 9038756,
    date: "28 jun, 2023",
    table: "T1",
    price: 45.67,
    paymentType: "Cash",
  },
  {
    orderId: 9036834,
    date: "28 jun, 2023",
    table: "T1",
    price: 45.67,
    paymentType: "Debut",
  },
  {
    orderId: 9097734,
    date: "28 jun, 2023",
    table: "T1",
    price: 45.67,
    paymentType: "E-Wallet",
  },
  {
    orderId: 9038354,
    date: "28 jun, 2023",
    table: "T1",
    price: 45.67,
    paymentType: "Cash",
  },
  {
    orderId: 9039034,
    date: "28 jun, 2023",
    table: "T1",
    price: 45.67,
    paymentType: "E-Wallet",
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

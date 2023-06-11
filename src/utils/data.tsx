import { FaUsers } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { RiHome6Fill, RiLogoutCircleRFill } from "react-icons/ri";
import { MdOutlineHelp } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";
import { RiLayoutMasonryFill } from "react-icons/ri";

export const links = [
  {
    title: "Home",
    link: "/",
    icon: <RiHome6Fill size={20} className="text-dark/60" />,
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
    title: "Log out",
    link: "/logout",
    icon: <RiLogoutCircleRFill size={23} />,
  },
];

export const categories = [
  {
    id: 1,
    name: "All",
    icon: "dish.png",
    total: 200,
  },
  {
    id: 2,
    name: "Burger",
    icon: "burger.png",
    total: 5,
  },
  {
    id: 3,
    name: "Juice",
    icon: "juice.png",
    total: 5,
  },
  {
    id: 4,
    name: "Salad",
    icon: "salad.png",
    total: 5,
  },
  {
    id: 5,
    name: "Taco",
    icon: "taco.png",
    total: 50,
  },
  {
    id: 6,
    name: "Dessert",
    icon: "dessert.png",
    total: 50,
  },
  {
    id: 7,
    name: "Pizza",
    icon: "pizza.png",
    total: 50,
  },
  {
    id: 8,
    name: "Sushi",
    icon: "sushi.png",
    total: 50,
  },
  {
    id: 9,
    name: "Meat",
    icon: "meat.png",
    total: 50,
  },
  {
    id: 10,
    name: "Cake",
    icon: "cake.png",
    total: 50,
  },
  {
    id: 11,
    name: "Doughnut",
    icon: "doughnut.png",
    total: 50,
  },
];

export const menu = [
  {
    id: 1,
    title: "Tacos Salsa With Chicken",
    price: 17.22,
    image: "tacos-salsa.jpg",
  },
  {
    id: 2,
    title: "Chicken Burger With Fries",
    price: 17.22,
    image: "black-chicken.jpg",
  },
  {
    id: 3,
    title: "Meat Burger With Chips",
    price: 17.22,
    image: "meat-burger.jpg",
  },
  {
    id: 4,
    title: "Meat Burger With Fries",
    price: 17.22,
    image: "meat-burger.jpg",
  },
  {
    id: 5,
    title: "Strawberry Juice With Seed",
    price: 17.22,
    image: "strawberry-juice.jpg",
  },
  {
    id: 6,
    title: "Orange Juice With Seed",
    price: 17.22,
    image: "orange-juice.jpg",
  },
  {
    id: 7,
    title: "Orange Juice With Basil",
    price: 17.22,
    image: "orange-juice.jpg",
  },
  {
    id: 8,
    title: "Vegetable Salad With Eggs",
    price: 17.22,
    image: "vegetable-salad.jpg",
  },
  {
    id: 9,
    title: "Meat Sushi Maki With Tuna",
    price: 17.22,
    image: "sushi.jpg",
  },
  {
    id: 10,
    title: "Meat Sushi Maki With Tuna",
    price: 17.22,
    image: "sushi.jpg",
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
    id: 1,
    title: "Special Spicy Fried Rice",
    desc: "Not Spicy",
    price: 22.56,
    total: 2,
    image: "bread.jpg",
  },
  {
    id: 1,
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

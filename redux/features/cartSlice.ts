import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

type Item = {
  id: string;
  image: string;
  title: string;
  price: number;
  qty: number;
  note: string;
  options: string[];
};

type Customer = {
  fullname: string;
  email: string;
  phone: string;
};

type TableOrderInfo = {
  number: string;
  tables: number[];
  customer: Customer;
  guests: number;
};

const ordersCookie = Cookie.get("orders");

const orderPriceCookie = Cookie.get("orderPrice");
const tableOrderCookie = Cookie.get("tableOrder");

const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2)); //17.3456 to 17.35;
};

const initialState = {
  tableOrderInfo: tableOrderCookie
    ? (JSON.parse(tableOrderCookie) as TableOrderInfo)
    : ({} as TableOrderInfo),
  cartItems: ordersCookie
    ? (JSON.parse(ordersCookie) as Item[])
    : ([] as Item[]),
  itemsPrice: orderPriceCookie ? JSON.parse(orderPriceCookie).totalPrice : 0,
};

const cartSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addTableOrder(state, action: PayloadAction<any>) {
      const {
        number,
        tables,
        customer: { fullname, email, phone },
        guests,
      } = action.payload;

      state.tableOrderInfo = {
        number,
        tables,
        customer: { fullname, email, phone },
        guests,
      };

      Cookie.set("tableOrder", JSON.stringify(state.tableOrderInfo));
    },
    addToCart(state, action: PayloadAction<any>) {
      const { type, item } = action.payload;

      const existItem = state.cartItems.find((el: Item) => el.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((el: Item) =>
          el.id === existItem.id
            ? { ...el, qty: type == "increase" ? el.qty + 1 : el.qty - 1 }
            : el
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      const orderPrice = {
        totalPrice: state.itemsPrice,
      };

      Cookie.set("orders", JSON.stringify(state.cartItems));
      Cookie.set("orderPrice", JSON.stringify(orderPrice));
    },
    removeFromCart(state, action: PayloadAction<any>) {
      state.cartItems = state.cartItems.filter(
        (el) => el.id !== action.payload
      );

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      const orderPrice = {
        totalPrice: state.itemsPrice,
      };

      Cookie.set("orders", JSON.stringify(state.cartItems));
      Cookie.set("orderPrice", JSON.stringify(orderPrice));
    },
  },
});

export const { addToCart, removeFromCart, addTableOrder } = cartSlice.actions;
export default cartSlice.reducer;

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
  phone: string;
};

type TableOrderInfo = {
  number: string;
  tables: number[];
  customer: Customer;
  guests: number;
};

type Order = {
  loading: boolean;
  total: number;
  itemsPrice: number;
  subtotal: number;
  totalSalesTax: number;
  tableInfo: TableOrderInfo;
  items: Item[];
};

const ordersCookie = Cookie.get("orders");

const orderPriceCookie = Cookie.get("orderPrice");
const orderPrice = orderPriceCookie ? JSON.parse(orderPriceCookie) : {};

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
  subtotal: orderPrice.subtotal ? orderPrice.subtotal : 0,
  totalSalesTax: orderPrice.totalSalesTax ? orderPrice.totalSalesTax : 0,
  totalPrice: orderPrice.totalPrice ? orderPrice.totalPrice : 0,
  itemsPrice: 0,
};

const cartSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addTableOrder(state, action: PayloadAction<any>) {
      const {
        number,
        tables,
        customer: { fullname, phone },
        guests,
      } = action.payload;

      state.tableOrderInfo = {
        number,
        tables,
        customer: { fullname, phone },
        guests,
      };

      Cookie.set("tableOrder", JSON.stringify(state.tableOrderInfo));
    },
    addToCart(state, action: PayloadAction<any>) {
      const item = action.payload;

      const existItem = state.cartItems.find((el: Item) => el.id === item.id);

      if (existItem) {
        // When exist items is true we update it with the new item in the palyload
        state.cartItems = state.cartItems.map((el: Item) =>
          el.id === existItem.id ? item : el
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      const discount = 3;
      const salesTax = 0.35;

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, items) => acc + items.price * item.qty, 0)
      );

      // Calculate subtotal
      state.subtotal = addDecimals(state.itemsPrice - discount);

      // Calculate total sales tax
      state.totalSalesTax = addDecimals(Number(salesTax * state.subtotal));

      // Calculate total price
      state.totalPrice = addDecimals(
        Number(state.subtotal) + Number(state.totalSalesTax)
      );

      const orderPrice = {
        totalPrice: state.totalPrice,
        subtotal: state.subtotal,
        totalSalesTax: state.totalSalesTax,
      };

      Cookie.set("orders", JSON.stringify(state.cartItems));
      Cookie.set("orderPrice", JSON.stringify(orderPrice));
    },
    removeFromCart(state, action: PayloadAction<any>) {
      state.cartItems = state.cartItems.filter(
        (el) => el.id !== action.payload
      );

      const discount = 3;
      const salesTax = 0;

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate subtotal
      state.subtotal = addDecimals(state.itemsPrice - discount);

      // Calculate total sales tax
      state.totalSalesTax = addDecimals(Number(salesTax * state.subtotal));

      // Calculate total price
      state.totalPrice = addDecimals(
        Number(state.subtotal) + Number(state.totalSalesTax)
      );

      const orderPrice = {
        totalPrice: state.totalPrice,
        subtotal: state.subtotal,
        totalSalesTax: state.totalSalesTax,
      };

      Cookie.set("orders", JSON.stringify(state.cartItems));
      Cookie.set("orderPrice", JSON.stringify(orderPrice));
    },
  },
});

export const { addToCart, removeFromCart, addTableOrder } = cartSlice.actions;
export default cartSlice.reducer;

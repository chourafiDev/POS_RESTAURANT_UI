export interface Order {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  note: string;
  options: string[];
}

export interface OrderedList {
  orderId: string;
  table: string;
  Qta: number;
  time: string;
  price: number;
}

// ------------------------
export interface Image {
  public_id: any;
  url: any;
}

export interface User {
  image: Image;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  role: string;
}

export interface Category {
  _id: string;
  name: string;
  icon: Image;
  description: string;
  createdAt?: string;
  totalProducts?: number;
}

export interface Product {
  _id: string;
  image: Image;
  userId: string;
  title: string;
  description: string;
  price: number;
  options: string[];
  category?: string;
  categoryDetails?: Category;
}

export interface Table {
  _id: string;
  number: number;
  numberOfGuests: number;
  status: string;
}

export interface History {
  _id: string;
  action: string;
  description: string;
  user: string;
  createdAt: string;
}

// Order
export interface Order {
  _id: string;
  table_order: TableOrder;
  userId: string;
  customerId: OrderCustomerId;
  orderId: string;
  items: OrderItem[];
  amountPaid: number;
  payment_status: string;
  createdAt: string;
}

export interface TableOrder {
  guests: number;
  tables: number[];
}

export interface OrderCustomerId {
  name: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  options: any[];
  image: string;
  qty: number;
  note: string;
  _id: string;
}

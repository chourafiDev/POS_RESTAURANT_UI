export interface Category {
  id: number;
  name: string;
  icon: string;
  total: number;
}

export interface Menu {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface Order {
  id: number;
  title: string;
  desc: string;
  price: number;
  total: number;
  image: string;
}

export interface Table {
  number: string;
  guests: number;
  status: string;
}

export interface OrderedList {
  orderId: string;
  table: string;
  Qta: number;
  time: string;
  price: number;
}

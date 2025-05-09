import { UserCredential } from 'firebase/auth';



export type BlogPost = {
  slug: string;
  title: string;
  cover: string;
  date: string;
  content: string[];
};

export type BicycleType = 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
export type BicycleCategory =
  | 'Men'
  | 'Women'
  | 'Kids'
  | 'Commuter'
  | 'Sport'
  | 'Professional'
  | 'Casual'
  | 'Urban Series'
  | 'Premium'
  | 'Budget';
export interface Bicycle {
  _id?: string;
  rating?: number;
  name: string;
  brand: string;
  model: string;
  img: string;
  price: number;
  type: BicycleType;
  category: BicycleCategory;
  description?: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
}

// updatedAt
// createdAt

//  query parameters for searching and filtering |> product Api
export interface GetAllBicyclesParams {
  searchTerm?: string;
  brand?: string;
  category?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetAllOrderParams {
  _id: string;
  email: string;
  product: string;
  status: string;
  createdAt: Date;
  quantity: number;
  totalPrice: number;
}

export interface TOrder {
  email: string;
  title?: string;
  product: string;
  quantity: number;
  status: string;
  transaction: string;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

// export interface IBicycle {
//   name: string;
//   brand: string;
//   price: number;
//   type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
//   description?: string;
//   quantity: number;
//   inStock: boolean;
//   isDeleted: boolean;
// }

export interface CustomUser {
  uid?: string;
  name?: string;
  email: string;
  role?: string;
}

export interface AuthInfo {
  user: CustomUser;
  loading: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
}

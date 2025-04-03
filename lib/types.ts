import { DefaultSession } from "next-auth";

export interface RegisterRequest {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CustomUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }

  interface User extends CustomUser {
    // Adding explicit fields to satisfy the lint rule
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

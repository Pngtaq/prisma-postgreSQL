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

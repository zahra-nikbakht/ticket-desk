import { http } from "../../../shared/api/http";
import { User } from "../../../shared/types/auth";

export type RegisterPayload = { name: string; email: string; password: string };
export type RegisterResponse = { ok: boolean; user: User };

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { ok: boolean; accessToken: string; user: User };

export const register = async (payload: RegisterPayload) => {
  const { data } = await http.post<RegisterResponse>("/auth/register", payload);
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await http.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await http.get<{ ok: boolean; user: User }>("/auth/me");
  return data.user;
};

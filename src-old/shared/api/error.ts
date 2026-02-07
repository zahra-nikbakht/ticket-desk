import axios from "axios";

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as any;
    return data?.message || err.message || "Request failed";
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}

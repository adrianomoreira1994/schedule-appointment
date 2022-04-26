import axios, { AxiosError } from "axios";
import { addPointerEvent } from "framer-motion";
import { destroyCookie, parseCookies } from "nookies";
import { signOut } from "../hooks/auth";

export function setupApiClient(ctx: any = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8081/api/v1",
    headers: {
      Authorization: `Bearer ${cookies["@Finpec:token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (process.browser) {
          signOut();
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

import React, { createContext, ReactNode, useState, useEffect } from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";

type AuthContextData = {
  signIn(credentials: SigninCredentials): Promise<void>;
  clearAuth(): void;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SigninCredentials = {
  email: string;
  password: string;
};

type User = {
  username: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "@Finpec:token");
  destroyCookie(undefined, "@Finpec:user");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  function clearAuth() {
    setUser(undefined);
  }

  useEffect(() => {
    const { "@Finpec:token": token, "@Finpec:user": username } = parseCookies();

    if (token) {
      api
        .get("/account/me")
        .then((response) => {
          const { username } = response.data;
          setUser({ username });
        })
        .catch((error) => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SigninCredentials) {
    const response = await api.post("/account/signin", {
      username: email,
      password,
    });

    const { username, access_token } = response.data;

    setCookie(undefined, "@Finpec:token", access_token, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });

    setCookie(undefined, "@Finpec:user", username, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });

    setUser({
      username,
    });

    api.defaults.headers["Authorization"] = `Bearer ${access_token}`;

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ signIn, clearAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

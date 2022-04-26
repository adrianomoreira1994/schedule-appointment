import React from "react";

import { AuthProvider } from "./auth";

const AppProvider: React.FC = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;

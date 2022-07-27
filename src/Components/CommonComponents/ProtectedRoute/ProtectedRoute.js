import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../App";
const ProtectedRoute = ({ children }) => {
  const [, user] = React.useContext(AuthContext);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

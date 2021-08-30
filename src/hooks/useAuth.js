//https://ui.dev/react-router-v5-protected-routes-authentication/

import { useState } from "react";

export default function useAuth() {

  const [isAuthenticated, setIsAuthenticated ] = useState(false);
  const [isAdmin, setIsAdmin ] = useState(false);

  // const getToken = () => {
  //   const tokenString = sessionStorage.getItem("token");
  //   return tokenString;
  // };

  // const setToken = userToken => {
  //     sessionStorage.setItem("token", userToken);
  // };

  // const setRoles = userRoles => {
  //     sessionStorage.setItem("roles", userRoles);
  // }

  const setUserInfo = info => {
    sessionStorage.setItem("token", info.token);
    sessionStorage.setItem("roles", info.roles);
    setIsAuthenticated(info.token !== null);
    setIsAdmin(info.roles && info.roles.length > 0 && info.roles.indexOf("admin") > -1);
  }

  // const isAdmin = () => {
  //   const roles = sessionStorage.getItem("roles");
  //   return (roles && roles.length > 0 && roles.indexOf("admin") > -1);
  // }

  const clearUser = () => {
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("token");
    setIsAdmin(false);
    setIsAuthenticated(false);
  }

  return {
    setUserInfo,
    isAuthenticated,
    isAdmin,
    //getToken,
    //setRoles,
    clearUser
  }
}
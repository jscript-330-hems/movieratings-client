//https://ui.dev/react-router-v5-protected-routes-authentication/

export default function useAuth() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    return tokenString;
  };

  const setToken = userToken => {
      sessionStorage.setItem("token", userToken);
  };

  const setRoles = userRoles => {
      sessionStorage.setItem("roles", userRoles);
  }

  const isAdmin = () => {
    const roles = sessionStorage.getItem("roles");
    return (roles && roles.length > 0 && roles.indexOf("admin") > -1);
  }

  const clearUser = () => {
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("token");
  }

  return {
    setToken,
    getToken,
    setRoles,
    isAdmin,
    clearUser
  }
}
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context";

export default function LogOut() {
  const { user, dispatchUserEvent } = useContext(AppContext);
  const history = useHistory();

  async function handleLogout() {
    dispatchUserEvent("LOGOUT", null);
    history.push("/");
  }

  return <>{user && <button onClick={handleLogout}>Log out</button>}</>;
}

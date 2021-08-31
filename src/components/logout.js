import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context";
import { Button } from "react-bootstrap";

export default function LogOut() {
  const { user, dispatchUserEvent } = useContext(AppContext);
  const history = useHistory();

  async function handleLogout() {
    dispatchUserEvent("LOGOUT", null);
    history.push("/");
  }

  return (
    <>
      {user && (
        <Button
          style={{
            color: "black",
            backgroundColor: "#e3f2fd",
            borderColor: "#e3f2fd",
          }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      )}
    </>
  );
}

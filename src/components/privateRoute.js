import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context";

export default function PrivateRoute({ requiresAdmin, children, ...rest }) {
  const { user } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (requiresAdmin && (!user || !user.roles.indexOf("admin") < 0))
          return <Redirect to="/notanadmin" />;

        return user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

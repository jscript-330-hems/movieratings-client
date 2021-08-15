import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogOut from "./logout";
import { AppContext } from '../context';

export default function Home() {
  const { user } = useContext(AppContext);

  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/movies">List of movies</Link>
      <br />
      <Link to="/writereview">Write a review</Link>
      <br />

      {!user && (
        <>
          <Link to="/signup">Sign up</Link>
          <br />
          <Link to="/login">Log in</Link>
          <br />
        </>
      )}

    {user && user.roles.indexOf("admin") > -1 && (
        <Link to="/adminarea">Admin Area</Link>
    )}
      <br />
      {user && <LogOut />}
    </>
  );
}

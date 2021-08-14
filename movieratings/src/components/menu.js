import React from "react";
import { Link } from "react-router-dom";
import LogOut from "./logout";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { getToken, isAdmin } = useAuth();

  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/movies">List of movies</Link>
      <br />
      <Link to="/writereview">Write a review</Link>
      <br />

      {getToken() === null && (
        <>
          <Link to="/signup">Sign up</Link>
          <br />
          <Link to="/login">Log in</Link>
          <br />
        </>
      )}

    {isAdmin() && (
        <Link to="/adminarea">Admin Area</Link>
    )}
      <br />
      {getToken() !== null && <LogOut />}
      
    </>
  );
}

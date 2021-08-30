import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogOut from "./logout";
import { AppContext } from "../context";

export default function Menu() {
  const { user } = useContext(AppContext);

  return (
    <>
      <nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd', marginBottom:"20px"}}>
        <Link className="menuLink" to="/">
          Home
        </Link>
        <br />
        <Link className="menuLink" to="/movies">
          Movies
        </Link>
        <br />
        <Link className="menuLink" to="/theaters">
          Theaters
        </Link>
        <br />
        {user && (
          <>
            <Link className="menuLink" to="/writereview">
              Write a review
            </Link>
            <br />
          </>
        )}
        {!user && (
          <>
            <Link className="menuLink" to="/signup">
              Sign up
            </Link>
            <br />
            <Link className="menuLink bi bi-person-circle me-2" to="/login">
              Log in
            </Link>
            <br />
          </>
        )}
        {user && user.roles.indexOf("admin") > -1 && (
          <Link className="menuLink" to="/adminarea">
            Admin Area
          </Link>
        )}
        <br />
        {user && <LogOut />}
      </nav>
    </>
  );
}

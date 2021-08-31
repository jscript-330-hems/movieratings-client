import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogOut from "./logout";
import { AppContext } from "../context";

export default function Menu() {
  const { user } = useContext(AppContext);

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#e3f2fd", marginBottom: "20px" }}
      >
        <br />
        <div className="homeImgContainer">
          <div className="bi bi-film menuLink"></div>
          <Link className="menuLink" to="/">
            Home
          </Link>
        </div>
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
              Write a Review
            </Link>
            <br />
          </>
        )}
        {!user && (
          <>
            <Link className="menuLink" to="/signup">
              Sign Up
            </Link>
            <br />
            <div className="loginImgContainer">
              <div className="bi bi-person-circle me-2 menuLink"></div>
              <Link className="menuLink" to="/login">
                Log In
              </Link>
            </div>

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

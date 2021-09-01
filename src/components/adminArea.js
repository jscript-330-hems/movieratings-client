import React from "react";
import { Container } from "react-bootstrap";
import EditTheater from "./editTheater";
import DeleteTheater from "./deleteTheater";
import AddTheater from "./addTheater";

export default function AdminArea() {
  return (
    <>
      <Container
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="adminFeatures">
          <EditTheater></EditTheater>
          <DeleteTheater></DeleteTheater>
          <AddTheater></AddTheater>
        </div>
        <h1 style={{ textAlign: "center" }}>Admin Area</h1>
        <br />
        <p>
          Admin Area. This should be protected and viewable to only admins. The
          thought is that the "roles" array is saved to sessionStorage locally
          to control whether a link to this area is shown. But even if the
          client played with this in the browser dev tools, the Express routes
          would still do a check to make sure the user is really in the role
          according to the database record.
        </p>
      </Container>
    </>
  );
}

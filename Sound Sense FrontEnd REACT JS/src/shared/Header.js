import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

  return (
    <>
      <Navbar className="header" bg="primary" variant="primary">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to={"/"}>
              Eary
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
            <Link className="nav-link" to={"/about"}>
              About Us
            </Link>

            {/* Admin Routes  */}

            {auth && auth.role === 1 && (
              <>
                <Link className="nav-link" to={"/manage-form"}>
                  Forms
                </Link>
                <Link className="nav-link" to={"/manage-user"}>
                  Users
                </Link>
              </>
            )}
            {/* User Routes  */}
            {auth && auth.role === 0 && (
              <>
                <Link className="nav-link" to={"/Exam"}>
                  Exam
                </Link>
                <Link className="nav-link" to={"/Exam/score"}>
                  Score
                </Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && (
              <>
                {" "}
                <Nav.Link onClick={Logout}>Logout</Nav.Link>{" "}
                <Link className="nav-link" to={"/profile"}>
                  profile
                </Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {!auth && (
              <>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import avatar from "../img/avatar.png";

const Navbar = props => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <p className="navbar-brand home-button">Multiline Search</p>

      <ul className="navbar-nav">
        <li className="nav-item ">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>

      <div className="nav-user-container">
        <p className="welcome-text">
          Welcome <i>User</i>
        </p>
        <img src={avatar} alt="Avatar" className="avatar mr-3"></img>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </div>
    </nav>
  );
};

export default Navbar;

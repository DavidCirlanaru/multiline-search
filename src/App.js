import React, { Component } from "react";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
import { Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  state = {
    formInputs: {
      searchInput: "",
      replaceInput: "",
      textareaInput: ""
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container main-container mt-5">
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

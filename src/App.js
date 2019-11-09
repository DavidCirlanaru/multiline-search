import React, { Component } from "react";
import Dashboard from "./components/dashboard";
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
      <div className="container main-container h-100 my-auto">
        <Dashboard />
      </div>
    );
  }
}

export default App;

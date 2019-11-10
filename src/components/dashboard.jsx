import React, { Component } from "react";
import _ from "underscore";
import Textarea from "./textarea";
import FilterRow from "./filterRow";
import Recommends from "./recomends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faSearch,
  faUndo
} from "@fortawesome/free-solid-svg-icons";

class Dashboard extends Component {
  state = {
    inputs: [{ search: "", replace: "" }],
    textareaInput: "",
    changesApplied: 0
  };

  searchAndReplace = (searchArray, replaceArray) => {
    let { textareaInput: textarea } = this.state;
    let mapObj = _.object(searchArray, replaceArray);
    console.log(mapObj);
    let counter = 0;

    let regularExp = new RegExp(Object.keys(mapObj).join("|"), "gi");
    textarea = textarea.replace(regularExp, function(matched) {
      counter += mapObj[matched];

      return mapObj[matched];
    });

    const resultsCounter = counter.length - 1;

    return [textarea, resultsCounter];
  };

  handleSubmit = e => {
    e.preventDefault();

    const inputs = { ...this.state.inputs };
    const searchArray = _.map(inputs, function(item) {
      return item.search;
    });

    const replaceArray = _.map(inputs, function(item) {
      return item.replace;
    });

    const filteredTextarea = this.searchAndReplace(searchArray, replaceArray);

    this.setState({
      textareaInput: filteredTextarea[0],
      changesApplied: filteredTextarea[1]
    });
  };

  addNewRow = () => {
    this.setState(prevState => ({
      inputs: [...prevState.inputs, { search: "", replace: "" }]
    }));
  };

  handleChange = e => {
    if (["search", "replace"].includes(e.target.className)) {
      let inputs = [...this.state.inputs];
      inputs[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ inputs });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleAddButton = () => {
    this.setState({
      inputs: [...this.state.inputs, { search: "", replace: "" }]
    });

    console.log("Total inputs", this.state.inputs);
  };

  handleDeleteButton = () => {
    let filteredInputs = [...this.state.inputs].filter(
      item => item !== this.state.inputs[this.state.inputs.length - 1]
    );

    this.setState({ inputs: filteredInputs });
  };

  clearInputs = () => {
    this.setState({ inputs: [{ search: "", replace: "" }], textareaInput: "" });
  };

  render() {
    let { textareaInput, inputs } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-3 main-column">
            <div className="row">
              <h4 className="column-heading">Search & Replace</h4>
              <div className="col-1 plus-circle">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  onClick={this.handleAddButton}
                />
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  onClick={this.handleDeleteButton}
                />
              </div>
            </div>
            <div className="form-group ">
              <FilterRow inputs={inputs} handleChange={this.handleChange} />
              <div className="row">
                <button className="btn-sm btn-success btn find-replace-button">
                  Find & Replace <FontAwesomeIcon icon={faSearch} />
                </button>
                <button className="btn-sm btn-info btn find-replace-button">
                  Undo <FontAwesomeIcon icon={faUndo} />
                </button>
                <button
                  onClick={this.clearInputs}
                  className="btn-sm btn-secondary btn find-replace-button"
                >
                  Clear />
                </button>
              </div>
            </div>
          </div>
          <div className="col-6 ">
            <p>
              Changes applied :{" "}
              <span className="badge badge-success">
                {this.state.changesApplied.toString()}
              </span>
            </p>
            <Textarea
              value={textareaInput}
              onChange={this.handleChange}
              id="textarea"
              name="textarea"
            />
          </div>
          <div className="col-3 main-column">
            <Recommends />
          </div>
        </div>
      </form>
    );
  }
}

export default Dashboard;

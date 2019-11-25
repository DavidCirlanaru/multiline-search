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
    textareaHistory: [""],
    savedParameters: [],
    changesApplied: 0
  };

  searchAndReplace = (searchArray, replaceArray) => {
    let { textareaInput: textarea } = this.state;
    let mapObj = _.object(searchArray, replaceArray);
    let counter = 0;

    let regularExp = new RegExp(Object.keys(mapObj).join("|"), "gi");
    textarea = textarea.replace(regularExp, function(matched) {
      counter += mapObj[matched];

      return mapObj[matched];
    });

    // Use _.isNaN(object) to avoid NaN display
    const resultsCounter = counter.length - 1;

    return [textarea, resultsCounter];
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

  handleSubmit = e => {
    e.preventDefault();

    const inputs = { ...this.state.inputs };

    // Save the textarea content before search & replace
    this.state.textareaHistory.push(this.state.textareaInput);

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

  handleAddButton = () => {
    this.setState({
      inputs: [...this.state.inputs, { search: "", replace: "" }]
    });
  };

  handleDeleteButton = () => {
    let filteredInputs = [...this.state.inputs].filter(
      item => item !== this.state.inputs[this.state.inputs.length - 1]
    );

    this.setState({ inputs: filteredInputs });
  };

  handleUndo = e => {
    e.preventDefault();
    let { textareaHistory } = this.state;
    let lastElement = textareaHistory[textareaHistory.length - 1];

    console.log(lastElement);

    //?????????????
    this.setState({
      textareaInput: lastElement,
      textareaHistory: textareaHistory.splice(-1, 1)
    });
  };

  handleSave = index => {
    let savedParameters = [...this.state.savedParameters];
    const { inputs } = this.state;

    // Make sure it doesn't save empty strings at the beginning
    for (let key in inputs) {
      if (inputs[key].search === "" && inputs[key].replace === "") return;
    }

    if (savedParameters.includes(inputs[index])) return;
    savedParameters.push(inputs[index]);

    this.setState({
      savedParameters
    });
  };

  clearInputs = () => {
    this.setState({
      inputs: [{ search: "", replace: "" }],
      textareaInput: "",
      textareaHistory: []
    });
  };

  render() {
    let { textareaInput, inputs } = this.state;
    console.log("textarea inp", textareaInput);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row align-items-start">
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
              <FilterRow
                inputs={inputs}
                handleChange={this.handleChange}
                handleSave={this.handleSave}
              />
              <div className="row">
                <button className="btn-sm btn-success btn find-replace-button">
                  Find & Replace <FontAwesomeIcon icon={faSearch} />
                </button>
                <button
                  onClick={this.handleUndo}
                  className="btn-sm btn-info btn find-replace-button"
                >
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
            <Recommends toSaveParameters={this.state.savedParameters} />
          </div>
        </div>
      </form>
    );
  }
}

export default Dashboard;

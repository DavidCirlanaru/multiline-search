import React, { Component } from "react";
import _ from "underscore";
import Textarea from "./textarea";
import FilterRow from "./filterRow";

class Dashboard extends Component {
  state = {
    inputs: [{ search: "", replace: "" }],
    textareaInput: ""
  };

  searchAndReplace = (searchArray, replaceArray) => {
    let { textareaInput: textarea } = this.state;
    let mapObj = _.object(searchArray, replaceArray);

    let regularExp = new RegExp(Object.keys(mapObj).join("|"), "gi");
    textarea = textarea.replace(regularExp, function(matched) {
      return mapObj[matched];
    });

    return textarea;
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
      textareaInput: filteredTextarea
    });
  };

  addNewRow = e => {
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

  addInputRow = () => {
    this.setState({
      inputs: [...this.state.inputs, { search: "", replace: "" }]
    });
  };

  render() {
    let { textareaInput, inputs } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <FilterRow inputs={inputs} handleChange={this.handleChange} />
          </div>

          <Textarea
            // onValueChange={this.onValueChange.bind(this, "textareaInput")}
            value={textareaInput}
            onChange={this.handleChange}
            id="textarea"
            name="textarea"
          />

          <button className="btn-sm btn-info btn">Find & Replace</button>
        </form>
        <button onClick={this.addInputRow} className="btn-sm btn-primary btn">
          Add new
        </button>
      </React.Fragment>
    );
  }
}

export default Dashboard;

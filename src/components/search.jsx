import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <label htmlFor="inp" className="inp">
        <input
          onChange={this.props.onChange}
          value={this.props.value}
          type={this.props.type}
          id={this.props.id}
          name={this.props.name}
          className={this.props.className}
          placeholder="&nbsp;"
        />
        <span className="label">Search string</span>
        <span className="border"></span>
      </label>
    );
  }
}

export default Search;

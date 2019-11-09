import React, { Component } from "react";

class Textarea extends Component {
  render() {
    return (
      <div className="form-group">
        <textarea
          onChange={this.props.onChange}
          value={this.props.value}
          name="textareaInput"
          id="searchString"
          className="form-control main-textarea"
          placeholder="Content"
        ></textarea>
      </div>
    );
  }
}

export default Textarea;

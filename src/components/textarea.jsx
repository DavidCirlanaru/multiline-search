import React, { Component } from "react";
import addAutoResize from "./../utilities/textarea";

class Textarea extends Component {
  render() {
    return (
      <div className="form-group textarea-container">
        {addAutoResize()}
        <textarea
          data-autoresize
          rows="2"
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

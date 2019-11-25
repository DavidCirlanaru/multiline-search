import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

const filterRow = props => {
  // Why can't I declare arrow function?
  function saveItem(index) {
    props.handleSave(index);
  }

  return props.inputs.map((val, index) => {
    let searchId = `Search-${index}`;
    let replaceId = `Replace-${index}`;

    return (
      <div key={index} className="form-row align-items-center mt-4">
        {/* Search */}
        <div className="search-col col-5">
          <label htmlFor="inp" className="inp">
            <input
              onChange={props.handleChange}
              type="text"
              name={searchId}
              data-id={index}
              id={searchId}
              value={props.inputs[index].search}
              className="search"
              placeholder="&nbsp;"
            />
            <span className="label">Search</span>
            <span className="border"></span>
          </label>
        </div>
        <div className="replace-col col-5">
          {/* Replace */}
          <label htmlFor="inp" className="inp">
            <input
              onChange={props.handleChange}
              type="text"
              name={replaceId}
              data-id={index}
              id={replaceId}
              value={props.inputs[index].replace}
              className="replace"
              placeholder="&nbsp;"
            />
            <span className="label">Replace</span>
            <span className="border"></span>
          </label>
        </div>
        <div className="col-2">
          <FontAwesomeIcon icon={faArchive} onClick={() => saveItem(index)} />
        </div>
      </div>
    );
  });
};

export default filterRow;

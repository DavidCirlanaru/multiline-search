import React from "react";

const filterRow = props => {
  return props.inputs.map((val, idx) => {
    let searchId = `Search-${idx}`;
    let replaceId = `Replace-${idx}`;
    return (
      <div key={idx} className="form-row align-items-center mt-4">
        {/* Search */}
        <div className="search-col col-5">
          <label htmlFor="inp" className="inp">
            <input
              onChange={props.handleChange}
              type="text"
              name={searchId}
              data-id={idx}
              id={searchId}
              value={props.inputs[idx].search}
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
              data-id={idx}
              id={replaceId}
              value={props.inputs[idx].replace}
              className="replace"
              placeholder="&nbsp;"
            />
            <span className="label">Replace</span>
            <span className="border"></span>
          </label>
        </div>
      </div>
    );
  });
};

export default filterRow;

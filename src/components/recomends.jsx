import React from "react";

const Recomends = props => {
  return (
    <React.Fragment>
      <h4 className="column-heading mb-4">Archive</h4>
      <div className="history-items-container">
        {props.toSaveParameters.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="row">
                <div className="col">
                  <p>{item.search}</p>
                </div>
                <div className="col">
                  <p>{item.replace}</p>
                </div>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Recomends;

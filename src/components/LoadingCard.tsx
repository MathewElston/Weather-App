import React from "react";

const LoadingCard = () => {
  return (
    <>
      <div
        className="card shadow-sm border border-warning m-3 "
        style={{ width: "18rem" }}
      >
        <h5 className="card-title"></h5>


        <div className="card-body">
          <p></p>
          <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-7"></span>
          <span className="placeholder col-7"></span>
          </p>
          <p className="card-text placeholder-glow"></p>
        </div>
      </div>
    </>
  );
};

export default LoadingCard;

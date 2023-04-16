import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./Spinner.css";
import logoPic from "../logo/brain.png";

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="spinner spinner-rotor shadow-2">
        <img src={logoPic} alt="logo" />
      </div>
      <p className="spinner-text">Loading...</p>
      <Backdrop />
    </React.Fragment>
  );
};

export default Spinner;

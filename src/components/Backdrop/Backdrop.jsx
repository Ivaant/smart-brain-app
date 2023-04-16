import React from "react";

import "./Backdrop.css";

const Backdrop = (props) => {
  const cssClasses = ["backdrop", true ? "backdrop-open" : "backdrop-closed"];

  return <div className={cssClasses.join(" ")} />;
};

export default Backdrop;

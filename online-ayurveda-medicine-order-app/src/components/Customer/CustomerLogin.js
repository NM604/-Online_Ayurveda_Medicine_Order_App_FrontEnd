import React from "react";
import CustomerLoginUtil from "./CustomerLoginUtil";
import classes from "./CustomerLoginUtil.module.css";

function CustomerLogin() {
  return (
    <div className={classes["container-2"]}>
      <CustomerLoginUtil />
    </div>
  );
}

export default CustomerLogin;

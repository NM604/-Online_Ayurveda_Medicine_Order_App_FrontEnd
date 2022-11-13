import React from "react";
import LoginUtil from "./LoginUtil";
import classes from "./LoginUtil.module.css";

function AdminLogin() {
  return (
    <div className={classes["container"]}>
      <LoginUtil />
    </div>
  );
}

export default AdminLogin;

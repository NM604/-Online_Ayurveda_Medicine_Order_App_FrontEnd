import axios from "axios";
import React, { useState, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const DeleteCustomer = async () => {
  const id = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error] = useState({});

  return (
    <div className="productListing">
      {error && <h1>{error.message}</h1>}
      {
        <div>
          <h1>Customer Deleted Successfully!!!</h1>{" "}
        </div>
      }
    </div>
  );
};

export default DeleteCustomer;

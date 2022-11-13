import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [response, setResponse] = useState();

  const fetchUserProfiles = () => {
    axios
      .get("http://localhost:8080/oam/userinterface/customers")
      .then((res) => {
        console.log(res);
        setUserProfiles(res.data);
      });
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const handleDelete = async (customerId) => {
    try {
      await axios
        .delete(
          `http://localhost:8080//oam/userinterface/customers/${customerId}`
        )
        .then((res) => {
          console.log("deleted!!!", res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = (customerId) => {
    handleDelete(customerId);
    window.location.reload(false);
  };

  return userProfiles.map((userProfile, index) => {
    return (
      <div className="container" id="cont">
        <Card style={{ width: "16rem", height: "220px" }}>
          <Card.Body>
            <Card.Title>User Profile</Card.Title>
            <br />
            <p>ID : {userProfile.customerId}</p>
            <p>Name : {userProfile.customerName}</p>
            <Button
              variant="danger"
              onClick={() => deleteHandler(userProfile.customerId)}
              id="btn"
              aria-label="profile-button"
            >
              Delete{" "}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  });
};

export default UserProfiles;

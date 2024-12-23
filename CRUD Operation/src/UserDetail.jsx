import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetail = () => {
  const { username } = useParams(); //returns an object with the dynamic parts of the URL- then performing object destructuring to get the username property from the object.

  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/CRUD_Operation/user?name=${username}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setUserdata(data[0]))
      .catch((err) => console.log(err.message));
  }, [username]);

  return (
    <>
      <div className="card card-details">
        <div className="card-title">
          <h2>User Details</h2>
        </div>

        {userdata && (
          <div className="user-card ">
            <div
              className="card text-bg-dark mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">User Info</div>
              <div className="card-body">
                <h5 className="card-title">{userdata.name}</h5>
                <p className="card-text">
                  State: {userdata.state || "Not provided"} <br />
                  District: {userdata.district || "Not provided"} <br />
                  Address: {userdata.address || "Not provided"} <br />
                  Language: {userdata.language || "Not provided"} <br />
                  Date of Birth: {userdata.dateOfBirth || "Not provided"}
                </p>
                <Link to="/" className="btn btn-light">
                  Back
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;

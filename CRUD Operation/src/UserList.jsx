import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const UserList = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const viewUser = (name) => {
    navigate("/user/detail/" + name);
  };
  //   const deleteUser = (name) => {
  //     if (window.confirm("Do you want to delete?")) {
  //       fetch(`http://localhost:8000/user/${name}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => {
  //           alert("Removed successfully.");
  //           //   setUserData((prevData) =>
  //           //     prevData.filter((item) => item.name !== name)
  //           //   );
  //           window.location.reload();
  //           navigate("/");
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //     }
  //   };

  const deleteUser = (name) => {
    if (window.confirm("Do you want to delete?")) {
      fetch(
        `http://localhost:8080/CRUD_Operation/api/user/delete?name=${name}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          if (res.ok) {
            alert("Removed successfully.");
            // Remove the user from the list without refreshing the page
            setUserData((prevData) =>
              prevData.filter((item) => item.name !== name)
            );
          } else {
            res.text().then((message) => {
              alert(`Error: ${message}`);
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const editUser = (name) => {
    navigate("/user/edit/" + name);
  };

  useEffect(() => {
    fetch("http://localhost:2513/CRUD_Operation/user?name=${username}")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUserData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="text-center list-title">User List</h2>
        </div>
        <div className="card-body">
          <Link to="user/create" className="btn btn-primary btn-add-user">
            Add User
          </Link>
          <table className="table table-bordered">
            <thead className="text-center">
              <tr>
                <td className="bg-dark text-white">Name</td>
                <td className="bg-dark text-white">Address</td>
                <td className="bg-dark text-white">State</td>
                <td className="bg-dark text-white">District</td>
                <td className="bg-dark text-white">Date of Birth</td>
                <td className="bg-dark text-white">Language</td>
                <td className="bg-dark text-white">Action</td>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.state}</td>
                    <td>{item.district}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.language}</td>
                    <td>
                      <a
                        onClick={() => viewUser(item.name)}
                        className="btn btn-primary"
                      >
                        View
                      </a>
                      <a
                        onClick={() => editUser(item.name)}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => deleteUser(item.name)}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;

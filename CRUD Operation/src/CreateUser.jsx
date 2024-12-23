import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Country, State, City } from "country-state-city";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [language, setLanguage] = useState("");

  const navigate = useNavigate();

  const [validation, setValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, address, state, district, dateOfBirth, language };

    const urlEncodedData = new URLSearchParams(userData).toString();

    fetch(`http://localhost:8080/CRUD_Operation/api/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setState("");
    setDistrict("");
    setDateOfBirth("");
    setLanguage("");
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card create-card">
              <div className="card-title">
                <h2 className="create-user-title">User Registration</h2>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onMouseDown={(e) => setValidation(true)}
                        className="form-control"
                      ></input>
                      {name.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>State</label>
                      <select
                        onChange={(e) => setState(e.target.value)}
                        className="form-select"
                        value={state}
                      >
                        <option value="" disabled>
                          Select the State
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Kerala">Kerala</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>District</label>
                      <select
                        onChange={(e) => setDistrict(e.target.value)}
                        className="form-select"
                        value={district}
                      >
                        <option value="" disabled>
                          Select the District
                        </option>
                        <option value="Agra">Agra</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Thiruvananthapuram">
                          Thiruvananthapuram
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="form-control"
                        type="date"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <label htmlFor="">Language</label>
                    <div className="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="language"
                          value="Kannada"
                          onChange={(e) => setLanguage(e.target.value)}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Kannada
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="language"
                          value="Hindi"
                          onChange={(e) => setLanguage(e.target.value)}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Hindi
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="language"
                          value="English"
                          onChange={(e) => setLanguage(e.target.value)}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          English
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-primary">
                        Back
                      </Link>
                      <button
                        onClick={resetForm}
                        className="btn btn-danger reset-btn"
                        type="reset"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

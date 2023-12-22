import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        console.error("Password and Confirm Password do not match");
        setPasswordMismatch(true);
        return;
      }

      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/userReg",
        formData
      );

      if (response.status === 200) {
        console.log("User registration successful:", response.data);
      } else {
        console.error("User registration failed:", response.data);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="name"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter Username"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter Email"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter Password"
                    onChange={handleChange}
                  />
                </div>
                <div
                  className={`form-outline mb-3 ${
                    passwordMismatch ? "error" : ""
                  }`}
                >
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    className={`form-control form-control-lg ${
                      passwordMismatch ? "border border-danger" : ""
                    }`}
                    placeholder="Enter Confirm Password"
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={handleSubmit}
                  >
                    SignUp
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Do you have an account?{" "}
                    <Link
                      to={{
                        pathname: "/login",
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <a href="#!" className="link-danger">
                        Login
                      </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;

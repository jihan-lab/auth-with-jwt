import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/users`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col col-4 offset-4">
            <div className="row">
              <div className="col col-12 bg-info mt-5 mb-2 p-5 rounded-4 text-white">
                <h1 className="mb-3">Form Register</h1>
                {msg.length > 0 && <p className="alert alert-danger">{msg}</p>}
                <form onSubmit={Register}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Username
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="name"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="conf_password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="conf_password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div className="col col-12">
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  className="btn btn-primary"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;

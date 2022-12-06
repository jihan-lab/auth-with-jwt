import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/login`, {
        email: email,
        password: password,
      });
      navigate("/dashboard");
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
                <h1 className="mb-3">Form Login</h1>
                {msg.length > 0 && <p className="alert alert-danger">{msg}</p>}
                <form onSubmit={Login}>
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
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div className="col col-12">
                <Link
                  to="/register"
                  style={{ textDecoration: "none" }}
                  className="btn btn-primary"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

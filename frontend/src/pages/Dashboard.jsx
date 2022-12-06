import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const refreshTOken = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/token`);
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      setName(decode.name);
      setExpire(decode.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`http://localhost:5000/token`);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwt_decode(response.data.accessToken);
        setName(decode.name);
        setExpire(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get(`http://localhost:5000/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  const Logout = async () => {
    try {
      await axios.delete(`http://localhost:5000/logout`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshTOken();
    getUsers();
  }, []);
  return (
    <section>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand h2" href="#">
            Jihan Auth Page
          </a>
          <button onClick={Logout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <h3>
              Welcome : <span>{name}</span>
            </h3>
          </div>
          <div className="col col-12">
            <button onClick={getUsers} className="btn btn-info text-white my-3">
              Tampilkan data User
            </button>

            <div className="table-responsive">
              <table className="table table-primary">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr className="" key={item.id}>
                      <td scope="row">{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

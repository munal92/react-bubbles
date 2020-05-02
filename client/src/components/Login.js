import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.persist();
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  console.log("Form Info", userInfo);
  const submitForm = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", userInfo)
      .then((res) => {
        // console.log(res)
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblespage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login_cont">
      <h1>
        Welcome to the Bubble App! <Link to="/bubblespage">&#955;</Link>
      </h1>
      <form onSubmit={submitForm}>
        <label>
          Username
          <input
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;

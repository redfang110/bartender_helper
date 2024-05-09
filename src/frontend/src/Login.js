import React, { useState } from "react";
import axios from "axios";

function Login({ userIdVal, loggedIn }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginScreen, setLoginScreen] = useState(true);

  const handleIdChange = (value) => {
    userIdVal(value);
  };

  const handleOnClick = () => {
    setLoginScreen(!loginScreen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const LoginUser = {
        username: username,
        password: password,
      };

      // POST request to the backend using axios
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        LoginUser
      );
      userIdVal(response.data._id);
      console.log("Logged in successfully:", response.data);
      loggedIn();
    } catch (error) {
      console.error("Error Logging in:", error);
      alert(
        "Failed to login. Please re-enter username and password or create an account."
      );
    }
  };

  return loginScreen ? (
    <div style={{ textAlign: "center" }}>
      <header style={{ background: "blue" }}>
        <h1 style={{ margin: "20px" }}>Bartender Helper</h1>
      </header>
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2>Login</h2> <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
            placeholder="Username..."
            required
          />
          <br />
          <br />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
            placeholder="Password..."
            required
          />
          <br /> <br />
          <button
            type="submit"
            style={{
              width: "200px",
              fontWeight: "bold",
              borderRadius: 20,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Login
          </button>
        </form>{" "}
        <br />
        <button
          onClick={handleOnClick}
          style={{
            width: "200px",
            fontWeight: "bold",
            borderRadius: 20,
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Create New Account
        </button>
      </div>
    </div>
  ) : (
    <RegisterAccount userIdVal={handleIdChange} screenChange={handleOnClick} />
  );
}

function RegisterAccount({ userIdVal, screenChange }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClick = () => {
    screenChange();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const RegisterUser = {
        username: username,
        password: password,
      };

      // POST request to the backend using axios
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        RegisterUser
      );
      userIdVal(response.data._id);
      console.log("Registered successfully:", response.data);
      screenChange();
    } catch (error) {
      console.error("Error Registering in:", error);
      if (error.response && error.response.status == 409) {
        alert("Username Already in use. Please try a different username.");
      } else {
        alert("Failed to Register. Please try again.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <header style={{ background: "blue" }}>
        <h1 style={{ margin: "20px" }}>Bartender Helper</h1>
      </header>
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2>Register</h2> <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
            placeholder="Username..."
            required
          />
          <br />
          <br />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
            placeholder="Password..."
            required
          />
          <br /> <br />
          <button
            type="submit"
            style={{
              width: "200px",
              fontWeight: "bold",
              borderRadius: 20,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Register
          </button>{" "}
          <br /> <br />
          <button
            onClick={handleOnClick}
            style={{
              width: "200px",
              fontWeight: "bold",
              borderRadius: 20,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

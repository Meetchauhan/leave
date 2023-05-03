import { useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";

export default function Login() {
  const history = useNavigate();
  const [validate, setValidate] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValidate({ ...validate, [name]: value });
  }

  return (
    <div className="login">
      <div className="container position">
        <div className="loginInner">
          <h1 className="login">Login</h1>
          <form className="loginForm">
            <input
              type="email"
              className="login"
              required
              name="email"
              value={validate.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <input
              type="password"
              className="login"
              required
              name="password"
              value={validate.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <br />
            <button
              className="loginBtn"
              type="submit"
              onClick={() => {
                if (validate.email && validate.password) {
                  history("/leave", { replace: true });
                }
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

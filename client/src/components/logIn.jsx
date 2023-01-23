import { useContext, useEffect } from "react";
import "./style/signUp.css";
import { CoursesContext } from "./constext/constextUser";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigate = useNavigate();
  const {
    logIndata,
    setLogIndata,
    logInRequest,
    addCourseData,
    setAddCourseData,
    userEmailFromToken,
  } = useContext(CoursesContext);

  return (
    <div className="conteiner">
      <form class="form card" onSubmit={(e) => logInRequest(e)}>
        <div class="card_header">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
              fill="currentColor"
            ></path>
          </svg>
          <h1 class="form_heading">Sign in</h1>
        </div>
        <div class="field">
          <label for="username">Email</label>
          <input
            id="username"
            placeholder="Email"
            type="text"
            name="username"
            required
            class="input"
            onChange={(e) => {
              setLogIndata({ ...logIndata, email: e.target.value });
            }}
          />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            name="user_password"
            required
            class="input"
            onChange={(e) =>
              setLogIndata({ ...logIndata, password: e.target.value })
            }
          />
        </div>
        <div class="field">
          <button class="button" type="submit">
            Login
          </button>
        </div>
        <button class="JoinUsButton" onClick={() => navigate("/signUp")}>
          {" "}
          Join us
        </button>
      </form>
    </div>
  );
};

export default LogIn;

import { useContext } from "react";
import "./style/signUp.css";
import { CoursesContext } from "./constext/constextUser";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUserRegisterData, userRegisterData, signUpRequest } =
    useContext(CoursesContext);
  return (
    <div className="conteiner">
      <form
        class="form card"
        onSubmit={(e) => {
          signUpRequest(e);
        }}
      >
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
          <h1 class="form_heading">Sign Up</h1>
        </div>
        <div class="field">
          <label className="label" for="password">
            email
          </label>
          <input
            id="email"
            placeholder="email"
            type="email"
            name="email"
            class="input"
            required
            onChange={(e) =>
              setUserRegisterData({
                ...userRegisterData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <label className="label" for="username">
            Username
          </label>
          <input
            id="username"
            placeholder="Username"
            type="text"
            name="username"
            required
            class="input"
            onChange={(e) =>
              setUserRegisterData({ ...userRegisterData, name: e.target.value })
            }
          />
        </div>
        <div class="field">
          <label className="label" for="password">
            Password
          </label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            name="user_password"
            class="input"
            required
            onChange={(e) =>
              setUserRegisterData({
                ...userRegisterData,
                password: e.target.value,
              })
            }
          />
        </div>
        <div class="field">
          <button className="button">Register</button>
          <button className="button2" onClick={() => navigate("/logIn")}>
            Back to login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

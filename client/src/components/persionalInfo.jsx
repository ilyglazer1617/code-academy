import "./style/personalInfo.css";
import { useContext } from "react";
import { CoursesContext } from "./constext/constextUser";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const {
    logout,
    logIndata,
    changePasswordData,
    setChangePasswordData,
    changePasswordVisibility,
    setChangePasswordVisibility,
    changePassword,
    userEmail,
  } = useContext(CoursesContext);
  return (
    <div>
      <div class="card21">
        <div class="card-border-top21"></div>

        <img
          className="developerImg"
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--_HBZhuhF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/nweeqf97l2md3tlqkjyt.jpg"
          alt=""
        />

        <span className="span21"> {userEmail}</span>
        <button
          className="button21"
          onClick={() => setChangePasswordVisibility("visible")}
        >
          {" "}
          Change password
        </button>
      </div>
      <div
        className="changePasswordConteiner"
        style={{ visibility: changePasswordVisibility }}
      >
        <div className="backGroundDiv">
          <form class="form card" onSubmit={(e) => changePassword(e)}>
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
              <h1 class="form_heading">Change password </h1>
            </div>
            <div class="field">
              <label for="username">email</label>
              <input
                id="username"
                placeholder="Email"
                type="text"
                name="username"
                required
                class="input"
                onChange={(e) => {
                  setChangePasswordData({
                    ...changePasswordData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div class="field">
              <label for="password">New password verify</label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                name="user_password"
                required
                class="input"
                onChange={(e) =>
                  setChangePasswordData({
                    ...changePasswordData,
                    new_password: e.target.value,
                  })
                }
              />
            </div>
            <div class="field">
              <button
                class="button"
                type="submit"
                onClick={() => setChangePasswordVisibility("hidden")}
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

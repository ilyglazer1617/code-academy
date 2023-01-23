import "./style/navBar.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "./constext/constextUser";

const NavBar = () => {
  const navigate = useNavigate();
  const {
    logout,
    setChangePasswordVisibility,
    userEmail,
    getUser_id,
    userEmailFromToken,
  } = useContext(CoursesContext);
  const [userNav, setUserNav] = useState("");

  useEffect(() => {
    setUserNav(localStorage.getItem("token") ? "visible" : "hidden");
    userEmailFromToken();
  }, [localStorage.getItem("token")]);

  return (
    <div className="continerNav">
      <button
        className="logIN"
        style={{ width: "8%" }}
        onClick={() => navigate("/logIn")}
      >
        Log in
        <div class="arrow-wrapper">
          <div class="arrow"></div>
        </div>
      </button>

      <div className="onlyUser" style={{ visibility: userNav }}>
        <button
          className="logIN"
          onClick={async () => {
            await getUser_id();
            navigate("/PersonalInfo");
            setChangePasswordVisibility("hidden");
          }}
        >
          Personal info{" "}
        </button>
        <button className="logIN" onClick={() => navigate("/")}>
          {" "}
          All courses{" "}
        </button>
        <div className="personaldata">
          <h3>Welcom back ! {userEmail}</h3>
          <button
            style={{ width: "35.8%" }}
            className="logIN"
            id="myCourses"
            onClick={() => navigate("/myCourses")}
          >
            My courses
          </button>
        </div>
        <button className="logOut" onClick={() => logout()}>
          {" "}
          Log Out
        </button>
      </div>
      <div className="logoConteiner">
        <img className="logo" src="/images/ilyHamadany_pic.jpg" />
      </div>
    </div>
  );
};

export default NavBar;

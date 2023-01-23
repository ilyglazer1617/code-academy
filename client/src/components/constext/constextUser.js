import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../../App";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const CoursesContext = createContext();

const ContextProvider = () => {
  const navigate = useNavigate();

  const [userRegisterData, setUserRegisterData] = useState({});
  const [logIndata, setLogIndata] = useState({});
  const [allSubjects, setAllSubjects] = useState([]);
  const [addCourseData, setAddCourseData] = useState({});
  const [approvalVisabilaty, setApprovalVisabilaty] = useState("hidden");
  const [changePasswordData, setChangePasswordData] = useState({});
  const [changePasswordVisibility, setChangePasswordVisibility] =
    useState("hidden");
  const [userSignCourses, setUserSignCourses] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  let deleteD = "";
  const [subPrice, setSubPrice] = useState("20$");
  //! sign up
  const signUpRequest = async (e) => {
    try {
      e.preventDefault();
      const resulte = await axios.post(
        "http://localhost:2030/api/connected",
        userRegisterData
      );
      e.target.reset();
      navigate("/logIn");
    } catch (error) {}
  };

  //! all subject for map the main page
  const RequestAllSubjects = async () => {
    try {
      const resulte = await axios.get("http://localhost:2030/api/connected");
      setAllSubjects(resulte.data);
      return resulte.data;
    } catch (error) {
      return error.message;
    }
  };

  //! log in
  const logInRequest = async (e) => {
    try {
      e.preventDefault();
      const resulte = await axios.post(
        "http://localhost:2030/api/logIn",
        logIndata
      );
      localStorage.setItem("token", resulte.headers["token"]);
      getUser_id();
      navigate("/");
    } catch (error) {
      return error.message;
    }
  };

  //! log out
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setApprovalVisabilaty("hidden");
    navigate("/logIn");
  };

  //! get user id
  const getUser_id = async (subject) => {
    if (!localStorage.getItem("user_id")) {
      try {
        const resulte = await axios.post(
          "http://localhost:2030/api/connected/byEmail",
          logIndata
        );
        localStorage.setItem("user_id", resulte.data);
      } catch (error) {
        return error.message;
      }
    }
    let user_id = localStorage.getItem("user_id");
    let temp = { subject, user_id: user_id };
    setAddCourseData(temp);
    console.log(temp);
  };

  //! add course
  const addCourse = async (e) => {
    e.preventDefault();
    const resulte = await axios.post(
      "http://localhost:2030/api/connected/addcourse",
      addCourseData
    );
    setApprovalVisabilaty("hidden");
  };

  //! change password
  const changePassword = async (e) => {
    e.preventDefault();
    const resulte = await axios.put(
      "http://localhost:2030/api/connected/changePassword",
      changePasswordData
    );
  };

  //! get spesifiic user course
  const getAllUserCourses = async () => {
    let user_id = localStorage.getItem("user_id");
    const resulte = await axios.post(
      "http://localhost:2030/api/connected/getusercourses",
      { id: user_id }
    );
    setUserSignCourses(resulte.data);
  };

  //! delete user from course
  const deleteUserFromCours = async (subject) => {
    let user_id = localStorage.getItem("user_id");
    let subject_name = subject;
    let course_name = subject_name.replace(/[^a-zA-Z]/g, "");
    let temp = { user_id: user_id, course_name: course_name };
    console.log(temp);
    deleteD = temp;

    const resulte = await axios.post(
      "http://localhost:2030/api/connected/deleteUserCourse",
      deleteD
    );
    getAllUserCourses();
  };

  //! gets the user for token
  const userEmailFromToken = async () => {
    if (localStorage.getItem("token")) {
      let { email } = await jwt_decode(localStorage.getItem("token"));
      setUserEmail(email);
    }
  };
  return (
    <div>
      <CoursesContext.Provider
        value={{
          userRegisterData,
          setUserRegisterData,
          signUpRequest,
          RequestAllSubjects,
          allSubjects,
          logIndata,
          setLogIndata,
          logInRequest,
          logout,
          addCourse,
          addCourseData,
          setAddCourseData,
          setApprovalVisabilaty,
          approvalVisabilaty,
          getUser_id,
          changePasswordData,
          setChangePasswordData,
          changePasswordVisibility,
          setChangePasswordVisibility,
          changePassword,
          getAllUserCourses,
          userSignCourses,
          setUserSignCourses,
          deleteUserFromCours,
          userEmail,
          setUserEmail,
          userEmailFromToken,
          subPrice,
        }}
      >
        <App />
      </CoursesContext.Provider>
    </div>
  );
};

export default ContextProvider;

import logo from "./logo.svg";
import "./App.css";
import SignUp from "./components/signUp";
import { Route, Routes } from "react-router-dom";
import LogIn from "./components/logIn";
import Main from "./components/main";
import NavBar from "./components/navBar";
import MyCourses from "./components/myCourses";
import PersonalInfo from "./components/persionalInfo";

function App() {
  return (
    <div className="appConteiner">
      <NavBar />
      <Routes>
        <Route path="/personalinfo" element={<PersonalInfo />} />
        <Route path="/personalinfo" element={<PersonalInfo />} />
        <Route path="/myCourses" element={<MyCourses />} />
        <Route path="/" element={<Main />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

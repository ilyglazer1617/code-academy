import { useContext, useEffect } from "react";
import { CoursesContext } from "./constext/constextUser";
import "./style/myCourses.css";
const MyCourses = () => {
  const { getAllUserCourses, userSignCourses, deleteUserFromCours } =
    useContext(CoursesContext);
  useEffect(() => {
    getAllUserCourses();

    console.log(userSignCourses);
  }, []);
  return (
    <div className="mycoursesConteiner">
      <h1>hello this is your courses</h1>
      <table class="minimalistBlack">
        <thead>
          <tr>
            <th>course name</th>
            <th>start date</th>
            <th>quit</th>
          </tr>
        </thead>
        <tbody>
          {userSignCourses.map((obj, index) => (
            <tr key={index}>
              <td className="courseNameRow">{obj.course_name}</td>
              <td className="dateRow">April 15, 2022</td>
              <td className="deleteButtonRow">
                <button
                  className="deleteCourseButton"
                  onClick={() => deleteUserFromCours(obj.course_name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCourses;

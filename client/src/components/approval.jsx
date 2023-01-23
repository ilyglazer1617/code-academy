import "./style/approval.css";
import { useContext, useEffect } from "react";
import { CoursesContext } from "./constext/constextUser";
import { useNavigate } from "react-router-dom";

const Approval = () => {
  const navigate = useNavigate();
  const {
    addCourseData,
    setApprovalVisabilaty,
    addCourse,
    userEmail,
    allSubjects,
    RequestAllSubjects,
    subPrice,
  } = useContext(CoursesContext);
  useEffect(() => {
    RequestAllSubjects();
    console.log(addCourseData);
  }, []);
  return (
    <div className="approvalConteiner">
      <div class="card3">
        <div class="card-top3">
          <p class="card__title3">Sign course approval</p>
        </div>
        <div class="card__info3">
          <p class="episode__num3">user: {userEmail}</p>
          <p class="episode__type3">price : {subPrice}</p>
        </div>
        <div class="card__btns3">
          <button
            class="add-btn3"
            onClick={() => setApprovalVisabilaty("hidden")}
          >
            no
          </button>
          <button
            class="watch-btn3"
            onClick={(e) => {
              navigate("/");
              addCourse(e);
            }}
          >
            yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Approval;

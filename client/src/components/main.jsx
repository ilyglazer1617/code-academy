import "./style/main.css";
import { useContext, useEffect, useState } from "react";
import { CoursesContext } from "./constext/constextUser";
import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";
import Approval from "./approval";

const Main = () => {
  const navigate = useNavigate();
  const {
    RequestAllSubjects,
    allSubjects,
    addCourseData,
    setApprovalVisabilaty,
    approvalVisabilaty,
    getUser_id,
  } = useContext(CoursesContext);
  useEffect(() => {
    RequestAllSubjects();
    console.log(addCourseData);
  }, []);

  //! opens the Approval tap
  const handleClick = async (e, index) => {
    e.preventDefault();
    let subject = allSubjects[index].subject;
    console.log(subject);
    await getUser_id(subject);

    setApprovalVisabilaty("visible");
  };

  return (
    <div className="conteinerMain">
      <div className="subjectWrap">
        {allSubjects.map((obj, index) => {
          return (
            <div class="card1" key={index}>
              {" "}
              <div className="topCardInfo">
                <h3 class="card__title1">{obj.subject}</h3>
                <div className="subjectPicWraper">
                  <img className="imgSubject" src={obj.subject_pic} />
                </div>
              </div>
              <p class="card__content1">level: {obj.level}</p>
              <div class="card__date1">April 15, 2022</div>
              <div className="descriptionSub">{obj.subject_description}</div>
              <div
                class="card__arrow1"
                onClick={async (e) => {
                  handleClick(e, index);
                }}
              >
                <svg
                  className="svg1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="15"
                  width="15"
                >
                  <path
                    fill="#fff"
                    d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                  ></path>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ visibility: approvalVisabilaty }}>
        <Approval />
      </div>
    </div>
  );
};

export default Main;

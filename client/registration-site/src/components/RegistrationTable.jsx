import {calculateDayColor} from "../utils/utils.js";
import {useState} from "react";
import {useAtomValue} from "jotai";
import {idAtom} from "./LoginSidebar.jsx";
import {useNavigate} from "react-router-dom";
import {Modal} from "./modal.jsx";

const RegistrationTable = () => {
  const navigate = useNavigate();
  const id = useAtomValue(idAtom);
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem("courseCart")) ?? [],
  );

  const handleClearAll = () => {
    sessionStorage.removeItem("courseCart");
    setCart([]);
  };

  const handleConfirmRegistration = (e) => {
    e.preventDefault();
    const jwtToken = sessionStorage.getItem("token");

    let sectionIds = cart.map((course, index) => {
      return course.section_id;
    });
    console.log(id);

    let sectionsCSV = "";
    sectionIds.forEach((id, index) => {
      if (index === 0) {
        sectionsCSV += id;
      } else {
        sectionsCSV += "," + id;
      }
    });

    let formData = new FormData();
    formData.append("student_id", id);
    formData.append("all_sections_csv", sectionsCSV);

    fetch(`/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setError(false);
        res.json().then((json) => {
          console.log(json);
          sessionStorage.removeItem("courseCart");
          navigate("profile");
        });
      } else {
        console.log(res.status);
        res.json().then((json) => {
          console.log(json);
          document.getElementById("my_modal_1").showModal();
        });
      }
    });
  };

  return (
    <>
      <Modal message="registration error" />
      <div className="overflow-x-auto my-4 mx-4 ">
        <table className="table">
          <thead>
            <tr>
              <th>Section No.</th>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Status</th>
              <th>Timeslot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((course, index) => (
              <tr key={course.section_id}>
                <th> {course.section_number}</th>
                <td> {course.course_code}</td>
                <td> {course.course_name}</td>
                <td>
                  {course.current_students < course.max_students ? (
                    <div className="badge badge-success gap-2">Available</div>
                  ) : course.current_students + 5 >= course.max_students ? (
                    <div className="badge badge-warning gap-2">
                      Near Capacity
                    </div>
                  ) : (
                    <div className="badge badge-error gap-2">Full</div>
                  )}
                </td>
                <td>
                  <div className={calculateDayColor(course.timeslot)}>
                    {course.timeslot}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cart.length === 0 ? (
        <button className="btn btn-primary my-4" disabled>
          {" "}
          Confirm Registration{" "}
        </button>
      ) : (
        <button
          className="btn btn-primary my-4"
          onClick={handleConfirmRegistration}
        >
          {" "}
          Confirm Registration
        </button>
      )}
      {cart.length <= 0 ? (
        <button className="btn btn-error my-4" disabled>
          {" "}
          Clear All{" "}
        </button>
      ) : (
        <button className="btn btn-error my-4" onClick={handleClearAll}>
          Clear All
        </button>
      )}
    </>
  );
};

export default RegistrationTable;

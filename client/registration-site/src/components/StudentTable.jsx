import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudentTable = () => {
  const jwtToken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  let found = false;

  if (results !== null) {
    found = true;
  }

  const handleInspectStudent = (event, id, fname, lname) => {
    navigate("inspect", { state: { id: id, fname: fname, lname: lname } });
  };

  const handleEditStudent = (event, student) => {
    navigate("edit_student", { state: { student: student } });
  };

  useEffect(() => {
    fetch(`/student/all`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Add the 'Bearer ' prefix for JWT
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((resJson) => {
          setResults(resJson);
        });
      } else {
        console.error("cannot fetch student list");
      }
    });
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Sex</th>
            <th>Date of Birth</th>
            <th>Enrollment year</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {found === false
            ? null
            : results.map((student, index) => (
                <tr key={student.StudentId} className="hover">
                  <th> {student.StudentId} </th>
                  <td> {student.first_name} </td>
                  <td> {student.last_name}</td>
                  <td>
                    {student.sex === "0"
                      ? "Male"
                      : student.sex === "1"
                      ? "Female"
                      : "Other"}
                  </td>
                  <td> {student.date_of_birth.substring(0, 10)} </td>
                  <td> {student.enroll_year} </td>
                  <td>
                    <button
                      onClick={(event) =>
                        handleInspectStudent(
                          event,
                          student.StudentId,
                          student.first_name,
                          student.last_name,
                        )
                      }
                      className="btn btn-primary btn-xs"
                    >
                      Enrollments
                    </button>
                  </td>
                  <td>
                    <button
                      className=" btn btn-xs btn-secondary"
                      onClick={(event) => {
                        handleEditStudent(event, student);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

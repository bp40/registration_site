import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EnrollmentTable } from "../components/EnrollmentTable.jsx";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";
import { StaffNavBar } from "../components/StaffNavBar.jsx";

export const StudentInfo = () => {
  const jwtToken = sessionStorage.getItem("token");
  const [results, setResults] = useState([]);
  const { state } = useLocation();
  const { id, fname, lname } = state;

  useEffect(() => {
    fetch(`http://localhost:3000/student/search/${id}`, {
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
        console.error("cannot fetch student from id");
      }
    });
  }, []);

  return (
    <div className="flex p-0 w-screen">
      <StaffNavBar />
      <div className="p-4">
        <h1 className="text-xl">
          Showing {fname} {lname}'s enrollments
        </h1>
        {results == null || false ? (
          <LoadingSpinner />
        ) : (
          <EnrollmentTable courses={results} />
        )}
      </div>
    </div>
  );
};

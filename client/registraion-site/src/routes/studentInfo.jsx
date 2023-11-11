import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const StudentInfo = () => {
  const jwtToken = sessionStorage.getItem("token");
  const [results, setResults] = useState([]);
  const { state } = useLocation();
  const { id } = state;

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
          console.log(resJson);
        });
      } else {
        console.log(res);
        console.error("cannot fetch student from id");
      }
    });
  }, []);

  return <></>;
};

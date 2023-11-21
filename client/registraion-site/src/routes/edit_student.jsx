import { StaffNavBar } from "../components/StaffNavBar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { TextInput } from "../components/textInput.jsx";
import { useState } from "react";
import { Warning } from "../components/Warning.jsx";

export const EditStudent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { student } = state;

  const [changed, setChanged] = useState(false);
  const [firstName, setFirstName] = useState(student.first_name);
  const [lastName, setLastName] = useState(student.last_name);
  const [dob, setDob] = useState(student.date_of_birth.substring(0, 10));
  const [sex, setSex] = useState(student.sex);
  const [enrollYear, setEnrollYear] = useState(student.enroll_year);
  const [level, setLevel] = useState(student.level);
  const [password, setPassword] = useState(student.password);

  const handleFnameChange = (event) => {
    setFirstName(event.target.value);
    setChanged(true);
  };

  const handleLnameChange = (event) => {
    setLastName(event.target.value);
    setChanged(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setChanged(true);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    setChanged(true);
  };

  const handleEnrollYearChange = (event) => {
    setEnrollYear(event.target.value);
    setChanged(true);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
    setChanged(true);
  };
  const handleDOBchange = (event) => {
    setDob(event.target.value);
    setChanged(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const data = {
      StudentId: student.StudentId,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob,
      sex: sex,
      RawPassword: password,
      enroll_year: enrollYear,
      level: level,
    };

    const jwtToken = sessionStorage.getItem("token");

    fetch(`http://localhost:3000/student/edit`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        console.log("ok!");
        res.json().then((json) => {
          navigate("/staff/dashboard");
        });
      } else {
        console.log(res.status);
        res.json().then((json) => {
          console.log(json);
        });
      }
    });
  };

  return (
    <div className="flex p-0 w-screen">
      <StaffNavBar />
      <div className="p-4">
        <h1 className="text-xl">
          Editing {student.first_name} {student.last_name}'s information
        </h1>
        {changed ? (
          <Warning text="Unsaved changes detected! Go back to cancel" />
        ) : null}
        <div>
          <form className="flex flex-row flex-wrap space-between gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">ID</span>
              </label>
              <input
                type="text"
                placeholder={student.StudentId}
                className="input input-bordered w-full max-w-xs"
                disabled
              />
            </div>
            <TextInput
              labelText="First name"
              value={firstName}
              onChange={handleFnameChange}
            />
            <TextInput
              labelText="Last name"
              value={lastName}
              onChange={handleLnameChange}
            />
            <TextInput
              labelText="Date of birth"
              value={dob}
              onChange={handleDOBchange}
            />
            <TextInput labelText="Sex" value={sex} onChange={handleSexChange} />
            <TextInput
              labelText="Enrollment year"
              value={enrollYear}
              onChange={handleEnrollYearChange}
            />
            <TextInput
              labelText="Level"
              value={level}
              onChange={handleLevelChange}
            />
            <TextInput
              labelText="Password"
              value={password}
              placeholder="Type new password"
              inputType="password"
              onChange={handlePasswordChange}
            />
            {changed ? (
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            ) : (
              <button type="submit" className="btn btn-primary" disabled>
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

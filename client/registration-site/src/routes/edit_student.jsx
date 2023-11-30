import { StaffNavBar } from "../components/StaffNavBar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { TextInput } from "../components/textInput.jsx";
import { useState } from "react";
import { Warning } from "../components/Warning.jsx";
import { SelectBox } from "../components/SelectBox.jsx";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";
import {Modal} from "../components/modal.jsx";

export const EditStudent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { student } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [inputFields, setInputFields] = useState({
    StudentId: student.StudentId,
    first_name: student.first_name,
    last_name: student.last_name,
    date_of_birth: student.date_of_birth.substring(0, 10),
    sex: student.sex,
    enroll_year: student.enroll_year,
    RawPassword: "",
    level: student.level,
  });

  const handleInputChange = (e) => {
    setChanged(true);
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields.RawPassword);
    setIsLoading(true);

    const jwtToken = sessionStorage.getItem("token");

    fetch(`/student/edit`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(inputFields),
    })
      .then((res) => {
        console.log(res.status);
        navigate("/staff/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    const jwtToken = sessionStorage.getItem("token")
    fetch(`/student/${student.StudentId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then(res => {
      document.getElementById("my_modal_1").showModal();
      navigate("/staff/dashboard")
    })
  }

  return (
    <div className="flex p-0 w-screen">
      <Modal message={`Successfully deleted student with id ${student.StudentId}`} />
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
              name="first_name"
              value={inputFields.first_name}
              onChange={handleInputChange}
            />
            <TextInput
              labelText="Last name"
              name="last_name"
              value={inputFields.last_name}
              onChange={handleInputChange}
            />
            <TextInput
              labelText="Date of birth"
              name="date_of_birth"
              value={inputFields.date_of_birth}
              onChange={handleInputChange}
            />
            <SelectBox
              labelText="Sex"
              placeholderText="Select sex"
              options={["Male", "Female", "Other"]}
              optionsValue={["0", "1", "2"]}
              defaultVal={inputFields.sex}
            />
            <TextInput
              labelText="Enrollment year"
              name="enroll_year"
              value={inputFields.enroll_year}
              onChange={handleInputChange}
            />
            <SelectBox
              labelText="Study Level"
              placeholderText="Select study level"
              options={["Bachelor", "Master", "Doctoral"]}
              optionsValue={["B", "M", "D"]}
              defaultVal={inputFields.level}
              onChange={handleInputChange}
            />
            <TextInput
              labelText="Password"
              name="RawPassword"
              value={inputFields.RawPassword}
              placeholder="Type new password"
              inputType="password"
              onChange={handleInputChange}
            />
            {isLoading ? (
              <LoadingSpinner />
            ) : changed ? (
              <button
                type="submit"
                className="btn btn-primary block basis-3/12"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            ) : (
              <button type="submit" className="btn btn-primary block basis-3/12" disabled>
                Save Changes
              </button>
            )}
          </form>
          <button onClick={handleDelete} className="btn btn-error mt-32" >
            Delete Student (Drop all)
          </button>
        </div>
      </div>
    </div>
  );
};

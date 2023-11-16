import { StaffNavBar } from "../components/StaffNavBar.jsx";
import { TextInput } from "../components/textInput.jsx";
import { useState } from "react";

export const Add_student = () => {
  const [inputFields, setInputFields] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    sex: "",
    enroll_year: new Date().getFullYear(),
    password: "",
    level: "",
  });

  const handleInputChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex p-0 w-screen">
      <StaffNavBar />
      <div className="p-4">
        <div>
          <form className="flex flex-row flex-wrap space-between gap-4">
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
              value={inputFields.date_of_birth}
              inputType="date"
              name="date_of_birth"
              onChange={handleInputChange}
            />
            <TextInput
              labelText="Sex"
              value={inputFields.sex}
              name="sex"
              onChange={handleInputChange}
            />
            <TextInput
              labelText="Enrollment year"
              name="enroll_year"
              value={inputFields.enroll_year}
              onChange={handleInputChange}
            />
            <TextInput
              labelText="Level"
              name="level"
              value={inputFields.level}
              onChange={handleInputChange}
            />
            <TextInput
              labelText="Password"
              name="password"
              value={inputFields.password}
              placeholder="Type new password"
              inputType="password"
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

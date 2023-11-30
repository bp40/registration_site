import { StaffNavBar } from "../components/StaffNavBar.jsx";
import { TextInput } from "../components/textInput.jsx";
import { useState } from "react";
import { SelectBox } from "../components/SelectBox.jsx";
import { Modal } from "../components/modal.jsx";

export const Add_student = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
    setIsLoading(true);
    const jwtToken = sessionStorage.getItem("token");

    fetch("/student/new", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(inputFields),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setModalMessage(
          "Successfully created student " +
            inputFields.first_name +
            " with ID " +
            data.student_id,
        );
        document.getElementById("my_modal_1").showModal();
        setInputFields({
          first_name: "",
          last_name: "",
          date_of_birth: "",
          sex: "",
          enroll_year: new Date().getFullYear(),
          RawPassword: "",
          level: "",
        });
      });
  };

  return (
    <div className="flex p-0 w-screen">
      <Modal message={modalMessage} />
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
            <SelectBox
              labelText="Sex"
              placeholderText="Select sex"
              options={["Male", "Female", "Other"]}
              optionsValue={["0", "1", "2"]}
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

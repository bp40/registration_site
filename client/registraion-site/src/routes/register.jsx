import { NavSidebar } from "../components/NavSidebar.jsx";
import RegistrationTable from "../components/RegistrationTable.jsx";
import CourseSearchBox from "../components/CourseSearchBox.jsx";

const Register = () => {
  return (
    <div className="flex p-0 w-screen h-screen max-[800px]:flex-row max-[800px]:flex-wrap">
      <NavSidebar />
      <div className="flex flex-wrap md:flex-col content-center w-full my-4">
        <RegistrationTable />
      </div>
    </div>
  );
};

export default Register;

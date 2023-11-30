import { StaffNavBar } from "../components/StaffNavBar.jsx";
import { StudentTable } from "../components/StudentTable.jsx";

export const StaffDashboard = () => {
  return (
    <div className="flex p-0 w-screen">
      <StaffNavBar />
      <div className="flex flex-wrap flex-col content-center w-full my-4">
        <StudentTable />
      </div>
    </div>
  );
};

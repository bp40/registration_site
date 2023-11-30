
import { useLocation } from "react-router-dom";
import { EnrollmentTable } from "../components/EnrollmentTable.jsx";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";
import { StaffNavBar } from "../components/StaffNavBar.jsx";
import {Warning} from "../components/Warning.jsx";
import {useStudentEnrollments} from "../hooks/useStudentEnrollments.js";

export const StudentInfo = () => {
  const { state } = useLocation();
  const { id, fname, lname } = state;

  const { results, isLoading, isEmpty } = useStudentEnrollments(id)

  return (
    <div className="flex p-0 w-screen">
      <StaffNavBar />
      <div className="p-4">
        <h1 className="text-xl">
          Showing {fname} {lname}'s enrollments
        </h1>
        {
          isLoading ? <LoadingSpinner />
              :  !isEmpty ? (
                  <EnrollmentTable courses={results} />
              ) : (
                  <Warning text="No enrolled courses"/>
              )
        }
      </div>
    </div>
  );
};

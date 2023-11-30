import {NavSidebar} from "../components/NavSidebar.jsx";
import {EnrollmentTable} from "../components/EnrollmentTable.jsx";
import {useStudentEnrollments} from "../hooks/useStudentEnrollments.js";
import {useAtomValue} from "jotai";
import {idAtom} from "../components/LoginSidebar.jsx";
import {LoadingSpinner} from "../components/LoadingSpinner.jsx";
import {Warning} from "../components/Warning.jsx";

export const Enrollments = () => {

    const id = useAtomValue(idAtom)
    const { results, isLoading, isEmpty } = useStudentEnrollments(id)

    return (
        <div className='flex p-0 w-screen max-[800px]:flex-row max-[800px]:flex-wrap'>
            <NavSidebar/>
            <div className='w-full p-4 h-screen bg-gray-50'>
                <h1 className="text-2xl font-semibold"> Showing all Enrollments</h1>
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
}
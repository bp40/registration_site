import {NavSidebar} from "../components/NavSidebar.jsx";
import RegistrationTable from "../components/RegistrationTable.jsx";
import CourseSearchBox from "../components/CourseSearchBox.jsx";



const Register = () => {
    return (
        <div className='flex p-0 w-screen'>
            <NavSidebar/>
            <div className='flex justify-center w-full my-4'>
                <RegistrationTable/>
            </div>
        </div>
    )
}

export default Register
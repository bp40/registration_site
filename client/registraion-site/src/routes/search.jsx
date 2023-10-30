import {NavSidebar} from "../components/NavSidebar.jsx";
import CourseSearchBox from "../components/CourseSearchBox.jsx";
import RegistrationTable from "../components/RegistrationTable.jsx";

const Search = () => {
    return (
        <div className='flex p-0 w-screen'>
            <NavSidebar/>
            <div className='flex justify-center w-full my-4'>
                <CourseSearchBox/>
            </div>
        </div>
    )
}

export default Search
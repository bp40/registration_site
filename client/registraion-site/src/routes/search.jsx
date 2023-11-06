import {NavSidebar} from "../components/NavSidebar.jsx";
import CourseSearchBox from "../components/CourseSearchBox.jsx";
import RegistrationTable from "../components/RegistrationTable.jsx";
import {atom} from "jotai";
import SearchResult from "../components/SearchResult.jsx";

export const sectionsAtom =  atom([])

const Search = () => {
    return (
        <div className='flex p-0 w-screen'>
            <NavSidebar/>
            <div className='flex justify-center flex-wrap w-full my-4 flex-col content-center'>
                <CourseSearchBox/>
                <SearchResult/>
            </div>
        </div>
    )
}

export default Search
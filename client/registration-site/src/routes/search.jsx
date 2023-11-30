import {NavSidebar} from "../components/NavSidebar.jsx";
import CourseSearchBox from "../components/CourseSearchBox.jsx";
import {atom} from "jotai";
import SearchResult from "../components/SearchResult.jsx";

export const sectionsAtom =  atom([])

const Search = () => {
    return (
        <div className='flex p-0 w-screen h-screen max-[800px]:flex-wrap'>
            <NavSidebar/>
            <div className='flex justify-center flex-wrap w-screen my-4 md:flex-col content-center '>
                <CourseSearchBox/>
                <SearchResult/>
            </div>
        </div>
    )
}

export default Search
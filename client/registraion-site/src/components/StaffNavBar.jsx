import {Link, useNavigate} from "react-router-dom";
import Search from "../routes/search.jsx";

export const StaffNavBar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/")
    }

    return (
        <div className="flex flex-col content-start align-top bg-purple-950 h-screen py-4">
            <h2 className="px-4 text-white text-3xl">SimpleReg</h2>
            <ul className="menu text-white w-56 rounded-box">
                <li>
                    <Link to='/profile'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        All students
                    </Link>
                </li>
                <li>
                    <Link to='/search'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Create Student
                    </Link>
                </li>
            </ul>
            <button className='mt-auto btn bn-secondary' onClick={handleLogout}> Logout </button>
        </div>
    )
}
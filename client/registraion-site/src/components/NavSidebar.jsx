import {Link, useNavigate} from "react-router-dom";
import Search from "../routes/search.jsx";

export const NavSidebar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/")
    }

    return (
        <div className="flex flex-col items-start justify-top bg-purple-950 py-4 max-[800px]:flex-row  max-[800px]:h-48 max-[800px]:w-screen">
            <h2 className="px-4 text-white text-2xl font-bold max-[800px]:text-red">SimpleReg</h2>
            <ul className="menu text-white w-56 md:w-64 rounded-box">
                <li>
                    <Link to='/profile' className="flex items-center space-x-2 hover:bg-violet-800 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Profile Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to='/search' className="flex items-center space-x-2 hover:bg-violet-800 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Search Course</span>
                    </Link>
                </li>
                <li>
                    <Link to='/register' className="flex items-center space-x-2 hover:bg-violet-800 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Register</span>
                    </Link>
                </li>

            </ul>
            <button className='mt-auto btn bn-secondary mx-auto' onClick={handleLogout}>Logout</button>
        </div>


    )
}
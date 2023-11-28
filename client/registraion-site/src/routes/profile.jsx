import {NavSidebar} from "../components/NavSidebar.jsx";
import Card from "../components/Card.jsx";
import {useAtomValue} from "jotai";
import {nameAtom} from "../components/LoginSidebar.jsx";
import '../App.css';

export const Profile = () => {

    const name = useAtomValue(nameAtom)

    return (
        <div className='flex p-0 w-screen max-[800px]:flex-row max-[800px]:flex-wrap'>
            <NavSidebar/>
            <div className='w-full p-4 h-screen bg-gray-50'>
                <div className="parent w-full">
                    <div className="div1 mb-4 bg-white p-4 rounded-lg shadow-md">
                        <h1 className="text-2xl font-semibold">Welcome {name}</h1>
                        <p className="text-gray-600"></p>
                    </div>

                    <div className="div2 mb-4 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">GPA Overview</h2>
                    </div>

                    <div className="div3 mb-4 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Course Performance</h2>
                    </div>

                    <div className="div4 mb-4 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Progress Charts</h2>
                    </div>

                    <div className="div5 mb-4 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Upcoming Events</h2>
                    </div>

                    <div className="div6 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Feedback and Suggestions</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
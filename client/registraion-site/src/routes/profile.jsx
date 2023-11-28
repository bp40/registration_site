import {NavSidebar} from "../components/NavSidebar.jsx";
import {atom, useAtomValue, useSetAtom} from "jotai";
import {idAtom, nameAtom} from "../components/LoginSidebar.jsx";
import '../App.css';
import {useEffect, useState} from "react";
import {StudentEnrollmentTable} from "../components/StudentEnrollmentTable.jsx";


export const currentlyEnrolledAtom = atom([]);
export const Profile = () => {

    const name = useAtomValue(nameAtom)
    const id = useAtomValue(idAtom)
    const setCurrentlyEnrolledAtom = useSetAtom(currentlyEnrolledAtom)
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {

        const jwtToken = sessionStorage.getItem('token')
        fetch(`http://localhost:3000/student/search/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${jwtToken}`, // Add the 'Bearer ' prefix for JWT
            },
        })
            .then(res => {
                if(res.ok){
                    res.json().then(r => {
                        setEnrolledCourses(r)
                        console.log(r)
                    })
                } else {
                    console.log("fetch error")
                    console.log(res.body)
                }
            })

    }, []);

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
                        <h2 className="text-xl font-semibold">Registered Courses</h2>
                        <StudentEnrollmentTable courses={enrolledCourses}/>
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
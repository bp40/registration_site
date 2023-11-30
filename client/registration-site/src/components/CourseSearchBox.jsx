import {useState} from "react";
import {useSetAtom} from "jotai";
import {sectionsAtom} from "../routes/search.jsx";

const CourseSearchBox = () => {

    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const [queryType, setQueryType] = useState('')
    const setResults = useSetAtom(sectionsAtom)

    const handleLoginSubmit = e => {
        e.preventDefault();
    }

    const handleNameChange = e => {
        setCourseName(e.target.value)
        setQueryType('name')
    }

    const handleCodeChange = e => {
        setCourseCode((e.target.value))
        setQueryType('code')
    }

    const reset = () => {
        setQueryType('')
        setCourseName('')
        setCourseCode('')
    }

    const handleReset = e => {
        reset()
    }

    const handleSearchSubmit = e => {

        e.preventDefault()
        const jwtToken = sessionStorage.getItem('token')

        if (queryType === 'name'){
            fetch(`:3000/sections/name/?course_name=${courseName}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`, // Add the 'Bearer ' prefix for JWT
                },
            }).then(res => {
                if(res.ok){
                    res.json()
                        .then(resJson => {
                            console.log(resJson)
                            setResults(resJson)
                        })
                } else {
                    console.log(res)
                    console.error("cannot fetch course by name")
                }
            })

        } else if (queryType === 'code') {
            fetch(`:3000/sections/courseCode/?course_code=${courseCode}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`, // Add the 'Bearer ' prefix for JWT
                },
            }).then(res => {
                if(res.ok){
                    res.json()
                        .then(resJson => {
                            console.log(resJson)
                            setResults(resJson)
                        })
                } else {
                    console.log(res)
                    console.error("cannot fetch course by code")
                }
            })
        }

        reset()

    }

    return(
        <>
            <div className='card rounded w-2/3 bg-base-100 shadow-xl flex justify-center max-[1100px]:flex-col'>
                <form method="post" onSubmit={handleLoginSubmit}>
                    <div className="flex w-full px-4 py-8 items-center justify-center max-[1100px]:flex-col">
                        <div className="inline p-4">
                            <label className="label">
                                <span className="label-text  text-xl">Course Name</span>
                            </label>
                            { queryType === 'code'
                                ? <input type="text" placeholder="Linear Algebra" value={courseName} onChange={handleNameChange} className="input input-bordered input-sm w-full max-w-xs my-4" disabled/>
                                : <input type="text" placeholder="Linear Algebra" value={courseName} onChange={handleNameChange} className="input input-bordered input-sm w-full max-w-xs my-4" />
                            }
                        </div>

                        <div className="inline p-4">
                            <label className="label">
                                <span className="label-text  text-xl">Course Code</span>
                            </label>
                            { queryType === 'name'
                                ? <input type="text" placeholder="DES XXX" value={courseCode} onChange={handleCodeChange} className="input input-bordered input-sm w-full max-w-xs my-4" disabled />
                                : <input type="text" placeholder="DES XXX" value={courseCode} onChange={handleCodeChange} className="input input-bordered input-sm w-full max-w-xs my-4" />
                            }
                        </div>

                        <button type="submit" onClick={handleSearchSubmit} className="btn-sm btn-active btn-primary m-4">Search</button>
                        <button type="reset" onClick={handleReset} className="btn-sm btn-active btn-info m-4">Reset Search</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default CourseSearchBox
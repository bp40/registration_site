import {useState} from "react";

const CourseSearchBox = () => {

    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const [queryType, setQueryType] = useState('')

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

    const handleReset = e => {
        setQueryType('')
        setCourseName('')
        setCourseCode('')
    }

    const handleSearchSubmit = e => {

        e.preventDefault()

        const headers = { 'Authorization': sessionStorage.getItem('token') };

        if (queryType === 'name'){
            fetch(`http://localhost:3000/sections/data?course_name=${courseName}`, {
                method: 'GET',
                mode: 'cors',
                headers: headers
            }).then(res => res.json()
                .then(data => {
                    console.log(data)
            }))

        } else if (queryType === 'code') {
            fetch(`http://localhost:3000/sections/data?course_code=${courseCode}`, {
                method: 'GET',
                headers: headers
            })
        }

    }

    return(
        <>
            <div className='card block'>
                <h2> Course Search</h2>
                <form method="post" onSubmit={handleLoginSubmit}>
                    <div className="form-control w-full max-w-xs px-4 py-8">
                        <label className="label">
                            <span className="label-text  text-xl">Course Name</span>
                        </label>
                        { queryType === 'code'
                            ? <input type="text" placeholder="Linear Algebra" value={courseName} onChange={handleNameChange} className="input input-bordered input-sm w-full max-w-xs my-4" disabled/>
                            : <input type="text" placeholder="Linear Algebra" value={courseName} onChange={handleNameChange} className="input input-bordered input-sm w-full max-w-xs my-4" />
                        }
                        OR
                        <label className="label">
                            <span className="label-text  text-xl">Course Code</span>
                        </label>
                        { queryType === 'name'
                            ? <input type="text" placeholder="DES XXX" value={courseCode} onChange={handleCodeChange} className="input input-bordered input-sm w-full max-w-xs my-4" disabled />
                            : <input type="text" placeholder="DES XXX" value={courseCode} onChange={handleCodeChange} className="input input-bordered input-sm w-full max-w-xs my-4" />
                        }

                        <button type="submit" onClick={handleSearchSubmit} className="btn-sm btn-active btn-primary m-4">Search</button>
                        <button type="reset" onClick={handleReset} className="btn-sm btn-active btn-info m-4">Reset</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default CourseSearchBox
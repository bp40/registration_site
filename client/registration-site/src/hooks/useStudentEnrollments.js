import {useEffect, useState} from "react";

export const useStudentEnrollments = (id) => {

    const [results, setResults] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true)

    const jwtToken = sessionStorage.getItem('token')
    useEffect(() => {
        fetch(`:3000/student/search/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${jwtToken}`, // Add the 'Bearer ' prefix for JWT
            },
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((resJson) => {
                    setResults(resJson);
                });
            } else if (res.status === 204) {
                setResults([])
                setIsEmpty(true)
            } else{
                console.error("cannot fetch student from id");
            }
            setLoading(false)
        });
    }, [id]);

    return {results, loading, isEmpty}

}
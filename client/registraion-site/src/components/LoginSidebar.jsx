import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal} from "./modal.jsx";
import { atom, useSetAtom } from "jotai";

export const nameAtom = atom('')

const LoginSidebar = () => {

    const navigate = useNavigate()

    const setName = useSetAtom(nameAtom)
    const [id, setId] = useState("")
    const [pass, setPass] = useState("")

    const handleLoginSubmit = (e) => {
        e.preventDefault()

        const data = {
            "StudentId": id,
            "password": pass,
        }

        console.log(JSON.stringify(data))

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {

            if (res.status === 200){
                res.json().then(resJson => {
                    window.sessionStorage.setItem("token", resJson.token)
                    setName(resJson.name)
                    navigate('profile')
                })
            } else {
                document.getElementById('my_modal_1').showModal()
            }

        })

    }

    return (
        <div className="flex flex-col content-start align-top bg-purple-950 h-screen w-1/5 py-4">
            <Modal/>
            <form method="post" onSubmit={handleLoginSubmit}>
                <h2 className="px-4 text-white text-3xl">SimpleReg</h2>
                <div className="form-control w-full max-w-xs px-4 py-8">
                    <label className="label">
                        <span className="label-text text-white text-xl">Student Login</span>
                    </label>
                    <input type="text" placeholder="Student ID" value={id} onChange={event => {setId(event.target.value)}} className="input input-bordered input-sm w-full max-w-xs my-4" />
                    <input type="password" placeholder="Password" value={pass} onChange={event => {setPass(event.target.value)}} className="input input-bordered input-sm w-full max-w-xs my-4" />
                    <button type="submit" className="btn btn-active btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginSidebar
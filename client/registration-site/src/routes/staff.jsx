import {useState} from "react";
import {Modal} from "../components/modal.jsx";
import {useNavigate} from "react-router-dom";

const Staff = () => {

    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleIdChange = (e) =>{
        setId(e.target.value)
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    const handleStaffLogin = (e) =>{
        e.preventDefault()

        const data = {
            RegistrarId: id,
            password: password,
        };


        fetch("http://localhost:3000/staff/login", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((resJson) => {
                    window.sessionStorage.setItem("token", resJson.token);
                    navigate("/staff/dashboard");
                });
            } else {
                document.getElementById("my_modal_1").showModal();
            }
        });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <Modal message="login failed" />
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    Sign in
                </h1>
                <form method="post" className="mt-6" onSubmit={handleStaffLogin}>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Staff ID
                        </label>
                        <input
                            onChange={handleIdChange}
                            value={id}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            onChange={handlePassChange}
                            value={password}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Staff;

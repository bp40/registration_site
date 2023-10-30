import {NavSidebar} from "../components/NavSidebar.jsx";
import Card from "../components/Card.jsx";
import {useAtomValue} from "jotai";
import {nameAtom} from "../components/LoginSidebar.jsx";

export const Profile = () => {

    const name = useAtomValue(nameAtom)

    return (
        <div className='flex p-0 w-screen'>
            <NavSidebar/>
            <div>
                <h2 className="p-8 text-3xl h-6 block">Welcome {name}</h2>
                <Card title='Testing' msg="1234"/>
            </div>
        </div>
    )
}
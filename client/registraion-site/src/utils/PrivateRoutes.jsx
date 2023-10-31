import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = () => {

    let auth = false
    const token = sessionStorage.getItem("token")

    auth = token !== null && token !== undefined;

    return (
        auth ? <Outlet/> : <Navigate to='/' state={{ isRedirected: true}}/>
    )
}

export default PrivateRoutes
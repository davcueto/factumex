import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const useAuth = () => {
    //TODO validacion token con endpoint
    const user = { loggedIn: localStorage.getItem("accessToken") ? true : false };
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/home" />;
}

export default ProtectedRoutes;
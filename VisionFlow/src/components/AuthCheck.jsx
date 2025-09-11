import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function AuthCheck({children}){

    const { user,isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <> {children} </>;
}

export default AuthCheck;
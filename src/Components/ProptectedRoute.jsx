import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({children}) =>{ 
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/landingpage" />;
}

export default ProtectedRoute;
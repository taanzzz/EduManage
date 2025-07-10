import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/Shared/LoadingSpinner";


const AdminRoute = ({ children }) => {
    const { userRole, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (userRole === 'admin') {
        return children;
    }

    return <Navigate to="/" />; 
};

export default AdminRoute;
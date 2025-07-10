import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";



const useRole = () => {
    const { userRole, loading } = useContext(AuthContext);

    
    const isAdmin = userRole === 'admin';
    const isTeacher = userRole === 'teacher';
    const isStudent = userRole === 'student';

    return {
        role: userRole,      
        isAdmin,             
        isTeacher,           
        isStudent,           
        isRoleLoading: loading 
    };
};

export default useRole;
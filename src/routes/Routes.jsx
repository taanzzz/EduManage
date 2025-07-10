// 📁 File: src/routes/Routes.jsx

import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Login from './../pages/Login';
import Register from './../pages/Register';
import AllClasses from './../pages/AllClasses';
import TeachOnEdu from './../pages/TeachOnEdu';
import DashboardLayout from './../layouts/DashboardLayout';
import Profile from './../pages/Dashboard/Common/Profile';
import AddClass from './../pages/Dashboard/Teacher/AddClass';
import TeacherRequest from './../pages/Dashboard/Admin/TeacherRequest';
import Home from './../pages/Home/Home';
import TeacherRoute from './TeacherRoute';
import AdminRoute from "./AdminRoute";
import MyClasses from "../pages/Dashboard/Teacher/MyClasses";
import ClassDetails from "../pages/ClassDetails";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import Payment from "../pages/Payment";
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import MyEnrolledClassDetails from "../pages/Dashboard/Student/MyEnrolledClassDetails";
import MyClassDetails from './../pages/Dashboard/Teacher/MyClassDetails';
import PrivateRoute from "./PrivateRoute";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "all-classes", element: <AllClasses /> },
            { path: "teach-on-edu", element: <PrivateRoute><TeachOnEdu /></PrivateRoute> },
            { 
                path: "/class-details/:id", 
                element: <PrivateRoute><ClassDetails /></PrivateRoute> 
            }, // <-- এই লাইনটি যোগ করুন
            {
    path: "/payment/:id",
    element: <PrivateRoute><Payment /></PrivateRoute>,
},
        ],
    },
    // Dashboard Routes
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // Common Route
            { path: "profile", element: <Profile /> },

            // Student Routes
            { 
                path: "my-enrolled-classes", 
                element: <MyEnrolledClasses /> // <-- নতুন রুট
        
            },
            { 
    path: "my-enrolled-class-details/:id", 
    element: <PrivateRoute><MyEnrolledClassDetails /></PrivateRoute>
},

            // Teacher Routes
            { path: "add-class", element: <TeacherRoute><AddClass /></TeacherRoute> },
            { path: "my-classes", element: <TeacherRoute><MyClasses /></TeacherRoute> },
            { 
                path: "my-class-details/:id", 
                element: <TeacherRoute><MyClassDetails /></TeacherRoute> 
            }, 

            // Admin Routes
            { path: "teacher-requests", element: <AdminRoute><TeacherRequest /></AdminRoute> },
             { path: "manage-classes", element: <AdminRoute><ManageClasses /></AdminRoute> },
             { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },

        ]
    }
]);
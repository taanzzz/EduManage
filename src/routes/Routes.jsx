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
import MyOrder from "../pages/Dashboard/Student/MyOrder";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import Blog from "../pages/Blog";
import Jobs from "../pages/Jobs";
import Press from "../pages/Press";
import Marketing from "../pages/Marketing";
import Analytics from "../pages/Analystics";
import Commerce from "../pages/Commerce";
import Insights from "../pages/Insights";
import Documentation from "../pages/Documentation";
import ApiStatus from "../pages/ApiStatus";
import Claim from "../pages/Claim";
import Policies from "../pages/Policies";
import Pricing from "../pages/Pricing";





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
            { path: "about", element: <AboutUs /> },
            { path: "contact", element: <Contact /> },
            { path: "privacy", element: <PrivacyPolicy /> },
            { path: "terms", element: <TermsOfService /> },
            { path: "blog", element: <Blog /> },
            { path: "jobs", element: <Jobs /> },
            { path: "press", element: <Press /> },
            { path: "marketing", element: <Marketing /> },
            { path: "analytics", element: <Analytics /> },
            { path: "commerce", element: <Commerce /> },
            { path: "insights", element: <Insights /> },
            { path: "documentation", element: <Documentation /> },
            { path: "api-status", element: <ApiStatus /> },
            { path: "claim", element: <Claim /> },
            { path: "policies", element: <Policies /> },
            { path: "pricing", element: <Pricing /> },
            { 
                path: "/class-details/:id", 
                element: <PrivateRoute><ClassDetails /></PrivateRoute> 
            }, 
            {
    path: "/payment/:id",
    element: <PrivateRoute><Payment /></PrivateRoute>,
},
        ],
    },
    { path: "teach-on-edu", element: <PrivateRoute><TeachOnEdu /></PrivateRoute> },
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
                element: <MyEnrolledClasses /> 
        
            },
            { 
    path: "my-enrolled-class-details/:id", 
    element: <PrivateRoute><MyEnrolledClassDetails /></PrivateRoute>
},
{ path: "my-orders", element: <PrivateRoute><MyOrder /></PrivateRoute> },

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
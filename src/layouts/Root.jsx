import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from './../components/Shared/Footer';
import ScrollToTop from "../components/Shared/ScrollToTop";



const Root = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <ScrollToTop></ScrollToTop>
      <div className="flex-grow  mt-17">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;

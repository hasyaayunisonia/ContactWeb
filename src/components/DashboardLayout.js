import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BreadcrumbWrapper from "./BreadcrumbWrapper";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <BreadcrumbWrapper />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;

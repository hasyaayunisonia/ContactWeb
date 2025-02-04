// BreadcrumbWrapper.js
import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { capitalize } from "@mui/material";

const BreadcrumbWrapper = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // If the route is "/", set the breadcrumb to "Home / Dashboard"
  if (location.pathname === "/") {
    return (
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  // For other routes, display the dynamic breadcrumb
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {pathSnippets.map((path, index) => (
        <Breadcrumb.Item key={index}>
          <Link to={`/${path}`}>{capitalize(getRouteName(path))}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
  //   return (
  //     <Breadcrumb style={{ margin: "16px 0" }}>
  //       <Breadcrumb.Item>
  //         <Link to="/">Home</Link>
  //       </Breadcrumb.Item>
  //       {pathSnippets.map((path, index) => (
  //         <Breadcrumb.Item key={index}>
  //           <Link to={`/${path}`}>{capitalize(path)}</Link>
  //         </Breadcrumb.Item>
  //       ))}
  //     </Breadcrumb>
  //   );
};

// Function to get the route name based on the route path
const getRouteName = (path) => {
  // Add logic to map path to corresponding route name
  // For simplicity, you can use a switch statement or object mapping
  switch (path) {
    case "dashboard":
      return "Dashboard";
    case "add-contact":
      return "Add Contact";
    case "update-contact":
      return "Update Contact";
    case "detail-contact":
      return "Detail Contact";
    default:
      return capitalize(path);
  }
};

export default BreadcrumbWrapper;

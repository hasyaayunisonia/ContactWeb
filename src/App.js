import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AddContact from "./pages/AddContact";
import UpdateContact from "./pages/UpdateContact";
import DetailContact from "./pages/DetailContact";
import Dashboard from "./pages/Dashboard";
import BreadcrumbWrapper from "./components/BreadcrumbWrapper";

import { Layout } from "antd";

// const breadcrumb = [
//   { label: 'Home', path: '/' },
//   { label: 'Dashboard', path: '/dashboard' },
// ];

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout style={{ padding: "30px 48px" }}>
        <div style={{ marginBottom: "20px" }}>
          {/* <Navbar breadcrumb={breadcrumb} /> */}
          {/* <Navbar /> */}
          <Router>
            <BreadcrumbWrapper />
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard />}
                name="Dashboard"
              />
              <Route
                path="/dashboard/add-contact"
                element={<AddContact />}
                name="Add Contact"
              />
              <Route
                path="/dashboard/update-contact/:id"
                element={<UpdateContact />}
                name="Update Contact"
              />
              <Route
                path="/dashboard/detail-contact/:id"
                element={<DetailContact />}
                name="Detail Contact"
              />
              <Route path="/" element={<Dashboard />} name="Home" />
            </Routes>
          </Router>
        </div>

        <Layout style={{ padding: "16px" }}>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;

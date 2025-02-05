import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AddContact from "./pages/AddContact";
import UpdateContact from "./pages/UpdateContact";
import DetailContact from "./pages/DetailContact";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";

import { Layout } from "antd";

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Layout style={{ padding: "30px 48px" }}>
          <Routes>
            <Route path="/" element={<DashboardLayout />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />{" "}
              <Route path="add-contact" element={<AddContact />} />
              <Route path="update-contact/:id" element={<UpdateContact />} />
              <Route path="detail-contact/:id" element={<DetailContact />} />
            </Route>
          </Routes>
        </Layout>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;

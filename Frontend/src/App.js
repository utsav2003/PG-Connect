import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import AppNavbar from "./components/AppNavbar";
import ListProperty from "./components/ListProperty";
import Houses from "./components/Houses";
import AboutUs from "./components/About";
import ContactUs from "./components/ContactUs";
import HouseDetail from "./components/HouseDetail";
import HousingAdminApproval from "./Admin/HousingAdminApproval";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/listProperty" element={<ListProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/houseDetail/:id" element={<HouseDetail />} />
        <Route path="/adminApproval" element={<HousingAdminApproval />} />
      </Routes>
      {/* <Login /> */}
      {/* <RentalCards /> */}
    </div>
  );
}

export default App;

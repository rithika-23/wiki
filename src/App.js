import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import UserDashboard from "./pages/User/UserDashboard";
import RegistrationForm from "./pages/User/RegistrationForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ChangePassword from "./pages/Auth/ChangePassword";
import Home from "./components/Home";
// import Wikisearch from "./pages/Wikisearch";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route
          path="/change-password/:id/:token"
          element={<ChangePassword />}
        />

        <Route path="/dashboard/:token" element={<UserDashboard />} />
        <Route
          path="/register-course/:token/:id"
          element={<RegistrationForm />}
        />
      </Routes>
    </>
  );
};

export default App;

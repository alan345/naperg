import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Users from "../pages/user/Users";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import User from "../pages/user/UserPage";

const RouteApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signup" element={<PublicRoute component={Signup} />} />
      <Route path="/login" element={<PublicRoute component={Login} />} />
      <Route path="/forgetPassword" element={<PublicRoute component={ForgetPassword} />} />
      <Route
        path="/resetPassword/:resetPasswordToken"
        element={<PublicRoute component={ResetPassword} />}
      />

      <Route path="/users" element={<PrivateRoute component={Users} />} />
      <Route path="/user/:userId" element={<PrivateRoute component={User} />} />
    </Routes>
  );
}

export default RouteApp

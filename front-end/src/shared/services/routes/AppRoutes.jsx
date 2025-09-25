import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../../modules/user/pages/Home";
import Login from "../../../modules/user/pages/Login";
import Register from "../../../modules/user/pages/Register";
import Dashboard from "../../../modules/dashboards/DashBoard";
import { UrlShort } from "../../../modules/url-shortener/pages/UrlShort";
import AllUrls from "../../../modules/url-shortener/pages/AllUrls";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<UrlShort />} />
        <Route path="shorten" element={<UrlShort />}></Route>
        <Route path="links" element={<AllUrls />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "../Pages/Users";
import ToDosGroup from "../Pages/ToDosGroup";
import Home from "../Pages/Home";
import MyAppBar from "../Bar/MyAppBar";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <MyAppBar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/ToDosGroup" element={<ToDosGroup />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

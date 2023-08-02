import React from "react";
import { Route, Routes } from "react-router-dom";
import AddFlats from "../AddFlats/AddFlats";
import AddResident from "../AddResident/AddResident";
import HomePage from "../HomePage";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import NotFound from "../NotFound/NotFound";
import SignUp from "../SignUp/SignUp";
import AppError from "../AppError";
import ResidentDetails from "../ResidentDetails";

const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flat/:id" element={<ResidentDetails />} />
        <Route path="/addFlats" element={<AddFlats />} />
        <Route path="/addresident/:flatId" element={<AddResident />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AppError />
    </div>
  );
};

export default AllRoutes;

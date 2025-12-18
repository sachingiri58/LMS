import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoursePage from "../components/CoursePage"; // component import

const Courses = () => {
  return (
    <div>
      <Navbar />

      <CoursePage />

      <Footer />
    </div>
  );
};

export default Courses;

import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import HomeCourse from "../components/HomeCourse"
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <HomeCourse/>
      <Testimonial/>
      <Footer/>
    </div>


  );
};

export default Home;

import React from "react";
import CustomNavBar from "../items/CustomNavBar";
import Content from "./Content";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      {/* <Sidebar /> */}
      <div>
        <CustomNavBar />
        <Content />
      </div>
    </div>
  );
};

export default Home;

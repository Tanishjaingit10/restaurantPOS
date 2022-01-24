import React from "react";
import CustomNavBar from "../items/CustomNavBar";
import Content from "./Content";

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

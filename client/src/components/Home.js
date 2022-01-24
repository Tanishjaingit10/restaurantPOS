import React from "react";
import Content from "./Content";

const Home = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      {/* <Sidebar /> */}
      <div>
        <Content />
      </div>
    </div>
  );
};

export default Home;

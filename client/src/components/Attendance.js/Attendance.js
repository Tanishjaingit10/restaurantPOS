import React from "react";
import CustomNavBar from "../../items/CustomNavBar";

const Attendance = () => {
  return (
    <div className=" text-white font-roboto">
      {/* <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4">
            <a href="/home">
              <i className="fas fa-home font-semibold"></i>
            </a>
          </div>
          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">
            Menu
          </div>
        </div>
      </nav> */}
      <CustomNavBar />
      <div className="flex flex-col w-96 justify-center mx-auto h-auto top-36 mt-44 text-xl">
        <button className=" bg-primary text-white font-bold py-4 my-4">
          <a href="/takeAttendance">Take Attendance</a>
        </button>
        <button className="bg-primary text-white font-bold py-4  my-4">
          <a href="/viewAttendance">View Attendance Report</a>
        </button>
        <button className="bg-primary text-white font-bold py-4  my-4">
          <a href="/clockInOut">Clock In / Out</a>
        </button>
      </div>
    </div>
  );
};

export default Attendance;

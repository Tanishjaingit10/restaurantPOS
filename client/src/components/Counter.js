import React, { useState } from "react";

const Counter = () => {
  const [detail, setDetail] = useState(false);
  const showDetails = () => {
    setDetail(!detail);
  };

  return (
    <div className="h-screen justify-items-conter">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl ">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/home">
              <i className="fas fa-home mr-4"></i>
            </a>
          </div>
          <div className="  text-white px-2  font-semibold">
            Counter Dashboard
          </div>
        </div>
      </nav>
      <div className=" m-4 p-6 justify-evenly flex flex-wrap">
        <div
          className={
            detail
              ? "shadow-2xl w-1/4 font-roboto bg-white m-2"
              : "w-1/4 font-roboto bg-white m-2"
          }
        >
          <div className="flex flex-col font-bold">
            <div className="flex flex-row text-xl text-white font-roboto bg-green">
              <div className=" w-full p-4 text-left">Table No. 3</div>
              <div className=" w-full p-4 text-right">Dine In Online</div>
            </div>
            <div className="flex flex-row text-xl text-white font-roboto bg-green">
              <div className=" w-full p-4 text-left">Token No. 302</div>
              <div className=" w-full p-4 text-right">#2102</div>
            </div>
            <div
              className="relative rounded-full bottom-6 p-2 bg-white w-12 h-12 mx-auto shadow-lg text-green text-center text-xl"
              onClick={showDetails}
            >
              {detail ? (
                <i className="fas fa-chevron-up mt-2"></i>
              ) : (
                <i className="fas fa-chevron-down mt-2"></i>
              )}
            </div>
          </div>
          {detail ? (
            <div className=" -mt-4 flex flex-row px-6">
              <div className="flex flex-col w-full py-2">
                <div className="text-xl font-semibold">French Fries</div>
                <div className="text-md text-gray-400 font-medium">
                  1 x Variant
                </div>
                <div className="text-md text-gray-400 font-medium">
                  1 x Variant
                </div>
                <div className="text-md text-gray-400 font-medium">
                  1 x Variant
                </div>
              </div>
              <div className="flex flex-col w-full text-green text-xl text-right font-semibold">
                <div className="py-2">Processing</div>
                <div className="py-2">00:05:00</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Counter;

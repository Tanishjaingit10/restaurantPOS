import React from "react";

const Kitchen = () => {
  return (
    <div className="h-screen justify-items-conter overflow-hidden">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl ">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
          <a href="/home">
              <i className="fas fa-home font-semibold mr-4"></i>
            </a>
          </div>
          <div className="  text-white px-2  font-semibold">
            Kitchen
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-screen">
        <div className="h-3/4 overflow-y-scroll">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="p-2 border-2 bg-lightprimary">Order Id#</th>
                <th className="p-2 border-2 bg-lightprimary">Order Type</th>
                <th className="p-2 border-2 bg-lightprimary">Table No.</th>
                <th className="p-2 border-2 bg-lightprimary">Order Time</th>
                <th className="p-2 border-2 bg-lightprimary">Remaining Time</th>
                <th className="p-2 border-2 bg-lightprimary">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-medium">
                <td className="bg-secondary py-2 text-center border-2">#210522</td>
                <td className="bg-secondary py-2 text-center border-2">
                  Take Away
                </td>
                <td className="bg-secondary py-2 text-center border-2">
                  N/A
                </td>
                <td className="bg-secondary py-2 text-center border-2">
                  03:00:00
                </td>
                <td className="bg-secondary py-2 text-center border-2">
                  01:00:00
                </td>
                <td className="bg-secondary py-2 text-center">
                  Processing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white">
          Show More
        </button>
      </div>
    </div>
  );
};

export default Kitchen;

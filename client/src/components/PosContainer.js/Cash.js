import React from "react";

const Cash = () => {
  return (
    <div className="h-screen justify-items-conter">
      <nav className="bg-gray-400 py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4">
            <a href="/pos">
              <i class="fas fa-arrow-left mr-4"></i>Back
            </a>
          </div>
          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">
            Pay By Cash
          </div>
        </div>
      </nav>
      <div className="bg-pink flex flex-col p-8">
        <div className="bg-yellow flex flex-col p-6 w-96 mx-auto font-roboto">
          <div className="bg-white text-center py-2">Amount Due</div>
          <div className="bg-blue text-center py-2 text-3xl text-primary">$14.00</div>
        </div>
        <div className="bg-green w-1/3 mx-auto flex flex-col">
            <div className="bg-white relative py-2 px-2"><p>Amount tendered<span className="absolute right-4">$0.00</span></p></div>
            <div className="bg-gray-300 justify-evenly flex flex-row text-2xl py-2"><div>Exact</div><div className="">$10.00</div><div className="">$10.00</div></div>
            <div>
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cash;

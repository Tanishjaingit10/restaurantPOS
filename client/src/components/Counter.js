import React, { useState, useEffect } from "react";
let arr = new Array(1000000).fill(false);
const Counter = () => {
  const [display, setDisplay] = useState();
  const [Order, showOrder] = useState();
  const showDetails = (e, index) => {
    arr[index] = !arr[index];
    if (arr[index]) {
      arr = arr.map(x => false);
      arr[index]=true;
    }
  };
 
  var code;
  const loadOrders = async (e) => {
    await fetch("/app/orders")
      .then((res) => res.json())
      .then((json) => {
        setDisplay(
          json.map((option, index) => {
            if(index%2===0)
              code="#1DBE19";
            else
                code="#BE2D19"
            return (
              <div
                className={
                  arr[index]
                    ? "shadow-2xl w-1/4 font-roboto bg-white m-2"
                    : "w-1/4 font-roboto bg-white m-2"
                }
              >
                <div className="flex flex-col font-bold">
                  <div className="flex flex-row text-xl text-white font-roboto" style={{backgroundColor : code}}>
                    <div className=" w-full p-4 text-left">
                      Table No. {option.payment[0].table}
                    </div>
                    <div className=" w-full p-4 text-right">
                      {option.payment[0].orderType}
                    </div>
                  </div>
                  <div className="flex flex-row text-xl text-white font-roboto " style={{backgroundColor : code}}>
                    <div className=" w-full p-4 text-left">Token No. 302</div>
                    <div className=" w-full p-4 text-right">
                      #{option.order_id}
                    </div>
                  </div>
                  <div
                    className="relative rounded-full bottom-6 p-2 bg-white w-12 h-12 mx-auto shadow-lg text-center text-xl"
                    style={{color : code}}
                    onClick={() => {
                      showDetails(option, index);
                    }}
                    
                  >
                    {arr[index] ? (
                      <i className="fas fa-chevron-up mt-2"></i>
                    ) : (
                      <i className="fas fa-chevron-down mt-2"></i>
                    )}
                  </div>
                </div>
                {arr[index] ? (
                  <>
                    <div className="flex flex-row w-full px-6 -mt-6">
                      <div className="w-full">
                        {
                          option.order.map((obj) => {
                            return (
                            
                                <div className="flex flex-col w-full py-2">
                                  <div className="text-xl font-semibold">{obj.foodItem}</div>
                                  {obj.orderedVariant.map((extra) => {
                                    return (
                                      <>
                                        <div className="text-md text-gray-400 font-medium">
                                          1 x {extra.variant}
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>)
                        })}
                      </div>
                      <div className="flex flex-col text-xl text-right font-semibold w-full" style={{color : code}}>
                        <div className="py-2">
                          {option.payment[0].orderStatus}
                        </div>
                        <div className="py-2">00:05:00</div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            );
          })
        );
      });
  };

  useEffect(() => {
    loadOrders();
  });


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
        {display}
      </div>
    </div>
  );
};

export default Counter;

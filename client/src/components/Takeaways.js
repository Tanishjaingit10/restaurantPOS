import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Popup from "./Popup";
const Takeaways = () => {
  // const [inputValue, setInputvalue] = useState("Search for order or serial no.")
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  let count = 1;
  const getOrders = async () => {
    await fetch("/app/orders")
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        if (json !== "undefined") {
          setOrders(
            json.filter((option) => {
                if(option.payment.orderType==='Take Away')
                {
                    if (search === "") return option;
                else if (option.order_id.toString().includes(search)) {
                  return option;
                }
                return null;
                }
                
              })
              .map((option) => {
                return (
                  <tr className="font-medium">
                    <td className="bg-secondary py-2 text-center border-2">
                      {count++}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.order_id}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.payment.orderType}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.payment.orderStatus}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.payment.total}
                    </td>
                    <td className="bg-secondary py-2 text-center flex flex-col">
                      <div>{option.time.toLocaleString().split("T")[0]}</div>
                      <div>
                        {
                          option.time
                            .toLocaleString()
                            .split("T")[1]
                            .split(".")[0]
                        }
                      </div>
                    </td>
                  </tr>
                );
              })
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("1", err);
        setOpen(!open);
      });
  };
  useEffect(() => {
    // setLoading(!loading);
    getOrders();
  }, [orders]);
  return (
    <div className="h-screen justify-items-conter overflow-hidden">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/home">
              <i className="fas fa-home font-semibold mr-4"></i>
            </a>
          </div>
          <div className="justify-end  flex flex-row mr-12">
            <div className="text-white px-2 font-semibold mr-8">Takeaway Orders</div>
            <div className="border-b-2 border-white px-4 mx-6 text-white flex flex-row w-80">
              <i className="fas fa-search mr-4"></i>
              <input
                type="type"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" bg-primary focus:outline-none text-white text-sm w-full"
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-screen">
        <div className="h-3/4 overflow-y-scroll">
          <table className="w-full">
            <thead className="relative">
              <tr className="">
                <th className="p-2 border-2 bg-lightprimary">S.No.</th>
                <th className="p-2 border-2 bg-lightprimary">Order Id</th>
                <th className="p-2 border-2 bg-lightprimary">Type</th>
                <th className="p-2 border-2 bg-lightprimary">Status</th>
                <th className="p-2 border-2 bg-lightprimary">Total</th>
                <th className="p-2 border-2 bg-lightprimary">Date</th>
              </tr>
            </thead>
            <tbody className="w-full">{loading?<Loader/>:orders}</tbody>
          </table>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white">
          Show More
        </button>
      </div>
      
      {open && (
        <Popup
          content={
            <>
              <p className="pb-4 font-bold text-green">Unable to Load Server</p>
              <button
                className="bg-primary px-10 py-2"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Try Again
              </button>
            </>
          }
          handleClose={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Takeaways;

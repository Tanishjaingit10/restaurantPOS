import React, { useState, useEffect, useContext } from "react";
import Loader from "./Loader";
import Popup from "./Popup";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import CustomNavBar from "../items/CustomNavBar";
import { ThemeContext } from "../context/Theme";
import CustomButton from "../items/CustomButton";

let len = 0;
const Orders = () => {
  // const [inputValue, setInputvalue] = useState("Search for order or serial no.")
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(false);
  const debounced = useDebouncedCallback(
    (value) => {
      setSearch(value);
    },
    0,
    // The maximum time func is allowed to be delayed before it's invoked:
    { maxWait: 2000 }
  );
  let count = 1;
  const getOrders = async () => {
    await fetch("/app/orders")
      .then((res) => res.json())
      .then((json) => {
        if (json !== "undefined") {
          len = json.length;
          setOrders(
            json
              .filter((option) => {
                if (search === "") return option;
                else if (option.order_id.toString().includes(search)) {
                  return option;
                }
                return null;
              })
              .slice(0, rows ? len : 4)
              .map((option) => {
                setLoading(false);
                return (
                  <tr className="font-medium ">
                    <td className="text-center flex flex-col border-b-2 border-l-2  border-black">
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
                    <td className=" text-center border-b-2 border-l-2 border-r-2 border-black">
                      {count++}
                    </td>
                    <td className=" text-center border-b-2  border-r-2 border-black">
                      {option.order_id}
                    </td>
                    <td className=" text-center border-b-2 border-l-2 border-r-2 border-black">
                      {option.payment.orderType}
                    </td>
                    <td className=" text-center border-b-2  border-r-2 border-black">
                      {option.payment.orderStatus}
                    </td>
                    <td className=" text-center border-b-2 border-l-2 border-r-2 border-black">
                      {option.payment.total}
                    </td>
                    <td className=" text-center border-b-2 border-l-2 border-r-2 border-black">
                      <CustomButton
                        title="View Order"
                        customStyle={{ backgroundColor: theme.backgroundColor }}
                      />
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
  const showMore = (e) => {
    setLoading(true);

    setRows(!rows);
  };
  useEffect(() => {
    getOrders();
  }, [rows]);
  return (
    <div className="h-screen justify-items-conter overflow-hidden  ">
      <CustomNavBar />
      <div className="overflow-y-scroll  px-10 ">
        <div className="flex items-center justify-between my-5">
          <h2 className="font-semibold text-2xl">Orders Report</h2>
          <div className="flex flex-row items-center">
            <CustomButton
              title="Select Food Item"
              customStyle={{ backgroundColor: theme.backgroundColor }}
            />
            <CustomButton
              title="Select Data Range"
              customStyle={{ backgroundColor: theme.backgroundColor }}
            />
            <CustomButton
              title="Yesterday Orders"
              customStyle={{ backgroundColor: theme.backgroundColor }}
            />
            <CustomButton
              title="Today Orders"
              customStyle={{ backgroundColor: theme.backgroundColor }}
            />
          </div>
        </div>
        <div className="flex flex-col h-full border-black border-2 rounded-xl">
          <div className="flex items-center justify-between  py-4 px-4">
            <p>Display </p>
            <select className="w-32 p-2 ml-4">
              <option>10</option>
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
            <p className="ml-4">Records</p>
            <input
              type="radio"
              value="Pending"
              name="orderStatus"
              className="ml-40 text-red"
            />{" "}
            <span className="text-red">Pending</span>
            <input
              type="radio"
              value="Completed"
              name="orderStatus"
              className="ml-5"
            />{" "}
            <span className="text-green">Completed</span>
            <input
              type="radio"
              value="Cancelled"
              name="orderStatus"
              className="ml-5"
            />{" "}
            <span className="text-yellow">Cancelled</span>
            <input
              type="radio"
              value="All Orders"
              name="orderStatus"
              className="ml-5"
            />{" "}
            <span className="text-red">All Orders</span>
            <div
              style={{ backgroundColor: theme.backgroundColor }}
              className="text-white py-2 px-2 rounded-md mx-2 ml-20"
            >
              <i className="fas fa-retweet"></i>
            </div>
            <CustomButton
              title="Actions"
              customStyle={{ backgroundColor: theme.backgroundColor }}
            />
            <CustomButton
              title="Take Away"
              customStyle={{ backgroundColor: "yellow" }}
            />
          </div>
          <table className="w-full">
            <thead className="relative ">
              <tr>
                <th
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="p-2 text-2xl border-r-2 border-white text-white"
                >
                  Date
                </th>
                <th
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="p-2 text-2xl border-l-2 border-r-2 border-white text-white"
                >
                  S.No.
                </th>
                <th
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="p-2 text-2xl border-l-2 border-r-2 border-white text-white"
                >
                  Order Id
                </th>
                <th
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="p-2 text-2xl border-l-2 border-r-2 border-white text-white"
                >
                  Type
                </th>
                <th
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="p-2 text-2xl border-l-2 border-r-2 border-white text-white"
                >
                  Status
                </th>
                <th
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="p-2 text-2xl border-l-2  border-white text-white"
                >
                  Total
                </th>
                <th
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="p-2 text-2xl border-l-2  border-white text-white"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full">{loading ? <Loader /> : orders}</tbody>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 mx-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="ml-3 relative inline-flex items-center px-4 py-2 mx-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      aria-current="page"
                      style={{
                        borderColor: theme.backgroundColor,
                        color: theme.backgroundColor,
                        backgroundColor: theme.tableBackground,
                      }}
                      className="z-10  relative inline-flex items-center px-4 py-2 mx-2 border text-sm font-medium"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 mx-2 border text-sm font-medium"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 mx-2 border text-sm font-medium"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 mx-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 mx-2 border text-sm font-medium"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 mx-2 border text-sm font-medium"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 mx-2 border text-sm font-medium"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <p>Next</p>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </table>
        </div>
        {/* Show More Button  */}
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

export default Orders;

import React, { useState, useEffect, useContext } from "react";
import Popup from "./Popup";
import Loader from "./Loader";
import Logo from "../images/logo.jpeg";
import { ThemeContext } from "../context/Theme";
import CustomButton from "../items/CustomButton";

let arr = new Array(1000000).fill(false);
let order = [];
const Tables = () => {
  const [displayTable, setDisplayTable] = useState();
  const [check, setCheck] = useState(false);
  const [Open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext);
  const showDetails = async (index, obj) => {
    console.log(index);
    arr[index] = !arr[index];
    console.log(arr[index]);
    if (arr[index]) {
      arr = arr.map((x) => false);
      arr[index] = true;
      await fetch(`/app/order/${obj.number}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.order) order = json;
          else order = [];
        });
    } else order = [];
    console.log(order.order);
  };

  let code;
  const deleteTable = async () => {
    await fetch(`/app/removeTable/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
    setOpen(!Open);
    setCheck(!check);
    loadTables();
  };

  const delCheck = (e) => {
    setId(e.target.value);
    setCheck(!check);
  };

  const loadTables = async () => {
    await fetch("/app/table")
      .then((res) => res.json())
      .then((json) => {
        if (json !== "undefined") {
          setDisplayTable(
            json.map((obj, index) => {
              setLoading(false);
              if (index % 3 === 0) code = theme.backgroundColor;
              // else if (index % 3 === 1) code = theme.backgroundColor;
              else code = theme.tableBackground;
              return (
                <div
                  className={
                    arr[index]
                      ? "shadow-lg flex flex-col w-96 mx-4 mb-4"
                      : "flex flex-col w-14 rounded-lg "
                  }
                >
                  <i
                    style={{ color: theme.backgroundColor }}
                    className="far fa-trash relative top-0 -left-5 text-black"
                  />
                  <div
                    className="flex flex-col text-white p-4 text-lg font-roboto"
                    style={{ backgroundColor: code }}
                  >
                    <div className="relative font-semibold">
                      <h3 className="text-center ">{obj.number}</h3>
                    </div>
                  </div>

                  {arr[index] ? (
                    order.order ? (
                      <div className=" flex flex-col -mt-4 font-roboto">
                        <div className="flex flex-row px-6">
                          <div className="flex flex-col w-full">
                            {order.order.map((obj) => {
                              console.log(order);
                              return (
                                <div className="flex flex-col w-full py-2">
                                  <div className="text-xl font-semibold">
                                    {obj.foodItem}
                                  </div>
                                  {obj.orderedVariant.map((extra) => {
                                    return (
                                      <>
                                        <div className="text-md text-gray-400 font-medium">
                                          1 x {extra.variant}
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                          <div
                            className="flex flex-col w-full text-right"
                            style={{ color: code }}
                          >
                            <div className="py-2 font-bold text-xl"></div>
                            <div className="py-2 font-bold text-xl">
                              ETA:00:05:00
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label className="">Order Id</label>
                          <div className="text-primary">{order.order_id}</div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Customer Name</label>
                          <div className="text-primary">
                            {order.customer.name}
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Phone</label>
                          <div className="text-primary">
                            {order.customer.contact}
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Email</label>
                          <div className="text-primary">
                            {order.customer.email}
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Payment Status</label>
                          <div className="text-primary">
                            {order.payment.status}
                          </div>
                        </div>
                        <button className="bg-green py-2 text-white font-roboto font-semibold text-lg">
                          Mark as Completed
                        </button>
                      </div>
                    ) : (
                      <div className="bg-green py-2 text-white font-roboto font-semibold text-lg text-center">
                        Reserve
                      </div>
                    )
                  ) : null}
                </div>
              );
            })
          );
        }
      });
  };

  useEffect(() => {
    loadTables();
  });

  return (
    <div className="">
      <nav
        style={{ backgroundColor: theme.backgroundColor }}
        className="bg-red px-1 mt-0 h-auto w-full top-0 text-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink md:w-1/3 items-center justify-center md:justify-start text-white ml-4">
            <a href="/home">
              <i className="fas fa-bars font-semibold"></i>
            </a>
            <img src={Logo} className="w-16 h-16 ml-10" />
          </div>
          <button
            color={theme.backgroundColor}
            className="bg-white text-lg py-2 px-8 rounded-md mr-4"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-row justify-between items-center h-20 px-10 border-b-2 border-gray-300">
        <h2 className="font-semibold">Table View</h2>
        <div className="flex flex-row items-center">
          <CustomButton title="Actions" />
          <CustomButton title="Take Away" />
          <CustomButton title="- Delete Table" />
          <CustomButton title="+ Add Table" />
        </div>
      </div>
      <div className="mt-5 ml-10">
        <CustomButton title="+ Table Reservation" />
      </div>

      <div className="flex flex-col">
        <h2 className="my-5 ml-11 font-semibold text-gray-600 text-lg">
          Hall Way
        </h2>
        <div className="flex flex-wrap p-8 w-full justify-evenly">
          {loading ? <Loader /> : displayTable}
        </div>
        {/* Add Table  */}
      </div>
      {check && (
        <Popup
          content={
            <>
              <p className="font-bold text-green">
                Please confirm to delete the category?
              </p>
              <button
                className="mt-10 bg-primary px-10 py-2"
                onClick={deleteTable}
              >
                Confirm
              </button>
            </>
          }
          handleClose={() => {
            setCheck(!check);
          }}
        />
      )}
      {Open && (
        <Popup
          content={
            <>
              <p className="font-bold text-green">Deleted Successfully</p>
              <button
                className="mt-10 bg-primary px-10 py-2"
                onClick={() => {
                  setOpen(!Open);
                }}
              >
                Ok
              </button>
            </>
          }
          handleClose={() => {
            setOpen(!Open);
          }}
        />
      )}
    </div>
  );
};

export default Tables;

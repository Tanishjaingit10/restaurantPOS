import React, { useState, useEffect } from "react";
import Popup from "./Popup";
let arr = new Array(1000000).fill(false);
let order = []
const Tables = () => {
  const [displayTable, setDisplayTable] = useState();
  const [check, setCheck] = useState(false);
  const [Open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [detail, setDetail] = useState(false);
  const showDetails = async(index,obj) => {
    console.log(index)
    arr[index] = !arr[index];
    console.log(arr[index])
    if (arr[index]) {
      arr = arr.map(x => false);
      arr[index] = true;
       await fetch(`/app/order/${obj.number}`)
      .then((res) => res.json())
      .then((json) => order=json
      )
      console.log(order.message)
    }
    else order=[]
    console.log(order)
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
        setDisplayTable(
          json.map((obj, index) => {
            if (index % 3 === 0) code = "#BE2D19";
            else if (index % 3 === 1) code = "#1DBE19";
            else code = "#e58f55";
            return (
              
              <div className={arr[index]?"shadow-lg flex flex-col w-96 mx-4 mb-4":"flex flex-col w-96 mx-4"}>
                <div className="flex flex-row">
                  <div className="w-1/2 bg-gray-400 ">
                    <img src={obj.image} alt="" className="w-full h-32" />
                  </div>
                  <div className="w-1/2 bg-pink flex flex-col text-xl font-roboto">
                    <button className="w-full bg-lightprimary text-primary py-2 font-bold h-1/2">
                      Reorder
                    </button>
                    <button
                      className="w-full bg-primary text-white py-2 font-bold h-1/2"
                      value={obj.number}
                      onClick={delCheck}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div
                  className="flex flex-col text-white p-4 text-lg font-roboto"
                  style={{ backgroundColor: code }}
                >
                  <div className="relative font-semibold">
                    <label>Table : {obj.number}</label>
                    <span className="absolute right-0">{obj.status}</span>
                  </div>
                  <div className="relative font-semibold">
                    <label>Person : {obj.capacity}</label>
                    <span className="absolute right-0">{obj.location}</span>
                  </div>
                </div>
                <div
                  className="relative rounded-full -top-6 bg-white w-12 h-12 mx-auto shadow-lg text-red text-center text-xl p-2"
                  style={{ color: code }} onClick={() => {
                    showDetails(index,obj);
                  }}
                >
                {arr[index]?<i className="fas fa-chevron-up mt-2"></i>:<i className="fas fa-chevron-down mt-2"></i>}
                </div>
                {arr[index]? 
                // <div className=" flex flex-col -mt-4 font-roboto"> 
                //     <div className="flex flex-row px-6">
                //       <div className="flex flex-col w-full">
                    order.message===undefined?
                      <div className=" flex flex-col -mt-4 font-roboto"> 
                      <div className="flex flex-row px-6">
                        <div className="flex flex-col w-full">
                         { order.order.map((obj) => {
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
                        {/* <div className="text-lg">French Fries</div>
                        <div className="text-gray-400 text-md">1 x Variant</div> */}
                      </div>
                      <div className="flex flex-col w-full text-right" style={{ color: code }}>
                        <div className="py-2 font-bold text-xl"></div>
                        <div className="py-2 font-bold text-xl">ETA:00:05:00</div>
                      </div>
                    </div>
                    <div className="flex flex-col px-6 font-bold">
                      <label className="">Order Id</label>
                      <div className="text-primary">{order.order_id}</div>
                    </div>
                    <div className="flex flex-col px-6 font-bold">
                      <label>Customer Name</label>
                      <div className="text-primary">{order.customer.name}</div>
                    </div>
                    <div className="flex flex-col px-6 font-bold">
                      <label>Phone</label>
                      <div className="text-primary">{order.customer.contact}</div>
                    </div>
                    <div className="flex flex-col px-6 font-bold">
                      <label>Email</label>
                      <div className="text-primary">{order.customer.email}</div>
                    </div>
                    <div className="flex flex-col px-6 font-bold">
                      <label>Payment Status</label>
                      <div className="text-primary">{order.payment.status}</div>
                    </div>
                    <button className="bg-green py-2 text-white font-roboto font-semibold text-lg">Mark as Completed</button>
                </div>:<div>Reserve</div>
                :null} 
              </div>
            );
          })
        );
      });
  };

  useEffect(() => {
    loadTables();
  });

  return (
    <div className="">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4">
            <a href="/home">
              <i className="fas fa-home font-semibold"></i>
            </a>
          </div>
          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">
            Tables
          </div>
        </div>
      </nav>
      <div className="flex flex-col">
        <div className="flex flex-wrap p-8 w-full justify-evenly">
          {displayTable}
        </div>
        <button className="bg-green w-80 mx-auto py-2 text-white font-roboto font-bold text-lg">
          <a href="/addTable">Add Table</a>
        </button>
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

import React, { useState,useEffect } from "react";
import Countdown from "react-countdown";
import Loader from "./Loader";
import Popup from "./Popup";
import {useDebounce, useDebouncedCallback} from 'use-debounce';

let arr = new Array(1000000).fill(false);
let stat = new Array(1000000).fill(false);
let len = 0;
const Kitchen = () => {
  const [orders, setOrders] = useState()
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [rows, setRows]= useState(false)
 
  const getOrders = async () => {

    await fetch("/app/orders")
      .then((res) => res.json())
      .then((json) =>{
        if (json !== "undefined") {
          len = json.length;
          setOrders(json.slice(0,rows? len:4).map((option,index) => {
            setLoading(false);
            var date = new Date(option.time);
            arr[index] = date.getTime();
            return (
              <tr className="font-medium">
                <td className="bg-secondary py-2 text-center border-2">
                  {option.order_id}
                </td>
                <td className="bg-secondary py-2 text-center border-2">
                  {option.payment.orderType}
                </td>
                <td className="bg-secondary py-2 text-center border-2">
                  {option.payment.table}
                </td>
                <td className="bg-secondary py-2 text-center border-2">
                  {option.time.toLocaleString().split("T")[1].split(".")[0]}
                </td>
                <td className="bg-secondary py-2 text-center border-2">
                  <Countdown onComplete={() => showStatus(option, index)} date={arr[index] + option.payment.timeToCook * 60000} renderer={renderer} />
                </td>
                <td className="bg-secondary py-2 text-center">
                  {stat[index] ? 'Ready to serve' : option.payment.orderStatus}
                </td>
              </tr>
            );
          }))
        }
      }
        ).catch((err) => {
          setLoading(false);
          console.log("1", err);
          setOpen(!open);
        });
  }
  const showMore = (e)=>{ 
    setLoading(true)

    setRows(!rows)
  }
  useEffect(() => {
    getOrders()
  },[rows])

  const showStatus = async (option, index) => {
    const { customer, order, payment, time, order_id } = option;
    payment.orderStatus = 'Ready to Serve'
    stat[index] = true;
    await fetch(`/app/updateOrder/${option._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customer, order, payment, time, order_id
      })

    });



  }
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Time Over</span>;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  return (
    <div className="h-screen justify-items-conter overflow-hidden">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl ">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/home">
              <i className="fas fa-home font-semibold mr-4"></i>
            </a>
          </div>
          <div className="  text-white px-2  font-semibold">Kitchen</div>
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
            
      {loading?<Loader/>:orders}</tbody>
          </table>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white" onClick={showMore}>
          {rows? 'Show Less':'Show More'}
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

export default Kitchen;

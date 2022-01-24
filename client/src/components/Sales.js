import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Loader from "./Loader";
import Popup from "./Popup";
let [total, totalCard, totalCash, totalOnline,item] = [0,0,0,0,''];
let dateInput;
let len = 0;
const Sales = () => {
  const [loading, setLoading] = useState(false);
  const [orderLoading, setorderLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [displayCategory, setDisplayCategory] = useState(false);
  const [disp, setDisp] = useState(false);
  const [category, setCategory] = useState();
  const [displayItems, setDisplayItems] = useState();
  const [showError, setError] = useState(false);
  const [orders, showOrders] = useState()
  const [rows, setRows]= useState(false)
  const handleDate = (e) => {
    dateInput= (e.target.value)
  }
  const loadCategory = async () => {
    await fetch("/app/category")
      .then((res) => res.json())
      .then((json) =>
        setCategory(json)
      )
  }
  const handleItem = (e)=>{
    item=e;
    setDisp(false)
  }
  const showItems = async (e) => {
    setLoading(true)
    await fetch("/app/items")
      .then((res) => res.json())
      .then((json) => {
        // console.log(loading);
        if (typeof json !== "undefined") {
          setLoading(false);
          setDisplayItems(
            json.map((option) => {
              if (option.category === e.target.value) {
                return (
                  <button
                    className="bg-white m-2 relative rounded-xl shadow-2xl w-40 cursor-pointer"
                    onClick = {()=>handleItem(option.foodItem)}
                  >
                    <img
                      src={option.image}
                      className="w-40 object-fill"
                      alt=""
                    />
                    <span className="absolute right-0 top-0 text-center w-20 py-2 bg-white">
                      {option.price}
                    </span>
                    <div className="text-center bg-white py-2">
                      {option.foodItem}
                    </div>
                  </button>
                );
              }
              return null;
            })
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(!showError);
      });
  };
  const loadOrders = async () => {
    await fetch(
      "/app/orders")
      .then((res) => res.json())
      .then((json) => {
        if (json !== "undefined") {
          len = json.length;
        showOrders(json.filter((option) => {
          total = 0;
          totalCard = 0;
          totalCash = 0;
          totalOnline = 0;
          let itemCheck=0;
          option.order.forEach((obj, i) => {
            if(item&&obj.foodItem===item)
              {
                return itemCheck=1;
              }
          })
          if (dateInput && option.time.toLocaleString().split("T")[0] !== dateInput)
            return null;
          if (item&&!itemCheck)
            return null;
          if (search === "" || option.order_id.toString().includes(search))
            return option;
          return null;
        }).slice(0,rows? len:2).map((option) => {
          setorderLoading(false);
          total = total + option.payment.total;
          if (option.payment.mode === 'cash')
            totalCash = totalCash + option.payment.total;
          if (option.payment.mode === 'card')
            totalCard = totalCard + option.payment.total;
          if (option.payment.mode === 'online')
            totalOnline = totalOnline + option.payment.total;

          return (
            <tr className="bg-secondary">
              <td className="text-center border-r-2 border-white py-1">{option.time.toLocaleString().split('T')[0]}</td>
              <td className="text-center border-r-2 border-white py-1">5464657</td>
              <td className="text-center border-r-2 border-white py-1">{option.order_id}</td>
              <td className="text-center border-r-2 border-white py-1">{option.payment.orderType}</td>
              <td className="text-center border-r-2 border-white py-1">{option.payment.discount}</td>
              <td className="text-center py-1">${option.payment.total}</td>
            </tr>
          )
        }))
      }}).catch((err) => {
        setorderLoading(false);
        console.log("1", err);
        // setOpen(!open);
      });
  }
  const openMenu = async (e) => {
    e.preventDefault();
    setDisp(!disp);
    setDisplayCategory(category.map((option) => {
      return (<button value={option.category} name="color" onClick={showItems} className="hover:bg-gray-300 block align-middle py-4 px-6 w-44 no-underline m-2 " style={{ backgroundColor: option.color }}>{option.category}</button>)
    }))
  }
  const showMore = (e)=>{ 
    setorderLoading(true)
    setRows(!rows)
  }
  useEffect(() => {
    loadOrders();
  },[rows]);

  useEffect(() => {
    loadCategory()
  })

  return (

    <div className="h-screen justify-items-conter overflow-hidden bg-white">
      <nav className="bg-primary py-2 md:py-4 px-1 mt-0 h-auto w-full top-0">
        <div className="text-center w-full relative">
          <div className=" text-white left-1 absolute sm:left-4">
            <Link to="/home">
              <i className="fas fa-home font-semibold mr-2 sm:mr-4 text-sm sm:text-md md:text-lg lg:text-2xl"></i>
            </Link>
          </div>
          <div className="justify-end flex flex-row mr-1 sm:mr-4 md:mr-8">
            <div className="text-white px-1 font-semibold sm:mr-2 text-sm sm:text-lg md:text-xl lg:text-2xl">Sales</div>
            <div className="border-b-2 border-white px-2 mx-0 sm:mx-4 text-white flex flex-row sm:w-96 "><i className="fas fa-search mr-2 my-1 text-xs sm:text-sm lg:text-lg"></i><input type="type" value={search}
              onChange={(e) => setSearch(e.target.value)} className=" bg-primary focus:outline-none text-white-50 text-xs sm:text-sm lg:text-lg w-full" />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-screen pb-2">
        <div className="flex flex-row my-1 text-sm sm:text-md  4xl:text-3xl font-roboto font-medium">
          {show ? <input type="date" value={dateInput} onChange={handleDate} className="bg-lightprimary w-full text-center border-r-2 border-white py-1 focus:outline-none" />
            : <div className="bg-lightprimary w-full text-center border-r-2 border-white py-1" onClick={() => { setShow(!show) }}>Select Date</div>}
          <div onClick={openMenu} className="w-full bg-lightprimary text-center  border-l-2 border-white py-1">{item? item:'Select Food Item'}</div>
          {disp && <div className="popup-box">
            <div className=" w-96 mx-auto font-roboto font-bold mt-52 bg-white relative">
              <div className="text-gray-400 text-center cursor-pointer rounded-full w-8 h-8 absolute -top-2 -right-4 bg-white" onClick={() => { setDisp(!disp) }}><span className="text-lg">x</span></div>

              <div className="flex flex-wrap justify-evenly">
                {displayCategory}
              </div>
              <div className="flex flex-wrap justify-evenly">
                {loading ? <Loader /> : displayItems}
              </div>
            </div>
          </div>}
        </div>
        <div className="h-3/5 sm:h-2/3 lg:h-3/5 overflow-y-scroll">
          <table className="w-full font-roboto text-xs sm:text-sm">
            <tr className="bg-lightprimary">
              <th className="text-center border-r-2 border-white ">Date</th>
              <th className="text-center border-r-2 border-white ">Invoice Number</th>
              <th className="text-center border-r-2 border-white">Order ID</th>
              <th className="text-center border-r-2 border-white">Sale Type</th>
              <th className="text-center border-r-2 border-white">Discount Given</th>
              <th className="text-center py-1">Amount</th>
            </tr>
            {orderLoading?<Loader/>:orders}
          </table>
        </div>
        <div className=" flex flex-row md:py-2 text-gray-500 font-roboto text-xs sm:text-md lg:text-lg font-semibold w-full sm:w-4/5 mx-auto bg-secondary md:my-2">
          <div className="w-full flex flex-col px-2">
            <div className="flex flex-row">
              <lable className="w-full mr-2">Total Card Payments</lable>
              <div className="w-full">{totalCard}</div>
            </div>
            <div className="flex flex-row">
              <lable className="w-full mr-2">Total Online Payments</lable>
              <div className="w-full">{totalOnline}</div>
            </div>
            <div className="flex flex-row">
              <lable className="w-full mr-2">Total Cash Payments</lable>
              <div className="w-full">{totalCash}</div>
            </div>

          </div>
          <div className="w-full px-2 md:text-right">
            <div className="flex flex-row w-full">
              <lable className="w-full mr-2 text-right">Total</lable>
              <div className="w-full text-left">{total}</div>
            </div>

          </div>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white" onClick={showMore}>
          {rows? 'Show Less':'Show More'}
        </button>
      </div>
      {showError && (
        <Popup
          content={
            <>
              <p className="pb-4 font-bold text-green">Unable to Load Server</p>
              <button
                className="bg-primary px-10 py-2"
                onClick={() => {
                  setError(false);
                }}
              >
                Try Again
              </button>
            </>
          }
          handleClose={() => {
            setError(false);
          }}
        />
      )}
    </div>
  )
}

export default Sales

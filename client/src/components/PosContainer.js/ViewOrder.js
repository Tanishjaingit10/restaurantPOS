import React, {useState} from 'react'

const ViewOrder = () => {
  const [show, showStatus] = useState(false);
    return (
        <div>
             <div className="h-screen justify-items-conter">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl ">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/pos">
              <i className="fas fa-arrow-left mr-4"></i>
            </a>
          </div>
          <div className="  text-white px-2  font-semibold">
            Order Id: 0231353 | Dine In | Pending | Payment-Completed
          </div>
        </div>
      </nav>
      <div className="flex flex-row h-screen">
        <div className="h-screen border-r-2 border-primary w-1/5 flex flex-col font-roboto py-4">
          <div className="flex flex-col my-2 px-6">
            <label>Order Id</label>
            <p className="text-primary text-lg font-semibold">0231353</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Order Type</label>
            <p className="text-primary text-lg font-semibold">Dine In</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Table No.</label>
            <p className="text-primary text-lg font-semibold">3</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Order Date</label>
            <p className="text-primary text-lg font-semibold">02/08/2021 16:35:37</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Phone</label>
            <p className="text-primary text-lg font-semibold">+91-9856473645</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Email id</label>
            <p className="text-primary text-lg font-semibold">name@gmail.com</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Payment Status</label>
            <p className="text-primary text-lg font-semibold">Completed</p>
          </div>
          <div className="flex flex-col mt-2">
            <label className="px-6">Order Status</label>
            <ul className="bg-primary text-xl mt-2 text-white px-8 font-roboto font-bold">
              <li className="py-4 relative" onClick={()=>{showStatus(!show)}}>Pending<span><i className="fas fa-chevron-down ml-8 cursor-pointer absolute right-0"></i></span></li>
              {show && <>
              <li className="py-4 ">Cancelled</li>
              <li className="py-4">Completed</li>
              </>}
            </ul>
          </div>
          <button className="bg-gray-400 py-4 font-bold font-roboto text-xl">Print Bill</button>
        
        </div>
        <div className="flex flex-col w-4/5 relative">
          <div className="border-b-2 border-primary h-3/4">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="p-2 border-2 bg-lightprimary">Description</th>
                  <th className="p-2 border-2 bg-lightprimary">Quantity</th>
                  <th className="p-2 border-2 bg-lightprimary">Item Price</th>
                  <th className="p-2 border-2 bg-lightprimary">Discount</th>
                  <th className="p-2 border-2 bg-lightprimary">Total</th>
                  
                </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className="bg-secondary py-2 text-center">French Fries</td>
                      <td className="bg-secondary py-2 text-center">3</td>
                      <td className="bg-secondary py-2 text-center">$10.00</td>
                      <td className="bg-secondary py-2 text-center">$2.00</td>
                      <td className="bg-secondary py-2 text-center">$12.00</td>
                      
                  </tr>
              </tbody>
            </table>
          </div>
         
            <button className="bg-green text-white py-4 text-xl w-1/3 font-semibold mt-8 mx-auto">
             <a href="/orders"> Done</a>
            </button>
         
        </div>
      </div>
    </div> 
        </div>
    )
}

export default ViewOrder

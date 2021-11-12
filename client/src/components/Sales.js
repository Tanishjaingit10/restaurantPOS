import React, { useState} from 'react'

const Sales = () => {
    const [search, setSearch] = useState("Search for sale: invoice# / food item / order id");
    const [dateInput, setDateInput] = useState();
    const [show, setShow] = useState(false);

    const handleDate = (e)=> {
        setDateInput(e.target.value)
    }

    return (
        
             <div className="h-screen justify-items-conter ">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/home">
              <i className="fas fa-home font-semibold mr-4"></i>
            </a>
          </div>
          <div className="justify-end  flex flex-row mr-12">
            <div className="text-white px-2 font-semibold mr-6">Sales</div>
            <div className="border-b-2 border-white px-2 mx-6 text-white flex flex-row w-96"><i className="fas fa-search mr-2"></i><input type="type" value={search}
              onChange={(e) => setSearch(e.target.value)} className=" bg-primary focus:outline-none text-white-50 text-sm w-full" />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-screen">
      <div className="flex flex-row my-2 font-roboto font-medium">
        {show ? <input type="date" value={dateInput} onChange={handleDate} className="bg-lightprimary w-full text-center border-r-2 border-white py-1 focus:outline-none"/>
        :<div className="bg-lightprimary w-full text-center border-r-2 border-white py-1" onClick={()=>{setShow(!show)}}>Select Date</div>}
          <div className="w-full bg-lightprimary text-center  border-l-2 border-white py-1">Select Food Item</div>
      </div>
      <div className="h-2/3 overflow-y-scroll"> 
      <table className="w-full font-roboto">
          <tr className="bg-lightprimary">
              <th className="text-center border-r-2 border-white py-1">Date</th>
              <th className="text-center border-r-2 border-white py-1">Invoice Number</th>
              <th className="text-center border-r-2 border-white py-1">Order ID</th>
              <th className="text-center border-r-2 border-white py-1">Sale Type</th>
              <th className="text-center border-r-2 border-white py-1">Discount Given</th>
              <th className="text-center py-1">Amount</th>
          </tr>
          <tr className="bg-secondary">
              <td className="text-center border-r-2 border-white py-1">2021-08-12</td>
              <td className="text-center border-r-2 border-white py-1">5464657</td>
              <td className="text-center border-r-2 border-white py-1">203546</td>
              <td className="text-center border-r-2 border-white py-1">DINE IN</td>
              <td className="text-center border-r-2 border-white py-1">N/A</td>
              <td className="text-center py-1">$465</td>
          </tr>
      </table>
      </div>
      <div className=" flex flex-row px-10 text-gray-500 font-roboto text-md font-semibold w-3/4 mx-auto">
          <div className="w-full">
            <p>Total Card Payments : <span className="ml-10">$5678</span></p>
            <p>Total Card Payments :  <span className="ml-10">$5678</span></p>
            <p>Total Card Payments :  <span className="ml-10">$5678</span></p>
          </div>
          <div className="w-full text-right">
          <p>Total : <span className="ml-10">$5678</span></p>  
          </div>
      </div>
      <button className="text-white bg-green w-96 mx-auto py-2 my-4">Show More</button>
      </div>
        </div>
    )
}

export default Sales

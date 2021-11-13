import React, { useState} from 'react'

const Sales = () => {
    const [search, setSearch] = useState("Search for sale: invoice# / food item / order id");
    const [dateInput, setDateInput] = useState();
    const [show, setShow] = useState(false);

    const handleDate = (e)=> {
        setDateInput(e.target.value)
    }

    return (
        
             <div className="h-screen justify-items-conter overflow-hidden bg-pink">
      <nav className="bg-primary py-2 md:py-4 px-1 mt-0 h-auto w-full top-0">
        <div className="text-center w-full relative">
          <div className=" text-white left-1 absolute sm:left-4">
            <a href="/home">
              <i className="fas fa-home font-semibold mr-2 sm:mr-4 text-sm sm:text-md md:text-lg"></i>
            </a>
          </div>
          <div className="justify-end flex flex-row mr-1 sm:mr-4 md:mr-8">
            <div className="text-white px-1 font-semibold sm:mr-2 text-sm sm:text-md md:text-xl">Sales</div>
            <div className="border-b-2 border-white px-2 mx-0 sm:mx-4 text-white flex flex-row sm:w-96 "><i className="fas fa-search mr-2 my-1 text-xs sm:text-sm md:text-lg"></i><input type="type" value={search}
              onChange={(e) => setSearch(e.target.value)} className=" bg-primary focus:outline-none text-white-50 text-xs sm:text-sm md:text-lg w-full" />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-screen bg-yellow pb-2">
      <div className="flex flex-row my-1 text-sm sm:text-md  4xl:text-3xl font-roboto font-medium">
        {show ? <input type="date" value={dateInput} onChange={handleDate} className="bg-lightprimary w-full text-center border-r-2 border-white py-1 focus:outline-none"/>
        :<div className="bg-lightprimary w-full text-center border-r-2 border-white py-1" onClick={()=>{setShow(!show)}}>Select Date</div>}
          <div className="w-full bg-lightprimary text-center  border-l-2 border-white py-1">Select Food Item</div>
      </div>
      <div className="h-3/5 sm:h-2/3 lg:h-3/5 xl:h-2/3 overflow-y-scroll bg-blue"> 
      <table className="w-full font-roboto text-xs sm:text-sm">
          <tr className="bg-lightprimary">
              <th className="text-center border-r-2 border-white ">Date</th>
              <th className="text-center border-r-2 border-white ">Invoice Number</th>
              <th className="text-center border-r-2 border-white">Order ID</th>
              <th className="text-center border-r-2 border-white">Sale Type</th>
              <th className="text-center border-r-2 border-white">Discount Given</th>
              <th className="text-center py-1">Amount</th>
          </tr>
          <tr className="bg-secondary text-xs sm:text-md  3xl:text-xl">
              <td className="text-center border-r-2 border-white ">2021-08-12</td>
              <td className="text-center border-r-2 border-white ">5464657</td>
              <td className="text-center border-r-2 border-white ">203546</td>
              <td className="text-center border-r-2 border-white ">DINE IN</td>
              <td className="text-center border-r-2 border-white ">N/A</td>
              <td className="text-center py-1">$465</td>
          </tr>
      </table>
      </div>
      <div className=" flex flex-row px-2 sm:px-4 md:py-2 text-gray-500 font-roboto text-xs sm:text-md lg:text-lg font-semibold w-full sm:w-4/5 mx-auto bg-secondary md:my-2">
          <div className="w-full flex flex-col px-2">
              <div className="flex flex-row">
                  <lable className="w-full mr-2">Total Card Payments</lable>
                  <div className="w-full">$6473</div>
              </div>
              <div className="flex flex-row">
                  <lable className="w-full mr-2">Total Online Payments</lable>
                  <div className="w-full">$6473</div>
              </div>
              <div className="flex flex-row">
                  <lable className="w-full mr-2">Total Cash Payments</lable>
                  <div className="w-full">$6473</div>
              </div>

          </div>
          <div className="w-full px-2 md:text-right">
          <div className="flex flex-row w-full">
                  <lable className="w-full mr-2 text-right">Total</lable>
                  <div className="w-full text-left">$6473</div>
              </div>

          </div>
      </div>
      <button className="text-white bg-green w-2/3 sm:w-96 mx-auto py-1 sm:py-2 lg:text-md font-semibold font-roboto 2xl:py-2">Show More</button>
      </div>
        </div>
    )
}

export default Sales

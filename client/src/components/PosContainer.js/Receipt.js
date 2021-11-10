import React from "react";
import Logo from "../../images/logo.jpeg";

const Receipt = () => {
  return (
    <div className="py-8 pb-16 px-16 bg-yellow h-screen">
      <div className="border-2 border-black flex flex-col font-roboto">
        <div className="flex flex-col text-center bg-pink border-b-2 border-black py-2">
          <img className="mx-auto w-36 h-auto my-2" src={Logo} alt="" />
          <div className="font-bold">Cash Memo</div>
          <div>RESTAURANT SALE BILL</div>
        </div>
        <div className="flex flex-row border-black border-b-2 px-8">
          <div className="flex flex-row w-full">
            <label className="font-semibold">Bill No. : </label>
            <p className="ml-6">0213524</p>
          </div>
          <div className="flex flex-row w-full">
            <label className="font-semibold">Date : </label>
            <p className="ml-6">02/11/21</p>
          </div>
        </div>
        <div className="flex flex-col border-black border-b-2 px-8">
          <div className="flex flex-row w-full">
            <label className="font-semibold">KOT No. : </label>
            <p className="ml-6">0213524</p>
          </div>
          <div className="flex flex-row w-full">
            <label className="font-semibold">Remark : </label>
            <p className="ml-6"></p>
          </div>
        </div>
    
        <table>
           <tr className="border-b-2 border-black">
               <th className="w-1/2 border-r-2 border-black col-span-2">Steward</th>
               <th className="w-1/4 border-r-2 border-black col-span-2">Table No.</th>
               <th className="border-r-2 border-black">Time</th>
               <th className="">Person</th>
           </tr>
           <tr className="border-b-2 border-black text-center">
               <td className=" border-r-2 border-black">John</td>
               <td className="border-r-2 border-black">3</td>
               <td className="border-r-2 border-black">18:59</td>
               <td className="">2</td>
           </tr>
           <tr className="border-b-2 border-black text-center bg-gray-500">
               <tr className=" border-r-2 border-black col-span-2 ">
                   <td className="w-1/4 border-r-2 border-black">Sl No.</td>
                   <td className="w-3/4 text-center">Item Name</td>
               </tr>
               <td className="border-r-2 border-black">
               Hello
               </td>
               <td className="border-r-2 border-black">Discount %</td>
               <td className="">Amount</td>
             
           </tr>
        </table>
      </div>
    </div>
  );
};

export default Receipt;

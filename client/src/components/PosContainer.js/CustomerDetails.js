import React, { useEffect, useState} from "react";
import { useParams } from "react-router";

const CustomerDetails = () => {
  const { id } = useParams();
  
  console.log(id)
  const [cust, setCust] = useState({ name: "", contact: "", email: "" });
  const loadCustomer = async () => {
    // console.log(id)
    await fetch(`/app/customer/${id}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        setCust(json);
      });
  };
  useEffect(() => {
    loadCustomer();
  }, [id]);
  return (
    <div className="h-screen justify-items-conter">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl ">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/pos">
              <i className="fas fa-arrow-left mr-4"></i>Back
            </a>
          </div>
          <div className="  text-white px-2  font-semibold">
            Customer Details
          </div>
        </div>
      </nav>
      <div className="flex flex-row h-screen">
        <div className="h-screen border-r-2 border-primary w-1/5 flex flex-col font-roboto py-4">
          <div className="flex flex-col my-2 px-6">
            <label>Name</label>
            <p className="text-primary text-l font-semibold">{cust.name}</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Phone</label>
            <p className="text-primary text-l font-semibold">{cust.contact}</p>
          </div>
          <div className="flex flex-col my-2 px-6">
            <label>Email address</label>
            <p className="text-primary text-l font-semibold">{cust.email}</p>
          </div>
          <div className="bg-primary text-white py-4 my-2 text-xl text-center font-semibold">
            <a href={"/editcustomer/" + id}>Edit</a>
          </div>
        </div>
        <div className="flex flex-col w-4/5 relative">
          <div className="border-b-2 border-primary h-3/4">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="p-2 border-2 bg-lightprimary">S.No.</th>
                  <th className="p-2 border-2 bg-lightprimary">Order Id</th>
                  <th className="p-2 border-2 bg-lightprimary">Type</th>
                  <th className="p-2 border-2 bg-lightprimary">Status</th>
                  <th className="p-2 border-2 bg-lightprimary">Total</th>
                  <th className="p-2 border-2 bg-lightprimary">Date</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                      <td className="bg-secondary py-2 text-center">01</td>
                      <td className="bg-secondary py-2 text-center">020505</td>
                      <td className="bg-secondary py-2 text-center">Take Away</td>
                      <td className="bg-secondary py-2 text-center">Completed</td>
                      <td className="bg-secondary py-2 text-center">$29.50</td>
                      <td className="bg-secondary py-2 text-center flex flex-col">
                          <div>01/24/18</div>
                          <div>20:58:09</div>
                      </td>
                  </tr>
              </tbody>
            </table>
          </div>
         
            <button className="bg-green text-white py-4 text-xl w-1/3 font-semibold mt-8 mx-auto">
             <a href="/pos"> Done</a>
            </button>
         
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;

import React, { useState, useEffect, useContext } from 'react'
import Loader from "./Loader";
import Popup from "./Popup";
const Customers = () => {

  // const [inputValue, setInputvalue] = useState("Search for customer:name / phone number / mail id")
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  let count = 1;
  const getCustomers = async () => {
    await fetch("/app/customers")
      .then((res) => res.json())
      .then((json) =>
        {
          setLoading(false);
          setCustomers(json.filter((option) => {
            if (search === "")
              return option;
            else if (option.contact.toLowerCase().includes(search.toLowerCase()) || option.name.toLowerCase().includes(search.toLowerCase()) || option.email.toLowerCase().includes(search.toLowerCase())) {
              return option;
            }
            return null;
          })
            .map((option) => {
              return (<tr className="font-medium">
                <td className="bg-secondary py-2 text-center border-2">{count++}</td>
                <td className="bg-secondary py-2 text-center border-2">{option.name}</td>
                <td className="bg-secondary py-2 text-center border-2">{option.date.toLocaleString().split('T')[0]}</td>
                <td className="bg-secondary py-2 text-center border-2">{option.contact}</td>
                <td className="bg-secondary py-2 text-center border-2">{option.email}</td>
              </tr>)
            }))
        }
        ).catch((err) => {
          setLoading(false);
          console.log("1", err);
          setOpen(!open);
        });
  }
  useEffect(() => {
    getCustomers()
  }, [customers])

  return (
    <div className="h-screen justify-items-conter overflow-hidden">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/home">
              <i className="fas fa-home font-semibold mr-4"></i>
            </a>
          </div>
          <div className="justify-end  flex flex-row mr-12">
            <div className="text-white px-2 font-semibold mr-8">Customers</div>
            <div className="border-b-2 border-white px-4 mx-6 text-white flex flex-row w-96"><i class="fas fa-search mr-2"></i><input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className=" bg-primary focus:outline-none text-white text-sm w-full" />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-screen">
        <div className="h-3/4 overflow-y-scroll">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="p-2 border-2 bg-lightprimary">Sl.No.</th>
                <th className="p-2 border-2 bg-lightprimary">Customer Name</th>
                <th className="p-2 border-2 bg-lightprimary">Date</th>
                <th className="p-2 border-2 bg-lightprimary">Phone Number</th>
                <th className="p-2 border-2 bg-lightprimary">Email Address</th>
              </tr>
            </thead>
            <tbody>
              {loading?<Loader/>:customers}
            </tbody>
          </table>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white">Show More</button>
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
  )
}

export default Customers

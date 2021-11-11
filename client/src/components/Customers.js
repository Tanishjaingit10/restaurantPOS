import React, { useState, useEffect } from 'react'
let customers = []
const Customers = () => {

  const [inputValue, setInputvalue] = useState("Search for customer:name / phone number / mail id")
  const [cust, setCust] = useState()
  const [search, setSearch] = useState("");

  const custList = async (e) => {
    await fetch('/app/customers').then((res) => res.json())
      .then((json) => {
        customers = json;
        let count = 1;
        setCust(
          customers.filter((option) => {
            if (search === "")
              return option;
            else if (option.contact.includes(search)) {
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
            })
        )
      })
  }

  useEffect(() => {
    custList()
  }, [search, customers])

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
              {cust}
            </tbody>
          </table>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white">Show More</button>
      </div>
    </div>
  )
}

export default Customers

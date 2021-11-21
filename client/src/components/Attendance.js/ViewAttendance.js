import React, {useState,useEffect} from 'react'
import Loader from "../Loader";

const ViewAttendance = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    let count =1;
    await fetch("/app/users")
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        if (json !== "undefined") {
          setUsers(
            json.filter((option) => {
                if (search === "") return option;
                else if (option.email_id.toString().includes(search)) {
                  return option;
                }
                return null;
              })
              .map((option) => {
                return (
                  <tr className="">
                <th className="p-2 border-2 bg-lightprimary">{count++}</th>
                <th className="p-2 border-2 bg-lightprimary">{option.fullName}</th>
                <th className="p-2 border-2 bg-lightprimary">{option.email_id}</th>
                <th className="p-2 border-2 bg-lightprimary">{option.attendence.date}</th>
                <th className="p-2 border-2 bg-lightprimary">{option.attendence.checkinTime}</th>
                <th className="p-2 border-2 bg-lightprimary">{option.attendence.checkoutTime}</th>
              </tr>
                )}))}}).catch((err) => {
                  setLoading(false);
                  console.log("1", err);
                  // setOpen(!open);
                });
  }
  useEffect(() => {
    // setLoading(!loading);
    getUsers();
  }, [users]);
  return (
    <div className="h-screen justify-items-conter">
      <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/attendance">
              <i className="fas fa-arrow-left font-semibold mr-4" />
              Back
            </a>
          </div>
          <div className="justify-end  flex flex-row mr-12">
            <div className="text-white px-2 font-semibold mr-8">
              View Attendance
            </div>
            <div className="border-b-2 border-white px-4 mx-6 text-white flex flex-row w-80">
              <i className="fas fa-search mr-4"></i>
              <input
                type="type"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" bg-primary focus:outline-none text-white text-sm w-full"
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col h-screen">
        <div className="h-3/4 overflow-y-scroll">
          <table className="w-full">
            <thead className="relative">
              <tr className="">
                <th className="p-2 border-2 bg-lightprimary">Sl.No.</th>
                <th className="p-2 border-2 bg-lightprimary">Name</th>
                <th className="p-2 border-2 bg-lightprimary">ID</th>
                <th className="p-2 border-2 bg-lightprimary">Date</th>
                <th className="p-2 border-2 bg-lightprimary">Checked In</th>
                <th className="p-2 border-2 bg-lightprimary">Checked Out</th>
              </tr>
            </thead>
            <tbody className="w-full">{loading?<Loader/>:users}</tbody>
          </table>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white">
          Show More
        </button>
        <button className="bg-gray-400 my-2 hover:bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white">
          Print
        </button>
      </div>

      {/* {open && (
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
      )} */}
    </div>
  );
};

export default ViewAttendance;

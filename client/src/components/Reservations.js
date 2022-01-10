import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Popup from "./Popup";
import Table from 'react-tailwind-table';
import CustomButton from "../items/CustomButton";
// import 'react-tailwind-table/dist/index.css';


const Reservations = () => {
  // const [inputValue, setInputvalue] = useState("Search for order or serial no.")
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  let count = 1;
  var todayDate = new Date()
  todayDate = todayDate.toISOString().split('T')[0]
  const getOrders = async () => {
    await fetch("/app/orders")
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        if (json !== "undefined") {
          setOrders(
            json.filter((option) => {
                
                if(option.payment.orderStatus==='Reserved')
                {
                    if (search === "") return option;
                    else if (option.order_id.toString().includes(search)) {
                      return option;
                    }
                    return null;
                }
                
              })
              .map((option) => {
                return (
                  <tr className="font-medium">
                    <td className="bg-secondary py-2 text-center border-2">
                      {count++}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.order_id}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.payment.orderType}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.payment.orderStatus}
                    </td>
                    <td className="bg-secondary py-2 text-center border-2">
                      {option.payment.total}
                    </td>
                    <td className="bg-secondary py-2 text-center flex flex-col">
                      <div>{option.time.toLocaleString().split("T")[0]}</div>
                      <div>
                        {
                          option.time
                            .toLocaleString()
                            .split("T")[1]
                            .split(".")[0]
                        }
                      </div>
                    </td>
                  </tr>
                );
              })
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("1", err);
        setOpen(!open);
      });
  };
  useEffect(() => {
    getOrders();
  }, [orders]);
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
            <div className="text-white px-2 font-semibold mr-8">Total Reservations</div>
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
                <th className="p-2 border-2 bg-lightprimary">S.No.</th>
                <th className="p-2 border-2 bg-lightprimary">Order Id</th>
                <th className="p-2 border-2 bg-lightprimary">Type</th>
                <th className="p-2 border-2 bg-lightprimary">Status</th>
                <th className="p-2 border-2 bg-lightprimary">Total</th>
                <th className="p-2 border-2 bg-lightprimary">Date</th>
              </tr>
            </thead>
            <tbody className="w-full">{loading?<Loader/>:orders}</tbody>
          </table>
        </div>
        <button className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white">
          Show More
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

// export default Reservations;



const AllReservations = () => {
	const [allReservations, setAllReservations] = useState([])
  const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(0);
	const [pageLimit, setPageLimit] = useState(10);
  
	useEffect(() => {
		fetch("/app/allReservations")
    .then((res) => res.json())
    .then((json) => {
			console.log(json)
			setAllReservations(json)
			setLoading(false);
    })
    .catch((err) => {
        console.log(err);
    })
		
	}, [])

	const deleteReservations = (reservationId) => {
		console.log(reservationId)
		// fetch("/app/removeReservation", {
    //   method: "POST",})
		fetch(`app/removeReservation/${reservationId}`, {method: "DELETE"})
    .then((res) => res.json())
    .then((json) => {
			console.log(json)
			alert(json.message)
    })
    .catch((err) => {
        console.log(err);
    })
	}

	const editReservations = (reservationId) => {
		console.log(reservationId)

	}

	const columns = [
		{
			field: "date",
			use: "Date",
		},
		{
			field: "start_time",
			use: "Start Time",
		},
		{
			field: "end_time",
			use: "End Time",
		},
		{
			field: "table",
			use: "Table No./ Name",
		},
		{
			field: "fullName",
			use: "Customer Name",
		},
		{
			field: "contact",
			use: "Phone",
		},
		{
			field: "email_id",
			use: "Email ID",
		},
		{
			field: "actions",
			use: "Actions",
		},

	];

	return (
		<div class="flex flex-col ">
			<div class="my-2 overflow-x-auto">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table class="min-w-full divide-y divide-x divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking-wider border">
											Date
									</th>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking border">
											Start Time
									</th>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking border">
											End Time
									</th>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking border">
										Table No./ Name
									</th>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking border">
										Customer Name
									</th>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking border">
										Phone
									</th>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking border">
										Email ID
									</th>
									<th scope="col" class="px-6 py-6 text-center text-xl font-extrabold text-white tracking border">
										Action
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{ 
									allReservations.map(reservation => {
										return (
										<tr>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">{reservation.date.split('T')[0]}</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">{reservation.start_time}</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">{reservation.end_time}</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">{reservation.table}</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">{reservation.fullName}</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">{reservation.contact}</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">{reservation.email_id}</div>
											</td>
											<td class="px-6 py-3 whitespace-nowrap border">
												<div class="text-sm text-gray-900">
													<CustomButton title="Cancel" onClick={() => deleteReservations(reservation._id)}/>
													<CustomButton title="Edit" onClick={() => editReservations(reservation._id)}/>
												</div>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
  
}

export default AllReservations;


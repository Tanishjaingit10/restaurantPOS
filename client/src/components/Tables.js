import React, { useState, useEffect, useContext } from "react";
import Popup from "./Popup";
import Loader from "./Loader";
import Logo from "../images/logo.jpeg";
import { ThemeContext } from "../context/Theme";
import CustomButton from "../items/CustomButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { useHistory } from 'react-router-dom';

// import TimePicker from 'react-times';

let arr = new Array(1000000).fill(false);
let order = [];
const Tables = () => {
  const [displayTable, setDisplayTable] = useState();
  const [check, setCheck] = useState(false);
  const [Open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
	const [newReservation, setNewReservation] = useState({});
	const [startDate, setStartDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
  const history = useHistory();


  const theme = useContext(ThemeContext);

	const submitNewReservation = () => {
		console.log('Saving new reservation', newReservation)
		fetch(`/app/addReservation`, {
			method: "POST",
			headers: {
					"Content-Type": "application/json"
			},
			body: JSON.stringify(newReservation)
		})
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert('Reservation created successfully');
			}
		})
	}


  const showDetails = async (index, obj) => {
    console.log(index);
    arr[index] = !arr[index];
    console.log(arr[index]);
    if (arr[index]) {
      arr = arr.map((x) => false);
      arr[index] = true;
      await fetch(`/app/order/${obj.number}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.order) order = json;
          else order = [];
        });
    } else order = [];
    console.log(order.order);
  };

  let code;
  const deleteTable = async () => {
    await fetch(`/app/removeTable/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
    setOpen(!Open);
    setCheck(!check);
    loadTables();
  };

  const delCheck = (e) => {
    setId(e.target.value);
    setCheck(!check);
  };

  const loadTables = async () => {
    await fetch("/app/table")
      .then((res) => res.json())
      .then((json) => {
        if (json !== "undefined") {
          setDisplayTable(
            json.map((obj, index) => {
              setLoading(false);
              if (index % 3 === 0) code = theme.backgroundColor;
              // else if (index % 3 === 1) code = theme.backgroundColor;
              else code = theme.tableBackground;
              return (
                <div
                  className={
                    arr[index]
                      ? "shadow-lg flex flex-col w-96 mx-4 mb-4"
                      : "flex flex-col w-14 rounded-lg "
                  }
                >
                  <i
                    style={{ color: theme.backgroundColor }}
                    className="far fa-trash relative top-0 -left-5 text-black"
                  />
                  <div
                    className="flex flex-col text-white p-4 text-lg font-roboto"
                    style={{ backgroundColor: code }}
                  >
                    <div className="relative font-semibold">
                      <h3 className="text-center ">{obj.number}</h3>
                    </div>
                  </div>

                  {arr[index] ? (
                    order.order ? (
                      <div className=" flex flex-col -mt-4 font-roboto">
                        <div className="flex flex-row px-6">
                          <div className="flex flex-col w-full">
                            {order.order.map((obj) => {
                              console.log(order);
                              return (
                                <div className="flex flex-col w-full py-2">
                                  <div className="text-xl font-semibold">
                                    {obj.fullName}
                                  </div>
                                  {obj.orderedVariant.map((extra) => {
                                    return (
                                      <>
                                        <div className="text-md text-gray-400 font-medium">
                                          1 x {extra.variant}
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                          <div
                            className="flex flex-col w-full text-right"
                            style={{ color: code }}
                          >
                            <div className="py-2 font-bold text-xl"></div>
                            <div className="py-2 font-bold text-xl">
                              ETA:00:05:00
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label className="">Order Id</label>
                          <div className="text-primary">{order.order_id}</div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Customer Name</label>
                          <div className="text-primary">
                            {order.customer.name}
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Phone</label>
                          <div className="text-primary">
                            {order.customer.contact}
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Email</label>
                          <div className="text-primary">
                            {order.customer.email}
                          </div>
                        </div>
                        <div className="flex flex-col px-6 font-bold">
                          <label>Payment Status</label>
                          <div className="text-primary">
                            {order.payment.status}
                          </div>
                        </div>
                        <button className="bg-green py-2 text-white font-roboto font-semibold text-lg">
                          Mark as Completed
                        </button>
                      </div>
                    ) : (
                      <div className="bg-green py-2 text-white font-roboto font-semibold text-lg text-center">
                        Reserve
                      </div>
                    )
                  ) : null}
                </div>
              );
            })
          );
        }
      });
  };

  useEffect(() => {
    loadTables();
  });


  return (
    <div className="">
      <nav
        style={{ backgroundColor: theme.backgroundColor }}
        className="bg-red px-1 mt-0 h-auto w-full top-0 text-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink md:w-1/3 items-center justify-center md:justify-start text-white ml-4">
            <a href="/home">
              <i className="fas fa-bars font-semibold"></i>
            </a>
            <img src={Logo} className="w-16 h-16 ml-10" />
          </div>
          <button
            color={theme.backgroundColor}
            className="bg-white text-lg py-2 px-8 rounded-md mr-4"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-row justify-between items-center h-20 px-10 border-b-2 border-gray-300">
        <h2 className="font-semibold">Table View</h2>
        <div className="flex flex-row items-center">
          <CustomButton title="Actions" onClick={() => history.push('/reservations')} />
          <CustomButton title="Take Away" />
          <CustomButton title="- Delete Table" />
          <CustomButton title="+ Add Table" />
        </div>
      </div>
      <div className="mt-5 ml-10">
        <CustomButton title="+ Table Reservation" onClick={() => setShowModal(true)}/>
      </div>
			{
				showModal ? 
				<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
						<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
										<div class="mb-4">
											<label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Customer Name
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, fullName : value.target.value}))} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Customer Name"/>
										</div>
										<div class="mb-4">
											<label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Email Id
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, email_id : value.target.value}))} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Email Id"/>
										</div>
										<div class="mb-4">
											<label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Phone Number
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, contact : value.target.value}))} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Phone Number"/>
										</div>
										<div class="mb-2">
											<label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Date
											</label>
										</div>
										<DatePicker selected={startDate} onChange={(date) => {setStartDate(date); setNewReservation((newReservation) => ({...newReservation, date: date.toISOString()}))}} />
										<div class="my-4">
											<MuiPickersUtilsProvider utils={MomentUtils}>
												<TimePicker
													clearable
													ampm={false}
													label="Start Time"
													value={startTime}
													onChange={(value) => {setStartTime(value); setNewReservation((newReservation) => ({...newReservation, startTime: value.format('HH:mm:ss')}))}}
												/>
												</MuiPickersUtilsProvider>
										</div>
										<div class="my-4">
											<MuiPickersUtilsProvider utils={MomentUtils}>
												<TimePicker
													onChange={(value) => {setEndTime(value); setNewReservation((newReservation) => ({...newReservation, endTime: value.format('HH:mm:ss')}))}}
													value={endTime}
													clearable
													ampm={false}
													label="End Time"
												/>
												</MuiPickersUtilsProvider>
										</div>
										<div class="bg-gray-50 justify-center content-center">
											<CustomButton title="Done" onClick={() => {submitNewReservation(); setShowModal(false)}}/>
										</div>
									</form>
							</div>
						</div>
					</div>
				</div>
					: null
			}

      <div className="flex flex-col">
        <h2 className="my-5 ml-11 font-semibold text-gray-600 text-lg">
          Hall Way
        </h2>
        <div className="flex flex-wrap p-8 w-full justify-evenly">
          {loading ? <Loader /> : displayTable}
        </div>
        {/* Add Table  */}
      </div>
      {check && (
        <Popup
          content={
            <>
              <p className="font-bold text-green">
                Please confirm to delete the category?
              </p>
              <button
                className="mt-10 bg-primary px-10 py-2"
                onClick={deleteTable}
              >
                Confirm
              </button>
            </>
          }
          handleClose={() => {
            setCheck(!check);
          }}
        />
      )}
      {Open && (
        <Popup
          content={
            <>
              <p className="font-bold text-green">Deleted Successfully</p>
              <button
                className="mt-10 bg-primary px-10 py-2"
                onClick={() => {
                  setOpen(!Open);
                }}
              >
                Ok
              </button>
            </>
          }
          handleClose={() => {
            setOpen(!Open);
          }}
        />
      )}
    </div>
  );
};

export default Tables;

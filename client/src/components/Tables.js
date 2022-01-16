import React, { useState, useEffect, useContext } from "react";
import Popup from "./Popup";
import Loader from "./Loader";
import Logo from "../images/logo.jpeg";
import { ThemeContext } from "../context/Theme";
import CustomButton from "../items/CustomButton";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {ThemeProvider} from "@material-ui/styles";
import MomentUtils from '@date-io/moment';
import { useHistory } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';
import {createTheme} from "@material-ui/core";
import { GrClose } from 'react-icons/gr';

// import TimePicker from 'react-times';
import Modal from "react-modal";
import CustomNavBar from "../items/CustomNavBar";

let arr = new Array(1000000).fill(false);
let order = [];

var today = new Date();
var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var currDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const Tables = () => {
	const [componentLoading, setComponentLoading] = useState(false)
  const [displayTable, setDisplayTable] = useState();
  const [check, setCheck] = useState(false);
  const [Open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
	const [availableTables, setAvailableTables] = useState([])
	const [reservationByTime, setReservationByTime] = useState([])
	const [allTables, setAllTables] = useState([])
	const [startDate, setStartDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [newReservationSuccess, setNewReservationSuccess] = useState(false);
	const [newReservation, setNewReservation] = useState({startTime: new Date().toISOString().split('T')[1].split('.')[0], endTime: new Date().toISOString().split('T')[1].split('.')[0], date: new Date().toISOString().split('T')[0]});
  const [position, setPosition] = useState("");
  const [tableName, setTableName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);const history = useHistory();

	const submitNewReservation = () => {
		setComponentLoading(true)
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
				setNewReservationSuccess(true)
			}
			setComponentLoading(false)
		})
		.catch((err) => {
			console.log(err);
			setComponentLoading(false)
		})
	}

	const addTable = () => {
		setComponentLoading(true)
		fetch(`/app/addTable`, {
			method: "POST",
			headers: {
					"Content-Type": "application/json"
			},
			body: JSON.stringify({
				number: tableName,
				capacity: maxCapacity,
			})
		})
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert('table added')
			}
			setComponentLoading(false)
		})
		.catch((err) => {
			console.log(err);
			setComponentLoading(false)
		})
	}

    
	const getTablesAvailables = () => {
		fetch(`/app/getAvailableTable`)
		.then((res) => res.json())
        .then((json) => {
			console.log(json);
			if (json.status === 200) {
				setAvailableTables(json)
			}
		})
	}

	const getReservationByTime = () => {
		setComponentLoading(true)
		fetch(`/app/getReservationByTime/${newReservation.date}/${newReservation.startTime}/${newReservation.endTime}`)
    .then((res) => res.json())
    .then((json) => {
			console.log(json)
			var tableList = []
			var reservedTable = []
			for (var i = 0; i < json.length; i++) {
				reservedTable.push(json[i].table)
			}
			console.log(reservedTable, "reservedTable")
			var availableTables = allTables.filter(function(obj) { return reservedTable.indexOf(obj) === -1; });
			console.log(availableTables, 'available table')
			setReservationByTime(tableList)
		setComponentLoading(false)
	})
    .catch((err) => {
        console.log(err);
		setComponentLoading(false)
	})
	}

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const theme = useContext(ThemeContext);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

	const materialTheme = createTheme({
		overrides: {
			
			MuiFormControl: {
        root: {
            width: '100%',
        }
    	},
				MuiPickersToolbar: {
					toolbar: {
							backgroundColor: theme.backgroundColor,
					},
				},
				MuiPickersCalendarHeader: {
						switchHeader: {
								backgroundColor: "white",
								color: theme.backgroundColor,
						},
				},
				MuiPickersDay: {
					root: {
						color: theme.backgroundColor,
						"&$disabled": {
							color: theme.backgroundColor,
						},
						"&$selected": {
							backgroundColor: theme.backgroundColor,
						},
					},
					today: {
						color: theme.backgroundColor,
					},
				},
				MuiPickersModalDialog: {
					dialogAction: {
						color: theme.backgroundColor,
					},
				},
				MuiOutlinedInput: {
					root: {
						"& $notchedOutline": {
							borderColor: theme.backgroundColor,
							borderWidth: "1px",
						},
						"&:hover $notchedOutline": {
							borderColor: theme.backgroundColor,
							borderWidth: "1px",
						},
						"&$focused $notchedOutline": {
							borderColor: theme.backgroundColor,
							borderWidth: "1px",
						},
				},
				input: {
					borderColor: theme.backgroundColor,
				},
			},
			MuiInputBase: {
				root: {
					backgroundColor: theme.backgroundColor,
					color: 'white',
					padding: '10px',
					borderRadius: '5px'
				}
			}
		},
	});

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
					setAllTables(json)
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
                  <i className="far fa-trash relative top-0 -left-5 text-black" />
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
      <CustomNavBar />
			{ componentLoading ?
			<Loader /> : null }
      <div className="flex flex-row justify-between items-center h-20 px-10 border-b-2 border-gray-300">
        <h2 className="font-semibold">Table View</h2>
        <div className="flex flex-row items-center">
          <div
            style={{ backgroundColor: theme.backgroundColor }}
            className="text-white py-2 px-2 rounded-md mx-2"
          >
            <i><FiRefreshCcw size={22}/></i>
          </div>
          <CustomButton
            title="Actions"
            customStyle={{ backgroundColor: theme.backgroundColor }}
            onPress={() => {history.push('reservations')}}
          />
          <CustomButton
            title="Take Away"
            customStyle={{ backgroundColor: "yellow" }}
          />
          <CustomButton
            title="- Delete Table"
            customStyle={{ backgroundColor: theme.backgroundColor }}
          />
          <CustomButton
            title="+ Add Table"
            customStyle={{ backgroundColor: "green" }}
            onPress={() => openModal()}
          />

          {/* Modal for Add Table  */}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2
              style={{ color: theme.backgroundColor }}
              className="text-lg font-bold text-center mb-4"
            >
              Add New Table
            </h2>
            <form>
              <select
                name="position"
                className="p-2  border-2 w-full text-md rounded-lg text-white font-thin mb-4"
                style={{ backgroundColor: theme.backgroundColor }}
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              >
                <option className="bg-gray-300 border-black border-2 p-2">
                  Mark Table By Name
                </option>
                <option className="bg-gray-300 border-black border-2 p-2">
                  Mark Table By Number
                </option>
              </select>
              <input
                name="tableName"
                placeholder="Enter Table Name"
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className={
                  "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                }
              />
              <input
                name="maxCapacity"
                placeholder="Enter Max Capacity"
                type="text"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className={
                  "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                }
              />
              <div className="w-1/2  m-auto">
                <button
                  style={{ backgroundColor: theme.backgroundColor }}
                  className="text-center w-full m-auto py-3 rounded-xl text-white font-medium text-xl focus:outline-none"
                  value="Add Table"
                  type="submit"
                  onClick={() => {closeModal(false); addTable()}}
                >
                  Done
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
      <div className="mt-5 ml-10">
        <CustomButton title="+ Table Reservation" customStyle={{ backgroundColor: theme.backgroundColor }} onPress={() => setShowModal(true)}/>
      </div>
			{
				showModal ? 
				<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div class="fixed inset-0 bg-opacity-25 transition-opacity" aria-hidden="true"></div>
						<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="">
									<div className="w-full flex justify-end">
										<GrClose onClick={() => setShowModal(false)}/>
									</div>
									<div className="w-full flex items-center justify-center">
										<h3 className="text-3xl font-bold" style={{color: theme.backgroundColor}}>Reserve Table</h3>
									</div>
								</div>
									<form class="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full">
										<div class="mb-4">
											<label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Customer Name
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, fullName : value.target.value}))} class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Customer Name"/>
										</div>
										<div class="mb-4">
											<label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Email Id
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, email_id : value.target.value}))} class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Email Id"/>
										</div>
										<div class="mb-4">
											<label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Phone Number
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, contact : value.target.value}))} class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Phone Number"/>
										</div>
										<div className="my-5 w-full">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<ThemeProvider theme={materialTheme}>
												<DatePicker
													InputProps={{
														disableUnderline: true
													}}
													label="Date"
													value={startDate}
													onChange={(date) => {setStartDate(date); setNewReservation((newReservation) => ({...newReservation, date: date.toISOString().split('T')[0]}))}} 
												/>
											</ThemeProvider>
										</MuiPickersUtilsProvider>
									</div>
									<div className="my-5 w-full">
										<MuiPickersUtilsProvider utils={MomentUtils}>
										<ThemeProvider theme={materialTheme}>
										<TimePicker
											InputProps={{
													disableUnderline: true
												}}
											clearable
											ampm={false}
											label="Start Time"
											value={startTime}
											onChange={(value) => {setStartTime(value); setNewReservation((newReservation) => ({...newReservation, startTime: value.format('HH:mm:ss')}))}}
										/>
										</ThemeProvider>
											</MuiPickersUtilsProvider>
									</div>
									<div className="my-5 w-full">
										<MuiPickersUtilsProvider utils={MomentUtils}>
										<ThemeProvider theme={materialTheme}>
										<TimePicker
												InputProps={{
														disableUnderline: true
													}}
													onChange={(value) => {getReservationByTime(); setEndTime(value); setNewReservation((newReservation) => ({...newReservation, endTime: value.format('HH:mm:ss')}))}}
													value={endTime}
												clearable
												ampm={false}
												label="End Time"
											/>
										</ThemeProvider>
											</MuiPickersUtilsProvider>
									</div>
										<div class="flex justify-center mt-8">
											<CustomButton title="Done"  customStyle={{ backgroundColor: theme.backgroundColor }} onPress={() => {submitNewReservation(); setShowModal(false)}}/>
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
                Okay
              </button>
            </>
          }
          handleClose={() => {
            setOpen(!Open);
          }}
        />
      )}
			{newReservationSuccess && (
        <Popup
          content={
            <>
              <p className="font-bold text-green text-xl">
                Table reservation created!
              </p>
              <button
                className="mt-10 bg-primary px-10 py-2 shadow-lg"
                onClick={() => setNewReservationSuccess(!newReservationSuccess)}
              >
                Okay
              </button>
            </>
          }
          handleClose={() => {
            setNewReservationSuccess(!newReservationSuccess);
          }}
        />
      )}
    </div>
  );
};

export default Tables;

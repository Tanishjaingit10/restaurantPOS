import React, { useState, useEffect, useContext, useRef } from "react";
import Loader from "./Loader";
import Popup from "./Popup";
import Table from 'react-tailwind-table';
import CustomButton from "../items/CustomButton";
import { ThemeContext } from "../context/Theme";
// import 'react-tailwind-table/dist/index.css';
import CustomNavBar from "../items/CustomNavBar";
// import DatePicker from "react-datepicker";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {ThemeProvider} from "@material-ui/styles";
import MomentUtils from '@date-io/moment';
import { GrClose } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import {createTheme} from "@material-ui/core";
import Select, { StylesConfig } from 'react-select';
import { FiRefreshCcw } from 'react-icons/fi';
import '../styles//paginagtion.css';


const AllReservations = () => {
	const [allReservations, setAllReservations] = useState([])
	const [editReservation, setEditReservation] = useState({})
	const [editReservationModal, setEditReservationModal] = useState(false)
	const [editReservSuccess, setEditReservationSuccess] = useState(false)
	const [warnDeleteReserve, setWarnDeleteReserve] = useState(false)
	const [deleteReservSuccess, setDeleteReservSuccess] = useState(false)
	const [availableTables, setAvailableTables] = useState([])
	const [showDate, setShowDate] = useState(false)
	const [startDate, setStartDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [reload, setReload] = useState(false)
  const theme = useContext(ThemeContext);

	var currDate = new Date()
  
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
		
	}, [reload])

	const materialTheme = createTheme({
		overrides: {
			
			MuiFormControl: {
        root: {
            width: '100%',
        }
    	},
				MuiPickersToolbar: {
					root: {
						width: '100%',
					},
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
		fetch(`/app/getReservationByTable/${startDate}/${startTime}/${endTime}`)
    .then((res) => res.json())
    .then((json) => {
			console.log(json)
			setAllReservations(json)
    })
    .catch((err) => {
        console.log(err);
    })
	}

	const getReservationByTable = (table) => {
		fetch(`/app/getReservationByTable/${table}`)
    .then((res) => res.json())
    .then((json) => {
			console.log(json)
			setAllReservations(json)
    })
    .catch((err) => {
        console.log(err);
    })
	}

	const getDayReservations = (date) => {
		setLoading(true);
		fetch(`/app/getReservationsDate/${date}`)
    .then((res) => res.json())
    .then((json) => {
			console.log(json)
			setAllReservations(json)
			setLoading(false);
    })
    .catch((err) => {
        console.log(err);
    })
	}

	const deleteReservations = (reservationId) => {
		console.log(reservationId)
		fetch(`app/removeReservation/${reservationId}`, {method: "DELETE"})
    .then((res) => res.json())
    .then((json) => {
			console.log(json)
			setDeleteReservSuccess(true)
			setReload(!reload)
    })
    .catch((err) => {
        console.log(err);
    })
	}

	const editReservations = () => {
		console.log(editReservation)
		fetch(`/app/editReservation/${editReservation._id}`, {
			method: "PUT",
			headers: {
					"Content-Type": "application/json"
			},
			body: JSON.stringify(editReservation)
		})
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				setEditReservationSuccess(true)			
			}
			setReload(!reload)
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const options = [
		{ value: 10, label: '10' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' },
		{ value: 200, label: '200' }
	]

	const selectCustomeStyle = {
	}

	return (
		<div>
		<CustomNavBar />
		<div className="flex flex-col w-full">
			<div className="my-2 overflow-x-auto">
				<div className="py-2 align-middle inline-block min-w-full px-5">
					<div className="py-4 inline-block w-full">
						<div className="inline-block w-1/2">
							<h1 className="text-lg inline-block font-bold text-gray-600">Actions</h1>
							<div className="inline-block mx-5 rounded relative w-2/3">
								<input onChange={(value) => {getReservationByTable(value.target.value)}} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search for table no."/>
								<GoSearch size={25} className="absolute inline-block mt-4 -ml-8" color="#a5a5a5d1"/>
							</div>
						</div>
						<div className="inline-block w-1/2">
							<div className="flex flex-row items-center justify-end">
								<CustomButton
									title="Select Date"
									customStyle={{ backgroundColor: theme.backgroundColor }}
									onPress={() => {setShowDate(true)}}
								/>
								{ 
									showDate ? 
									<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
										<div className="flex items-end justify-center min-h-screen pt-4 px-8 pb-20 text-center sm:block sm:p-0">
											<div className="fixed inset-0 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
											<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
											<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
												<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
													<div className="">
														<div className="w-full flex justify-end mb-5">
															<GrClose onClick={() => setShowDate(false)}/>
														</div>
														<MuiPickersUtilsProvider utils={DateFnsUtils}>
															<ThemeProvider theme={materialTheme}>
																<DatePicker
																	InputProps={{
																		disableUnderline: true,
																	}}
																	variant="static"
																	label="Date"
																	value={startDate}
																	onChange={(date) => {getDayReservations(date.toISOString().split('T')[0]); setShowDate(false)}} 
																/>
															</ThemeProvider>
														</MuiPickersUtilsProvider>
													</div>
												</div>
											</div>
										</div>
									</div>
								: null
							}
								<CustomButton
									title="Tomorrow"
									customStyle={{ backgroundColor: theme.backgroundColor }}
									onPress={() => {getDayReservations(new Date())}}
								/>
								<CustomButton
									title="Today"
									customStyle={{ backgroundColor: theme.backgroundColor }}
									onPress={() => {getDayReservations(new Date().toISOString().split('T')[0])}}
								/>
							</div>
						</div>
					</div>
					<hr/>
					<div className="shadow overflow-hidden border-t border-gray-200 sm:rounded-lg mt-8">
						<div className="inline-block w-1/2 my-4">
							<h1 className="text-lg inline-block ml-8">Display</h1>
							<div style={{width: '150px'}} className="inline-block mx-5 rounded">
								<Select
									defaultValue={options[0]}
									options={options}
									styles={selectCustomeStyle}
									onChange={(value) => setPageLimit(value.value)}
								/>
							</div>
							<h1 className="text-lg inline-block">Records</h1>
						</div>
						<div className="inline-block w-1/2 my-4">
							<div className="flex flex-row items-center justify-end">
								<div
									style={{ backgroundColor: theme.backgroundColor }}
									className="text-white py-2 px-2 rounded-md mx-2 shadow-md"
								>
									<i onClick={() => setReload(!reload)}><FiRefreshCcw size={22}/></i>
								</div>
								<CustomButton
									title="Print"
									customStyle={{ backgroundColor: theme.backgroundColor }}
								/>
								<CustomButton
									title="Download"
									customStyle={{ backgroundColor: theme.backgroundColor }}
								/>
							</div>
						</div>
						<table className="min-w-full divide-y divide-x divide-gray-200">
							<thead style={{ backgroundColor: theme.backgroundColor }}>
								<tr>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking-wider border">
											Date
									</th>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking border">
											Start Time
									</th>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking border">
											End Time
									</th>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking border">
										Table No. /<br/>Name
									</th>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking border">
										Customer Name
									</th>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking border">
										Phone
									</th>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking border">
										Email ID
									</th>
									<th scope="col" className="px-6 py-2 text-center text-xl font-semibold text-white tracking border">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{ 
									loading ? <Loader /> :
									allReservations.slice((pageNumber - 1)*pageLimit, ((pageNumber - 1)*pageLimit + pageLimit)).map(reservation => {
										return (
										<tr>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{reservation.date.split('T')[0]}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{reservation.start_time}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{reservation.end_time}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{reservation.table}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{reservation.fullName}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{reservation.contact}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{reservation.email_id}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">
													<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14 }} title="Cancel" onPress={() => {setWarnDeleteReserve(true); setEditReservation(reservation)}}/>
													<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14 }} title="Edit" onPress={() => {setEditReservationModal(true); setEditReservation(reservation); setStartDate(new Date(reservation.date)); setStartTime(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), reservation.start_time.split(':')[0], reservation.start_time.split(':')[1], reservation.start_time.split(':')[2] )); setEndTime(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), reservation.start_time.split(':')[0], allReservations[0].start_time.split(':')[1], reservation.start_time.split(':')[2] )) }}/>
												</div>
											</td>
										</tr>
									)
								})
								}
							</tbody>
						</table>
					</div>
					<div className="flex items-end justify-end my-8">
						<div className="mt-8">
							<nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
								<button href="#" onClick={() => setPageNumber((pageNumber) => pageNumber - 1)} className="relative inline-flex items-center px-8 py-2 rounded border text-sm font-medium mx-1 pagination_btn">
									Previous
								</button>
								<button href="#" onClick={() => setPageNumber(1)} className="z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn">
									1
								</button>
								<button href="#" onClick={() => setPageNumber(2)} className="bg-white relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn">
									2
								</button>
								<button href="#" onClick={() => setPageNumber(3)} className="bg-white hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn">
									3
								</button>
								<span className="relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn text-red-700">
									...
								</span>
								<button href="#" onClick={() => setPageNumber(10)} className="bg-white relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn">
									10
								</button>
								<button href="#" onClick={() => setPageNumber((pageNumber) => pageNumber + 1)} className="relative inline-flex items-center px-8 py-2 rounded border border-red-600 bg-white text-sm font-medium mx-1 pagination_btn">
									Next
								</button>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
		{
			editReservationModal ? 
				<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="flex items-end justify-center min-h-screen pt-4 px-8 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="">
									<div className="w-full flex justify-end">
										<GrClose onClick={() => setEditReservationModal(false)}/>
									</div>
									<div className="w-full flex items-center justify-center">
										<h3 className="text-3xl font-bold" style={{color: theme.backgroundColor}}>Reschedule Reservation</h3>
									</div>
								</div>
								<form className="bg-white px-8 pt-6 pb-8 mb-5 w-5/6 m-auto">
									<div className="mb-5">
										<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
											Enter Customer Name
										</label>
										<input defaultValue={editReservation.fullName} onChange={(value) => {setEditReservation((newReservation) => ({...newReservation, fullName : value.target.value}));}} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Customer Name"/>
									</div>
									<div className="mb-5">
										<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
											Enter Email Id
										</label>
										<input defaultValue={editReservation.email_id} onChange={(value) => setEditReservation((newReservation) => ({...newReservation, email_id : value.target.value}))} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Email Id"/>
									</div>
									<div className="mb-5">
										<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
											Enter Phone Number
										</label>
										<input defaultValue={editReservation.contact} onChange={(value) => setEditReservation((newReservation) => ({...newReservation, contact : value.target.value}))} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Phone Number"/>
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
													onChange={(date) => {setStartDate(date); setEditReservation((newReservation) => ({...newReservation, date: date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )}));}}
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
												onChange={(value) => {setStartTime(value); setEditReservation((newReservation) => ({...newReservation, startTime: value.format('HH:mm:ss')}))}}
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
												onChange={(value) => {setEndTime(value); setEditReservation((newReservation) => ({...newReservation, endTime: value.format('HH:mm:ss')}))}}
												value={endTime}
												clearable
												ampm={false}
												label="End Time"
											/>
										</ThemeProvider>
											</MuiPickersUtilsProvider>
									</div>
										<div className="flex items-center justify-center mt-8">
											<CustomButton title="Done"  customStyle={{ backgroundColor: theme.backgroundColor }} onPress={() => {editReservations(); setEditReservationModal(false)}}/>
										</div>
								</form>
							</div>
						</div>
					</div>
				</div>
					: null
			}
			{editReservSuccess && (
        <Popup
          content={
            <>
              <p className="font-bold text-green text-xl">
                Table reservation updated successfully!
              </p>
              <button
                className="mt-10 bg-primary px-10 py-2 shadow-lg"
                onClick={() => setEditReservationSuccess(!editReservSuccess)}
              >
                Okay
              </button>
            </>
          }
          handleClose={() => {
            setEditReservationSuccess(!editReservSuccess);
          }}
        />
      )}
			{warnDeleteReserve && (
        <Popup
          content={
            <>
              <p className="font-bold text-green text-xl">
                Confirm before Deleting Reservation
              </p>
              <button
                className="mt-10 bg-primary px-10 py-2 shadow-lg"
                onClick={() => {deleteReservations(editReservation._id); setWarnDeleteReserve(!warnDeleteReserve)}}
              >
                Delete
              </button>
            </>
          }
          handleClose={() => {
            setWarnDeleteReserve(!warnDeleteReserve);
          }}
        />
      )}
			{deleteReservSuccess && (
        <Popup
          content={
            <>
              <p className="font-bold text-green text-xl">
                Table reservation deleted!
              </p>
              <button
                className="mt-10 bg-primary px-10 py-2 shadow-lg"
                onClick={() => setDeleteReservSuccess(!deleteReservSuccess)}
              >
                Okay
              </button>
            </>
          }
          handleClose={() => {
            setDeleteReservSuccess(!deleteReservSuccess);
          }}
        />
      )}
		</div>
	)
  
}

export default AllReservations;

// editReservations(reservation._id, reservation)
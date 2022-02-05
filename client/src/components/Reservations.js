/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import Loader from "./Loader";
import Popup from "./Popup";
import CustomButton from "./Common/CustomButton";
import { ThemeContext } from "../context/Theme";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {ThemeProvider} from "@material-ui/styles";
import MomentUtils from '@date-io/moment';
import { GrClose } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import Select from 'react-select';
import { FiRefreshCcw } from 'react-icons/fi';
import {materialTheme} from '../styles/clockMaterialTheme';
import CustomTable from './Common/CustomTable';
import CustomPagination from './Common/CustomPagination';
import { DownloadTable, PrintTable } from './Common/download_print';

const AllReservations = () => {
	const [allReservations, setAllReservations] = useState([])
	const [editReservation, setEditReservation] = useState({})
	const [editReservationModal, setEditReservationModal] = useState(false)
	const [editReservSuccess, setEditReservationSuccess] = useState(false)
	const [warnDeleteReserve, setWarnDeleteReserve] = useState(false)
	const [deleteReservSuccess, setDeleteReservSuccess] = useState(false)
	const [availableTables, setAvailableTables] = useState([])
	const [allTables, setAllTables] = useState([])
	const [showDate, setShowDate] = useState(false)
	const [startDate, setStartDate] = useState(new Date());
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [reload, setReload] = useState(false)
	const [componentLoading, setComponentLoading] = useState(false)
	const [pageList, setPageList] = useState([])
	const [paginagtionBtn, setPaginagtionBtn] = useState({}) 
  const [incriment, setIncriment] = useState(0)
  const [onPrint, setOnPrint] = useState('')
  const theme = useContext(ThemeContext);

  const printTable = useRef();

	var currDate = new Date()
  
	useEffect(() => {
		setPageList([])
		setPageNumber(1)
		setPageLimit(10)
		fetch("/app/allReservations")
    .then((res) => res.json())
    .then((json) => {
			setAllReservations(json)
			setLoading(false);
			var dict = {}
			var len = json.length
			setPageList((pageList) => {
				for (var i = 0; i < len/pageLimit; i++) {
					pageList.push(i+1)
				}
				return [...pageList]
			})
			dict[1] = 'Active'
			setPaginagtionBtn(dict)
      setComponentLoading(false)
    })
    .catch((err) => {
			console.log(err);
			setLoading(false);
			setPageNumber(1)
			setPageLimit(10)
      setComponentLoading(false)
    })
		fetch(`/app/table`)
		.then((res) => res.json())
		.then((json) => {
			var tables = []
			for (var i = 0; i < json.length; i++) {
				tables.push(json[i].number)
			}
			setAllTables(tables)
			setLoading(false)
		})
		.catch((err) => {
			console.log(err);
			setLoading(false)
		})
	}, [reload])

	const getReservationByTime = (date, startTime, endTime) => {
		setComponentLoading(true)
		console.log('getReservationByTime', date, startTime, endTime)
		fetch(`/app/getReservationByTime/${date}/${startTime}/${endTime}`)
    .then((res) => res.json())
    .then((json) => {
			console.log(json, 'result')
			var tableList = []
			var reservedTable = []
			for (var i = 0; i < json.length; i++) {
				if (json[i].table !== undefined) 				
					reservedTable.push(json[i].table)
			}
			console.log(reservedTable, "reservedTable")
			var availableTables = allTables.filter(function(obj) { return reservedTable.indexOf(obj) === -1; });
			console.log(availableTables, 'available table')
			for (let i = 0; i < availableTables.length; i++){
				tableList.push({label: availableTables[i], value: availableTables[i]})
			}
			console.log(tableList, 'table list')
			setAvailableTables(tableList)
			setComponentLoading(false)
		})
			.catch((err) => {
					console.log(err);
			setComponentLoading(false)
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
		{ value: 1, label: '1' },
		{ value: 10, label: '10' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' },
		{ value: 200, label: '200' }
	]

	const selectCustomeStyle = {
		backgroundColor: theme.backgroundColor
	}

	const updatePageList = (pageLimit) => {
		setPageLimit(pageLimit)
		var pageList = []
		for (var i = 0; i < allReservations.length/pageLimit; i++) {
			pageList.push(i+1)
		}
		setPageList(pageList)
	}

	const updatePageBtnDict = (state) => {
		var pageDict = paginagtionBtn; 
		var updatePageDict = pageDict; 
		updatePageDict[pageNumber] = ''; 
		if (state === 'prev')
			updatePageDict[pageNumber - 1] = 'Active'; 
		else if (state === 'next')
			updatePageDict[pageNumber + 1] = 'Active'; 
    else
      updatePageDict[state] = 'Active';
		setPaginagtionBtn(updatePageDict)
	}


	return (
		<div>
		{ componentLoading ?
			<Loader /> : null }
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
									defaultValue={pageLimit}
									options={options}
									onChange={(value) => {updatePageList(value.value)}}
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
									<i onClick={() => {setReload(!reload); setComponentLoading(true)}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
								</div>
                <PrintTable printTableRef={printTable} />
                {/* <CustomButton
									title="Printt"
									customStyle={{ backgroundColor: theme.backgroundColor }}
									onPress={() => printOrder()}
								/> */}
                <DownloadTable fileName="Reservations" tableId="DownloadTable" onPrint={onPrint} setOnPrint={setOnPrint}/>
							</div> 
						</div>
            <div className={"print-source"}>
              <CustomTable id="DownloadTable">
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
                { 
                    loading ? <Loader /> :
                    allReservations.map(reservation => {
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
                            <CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14 }} title="Cancel" onPress={() => {setWarnDeleteReserve(true); setEditReservation(reservation); console.log(reservation)}}/>
                            <CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14 }} title="Edit" onPress={() => {getReservationByTime(reservation.date, reservation.start_time, reservation.end_time); setEditReservationModal(true); setEditReservation(reservation); setStartDate(new Date(reservation.date)); setStartTime(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), reservation.start_time.split(':')[0], reservation.start_time.split(':')[1], reservation.start_time.split(':')[2] )); setEndTime(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), reservation.start_time.split(':')[0], allReservations[0].start_time.split(':')[1], reservation.start_time.split(':')[2] )) }}/>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  }
              </CustomTable>
            </div>
            <div ref={printTable}>
            <CustomTable>
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
              { 
									loading ? <Loader /> :
                  allReservations.slice((pageNumber - 1)*pageLimit, ((pageNumber - 1)*pageLimit + pageLimit)).length > 0 ?
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
													<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14 }} title="Cancel" onPress={() => {setWarnDeleteReserve(true); setEditReservation(reservation); console.log(reservation)}}/>
													<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14 }} title="Edit" onPress={() => {getReservationByTime(reservation.date, reservation.start_time, reservation.end_time); setEditReservationModal(true); setEditReservation(reservation); setStartDate(new Date(reservation.date)); setStartTime(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), reservation.start_time.split(':')[0], reservation.start_time.split(':')[1], reservation.start_time.split(':')[2] )); setEndTime(new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), reservation.start_time.split(':')[0], allReservations[0].start_time.split(':')[1], reservation.start_time.split(':')[2] )) }}/>
												</div>
											</td>
										</tr>
									)
								}) : 
            <tr>
              <td colspan="8" >
                <div className="flex justify-center w-100 my-5">
                  <h5 className="text-xl font-semibold" style={{color: theme.backgroundColor}}>No Data Found</h5>
                </div>
              </td>
            </tr>
								}
            </CustomTable>
            </div>
					</div>
          <CustomPagination pageNumber={pageNumber} setPageNumber={setPageNumber} updatePageBtnDict={updatePageBtnDict} pageList={pageList} paginagtionBtn={paginagtionBtn} incriment={incriment} setIncriment={setIncriment}/>
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
										<input defaultValue={editReservation.fullName} onChange={(value) => {setEditReservation((editReservation) => ({...editReservation, fullName : value.target.value}));}} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Customer Name"/>
									</div>
									<div className="mb-5">
										<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
											Enter Email Id
										</label>
										<input defaultValue={editReservation.email_id} onChange={(value) => setEditReservation((editReservation) => ({...editReservation, email_id : value.target.value}))} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Email Id"/>
									</div>
									<div className="mb-5">
										<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
											Enter Phone Number
										</label>
										<input defaultValue={editReservation.contact} onChange={(value) => setEditReservation((editReservation) => ({...editReservation, contact : value.target.value}))} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Phone Number"/>
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
													onChange={(date) => {setStartDate(date); getReservationByTime(date.toISOString().split('T')[0], editReservation.startTime, editReservation.endTime); setEditReservation((editReservation) => ({...editReservation, date: date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )}));}}
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
												onChange={(value) => {setStartTime(value); getReservationByTime(editReservation.date, value.format('HH:mm:ss'), editReservation.endTime); setEditReservation((editReservation) => ({...editReservation, startTime: value.format('HH:mm:ss')}))}}
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
												onChange={(value) => {setEndTime(value); getReservationByTime(editReservation.date, editReservation.startTime, value.format('HH:mm:ss')); setEditReservation((editReservation) => ({...editReservation, endTime: value.format('HH:mm:ss')}))}}
												value={endTime}
												clearable
												ampm={false}
												label="End Time"
											/>
										</ThemeProvider>
											</MuiPickersUtilsProvider>
									</div>
									<div style={{width: '100%'}} className="inline-block rounded">
										<Select
											styles={selectCustomeStyle}
											defaultValue={availableTables[0]}
											options={availableTables}
											maxMenuHeight={130}
											onChange={(value) => setEditReservation((editReservation) => ({...editReservation, table: value.value}))}
										/>
									</div>
										<div className="flex items-center justify-center mt-8">
											<CustomButton title="Done"  customStyle={{ backgroundColor: theme.backgroundColor }} onPress={() => {editReservations(); setEditReservationModal(false); }}/>
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

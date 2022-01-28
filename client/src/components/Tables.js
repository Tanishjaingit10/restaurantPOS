import React, { useState, useEffect, useContext } from "react";
import Popup from "./Popup";
import Loader from "./Loader";
import { ThemeContext } from "../context/Theme";
import CustomButton from "./Common/CustomButton";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {ThemeProvider} from "@material-ui/styles";
import MomentUtils from '@date-io/moment';
import { Link, useHistory } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import {MdOutlineDelete} from 'react-icons/md'
import Select from 'react-select';
import Modal from "react-modal";
import {materialTheme} from '../styles/clockMaterialTheme';

const Tables = () => {
	const [componentLoading, setComponentLoading] = useState(false)
  const [displayTable, setDisplayTable] = useState([]);
  const [confirmDeleteTable, setConfirmDeleteTable] = useState(false);
  const [Open, setOpen] = useState(false);
  const [deleteTableId, setDeleteTableId] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
	const [availableTables, setAvailableTables] = useState([])
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
	const [reload, setReload] = useState(false)
	const [newTableAdded, setNewTableAdded] = useState(false)
	const [showDeleteTable, setShowDeleteTable] = useState(false)

	useEffect(() => {
		setShowDeleteTable(false)
		fetch(`/app/table`)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			setDisplayTable(json)
			var tables = []
			for (var i = 0; i < json.length; i++) {
				tables.push(json[i].number)
			}
			setAllTables(tables)
			setLoading(false)
      setComponentLoading(false)
		})
		.catch((err) => {
			console.log(err);
			setLoading(false)
      setComponentLoading(false)
		})
	}, [reload])

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
			setReload(!reload)
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
				status: 'Free'
			})
		})
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
			}
			setComponentLoading(false)
			setNewTableAdded(true)
			setReload(!reload)
		})
		.catch((err) => {
			console.log(err);
			setComponentLoading(false)
		})
	}

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
			for (var i = 0; i < availableTables.length; i++){
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
			width: '450px',
			height: '100%'
    },
  };

  const deleteTable = async () => {
    await fetch(`/app/removeTable/${deleteTableId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
		setReload(!reload)
    setOpen(!Open);
  };

	const selectCustomeStyle = {
		backgroundColor: theme.backgroundColor
	}

  return (
    <div className="">
			{ componentLoading ?
			<Loader /> : null }
      <div className="flex flex-row justify-between items-center h-20 px-10 border-b-2 border-gray-300">
        <h2 className="font-semibold text-2xl">Table View</h2>
        <div className="flex flex-row items-center">
          <div
            style={{ backgroundColor: theme.backgroundColor }}
            className="text-white py-2 px-2 rounded-md mx-2"
          >
            <i onClick={() => {setReload(!reload); setComponentLoading(true)}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
          </div>
          <CustomButton
            title="Actions"
            customStyle={{ backgroundColor: theme.backgroundColor }}
            onPress={() => {history.push('reservations')}}
          />
          <CustomButton
            title="Take Away"
            customStyle={{ backgroundColor: "#f0fd59" }}
            onPress={() => {history.push('/takeaways')}}
          />
          <CustomButton
            title="- Delete Table"
            customStyle={{ backgroundColor: theme.backgroundColor }}
						onPress={() => {setShowDeleteTable(true);}}
          />
          <CustomButton
            title="+ Add Table"
            customStyle={{ backgroundColor: "#74fb4d" }}
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
              className="text-2xl font-bold text-center mb-4"
            >
              Add New Table
            </h2>
            <form>
              <select
                name="position"
                className="p-4 border-2 w-full text-md rounded-lg text-white font-thin mb-4"
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
                  "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3"
                }
              />
              <input
                name="maxCapacity"
                placeholder="Enter Max Capacity"
                type="text"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className={
                  "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3"
                }
              />
              <div className="flex w-full mt-5 justify-center">
								<CustomButton title="done" customStyle={{ backgroundColor: theme.backgroundColor }} onPress={() => {closeModal(false); addTable()}}/>
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
				<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 bg-opacity-25 transition-opacity" aria-hidden="true"></div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="">
									<div className="w-full flex justify-end">
										<GrClose onClick={() => setShowModal(false)}/>
									</div>
									<div className="w-full flex items-center justify-center">
										<h3 className="text-3xl font-bold" style={{color: theme.backgroundColor}}>Reserve Table</h3>
									</div>
								</div>
									<form className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full">
										<div className="mb-4">
											<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Customer Name
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, fullName : value.target.value}))} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Customer Name"/>
										</div>
										<div className="mb-4">
											<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Email Id
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, email_id : value.target.value}))} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Email Id"/>
										</div>
										<div className="mb-4">
											<label className="block text-gray-700 text-sm font-bold mb-2" for="fullName">
												Enter Phone Number
											</label>
											<input onChange={(value) => setNewReservation((newReservation) => ({...newReservation, contact : value.target.value}))} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Enter Phone Number"/>
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
													onChange={(date) => {setStartDate(date); setNewReservation((newReservation) => ({...newReservation, date: date.toISOString().split('T')[0]})); getReservationByTime(date.toISOString().split('T')[0], newReservation.startTime, newReservation.endTime);}} 
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
											onChange={(value) => {setStartTime(value); setNewReservation((newReservation) => ({...newReservation, startTime: value.format('HH:mm:ss')})); getReservationByTime(newReservation.date, value.format('HH:mm:ss'), newReservation.endTime);}}
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
													onChange={(value) => {setEndTime(value); setNewReservation((newReservation) => ({...newReservation, endTime: value.format('HH:mm:ss')})); getReservationByTime(newReservation.date, newReservation.startTime, value.format('HH:mm:ss')); }}
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
											onChange={(value) => setNewReservation((newReservation) => ({...newReservation, table: value.value}))}
										/>
									</div>
										<div className="flex justify-center mt-8">
											<CustomButton title="Done"  customStyle={{ backgroundColor: theme.backgroundColor }} onPress={() => {submitNewReservation(); setShowModal(false)}}/>
										</div>
									</form>
							</div>
						</div>
					</div>
				</div>
					: null
			}
			{console.log(deleteTableId)}
      <div className="flex flex-col">
        <h2 className="my-5 ml-11 font-semibold text-gray-600 text-lg">
          Hall Way
        </h2>
        <div className="flex flex-wrapw-full justify-evenly">
				{console.log(loading)}
          {loading ? <Loader /> : 
						<div className="flex flex-row w-full flex-wrap">
							{displayTable.map(table => {
								return (
									<div key={table._id}>
										{
											showDeleteTable ? <div className="-mb-8"><MdOutlineDelete onClick={() => {if (table.status === 'Free'){setConfirmDeleteTable(true); setDeleteTableId(table._id)}}} color={table.status !== 'Free' ?  '#faaf9a': theme.backgroundColor} size={25}/> </div> : null
										}
										<div style={ table.status !== 'Free' ? {backgroundColor: theme.backgroundColor, color: 'white' }: {borderColor: theme.backgroundColor, borderWidth: '1px', color: 'grey'}} className="py-5 m-5 rounded">
											<Link to={{pathname:"/pos",state:table.number}} className="font-bold text-2xl p-8">{table.number}</Link>
										</div>
									</div>
								)
							})}
							</div>

					}
        </div>
        {/* Add Table  */}
      </div>
      {confirmDeleteTable && (
        <Popup
          content={
            <>
              <p className="font-bold text-green">
                Please confirm to delete the table
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
            setConfirmDeleteTable(false);
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
			{newTableAdded && (
        <Popup
          content={
            <>
              <p className="font-bold text-green text-xl">
                Table added successfully!
              </p>
              <button
                className="mt-10 bg-primary px-10 py-2 shadow-lg"
                onClick={() => setNewTableAdded(!newTableAdded)}
              >
                Okay
              </button>
            </>
          }
          handleClose={() => {
            setNewTableAdded(!newTableAdded);
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

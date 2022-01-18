import React, {useState, useEffect, useContext} from 'react'
import Loader from "../Loader";
import CustomNavBar from "../../items/CustomNavBar";
import { ThemeContext } from "../../context/Theme";
import Select from 'react-select';
import CustomButton from "../../items/CustomButton";
import { FiRefreshCcw } from 'react-icons/fi';
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {ThemeProvider} from "@material-ui/styles";
import MomentUtils from '@date-io/moment';
import {materialTheme} from '../../styles/clockMaterialTheme';
import { GrClose } from 'react-icons/gr';

const ViewAttendance = () => {
	    
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
	const [reload, setReload] = useState(false)
	const [componentLoading, setComponentLoading] = useState(false)
	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [filterAttendanceStartDate, setFilterAttendanceStartDate] = useState(new Date())
	const [filterAttendanceStopDate, setFilterAttendanceStopDate] = useState(new Date())
	const [selectAttendanceFilter, setSelectAttendanceFilter] = useState(false)
	const [attendance, setAttendance] = useState([]);
  const theme = useContext(ThemeContext);

	useEffect(() => {
		fetch("/app/users")
      .then((res) => res.json())
      .then((json) => {
        if (json !== "undefined") {
					setUsers(json);
					var dict = {}
					for (var i = 0; i < json.length; i++) {
						dict[json[i]['_id']] = json[i]
					}
					console.log(dict)
					setUsers(dict);
					fetch("/app/attendance")
					.then((res) => res.json())
					.then((json) => {
						if (json !== "undefined") {
							setAttendance(json);
							setLoading(false);
						}
					})
					.catch((err) => {
						console.error(err);
					})
				}
			})
			.catch((err) => {
				console.error(err);
			})
	}, [reload])

	const options = [
		{ value: 10, label: '10' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' },
		{ value: 200, label: '200' }
	]

	const getAttendanceByDate = (startDate, endDate) => {
		setLoading(true)
		fetch(`/app/getAttendanceByDate/${startDate}/${endDate}`)
		.then((res) => res.json())
		.then((json) => {
			if (json !== "undefined") {
				setAttendance(json);
				setLoading(false)
				setPageNumber(1)
				setPageLimit(10)
			}
		})
		.catch((err) => {
			setLoading(false);
			console.log("1", err);
			setPageNumber(1)
			setPageLimit(10)
		});
	}

  return (
		<div>
      <CustomNavBar />
			{ componentLoading ?
			<Loader /> : null }
      <div className="flex flex-col w-full">
				<div className="my-2 overflow-x-auto">
					<div className="py-2 align-middle inline-block min-w-full px-5">
					<div className="flex items-center justify-between my-5">
						<h2 className="font-bold text-2xl text-gray-600">Attendance</h2>
						<div className="flex flex-row items-center">
							<CustomButton
								title="Select Data Range"
								customStyle={{ backgroundColor: theme.backgroundColor }}
								onPress={() => {setSelectAttendanceFilter(true)}}
							/>
							<CustomButton
								title="Yesterday"
								customStyle={{ backgroundColor: theme.backgroundColor }}
								onPress={() => {getAttendanceByDate(new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}}
							/>
							<CustomButton
								title="Today"
								customStyle={{ backgroundColor: theme.backgroundColor }}
								onPress={() => {getAttendanceByDate(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}}
							/>
						</div>
					</div>
					<div className="flex flex-col h-full shadow border-t border-gray-200 sm:rounded-lg mt-8">
						<div className="flex flex-row justify-between">
							<div className="my-4">
								<h1 className="text-lg inline-block ml-8">Display</h1>
								<div style={{width: '150px'}} className="inline-block mx-5 rounded">
									<Select
										defaultValue={options[0]}
										options={options}
										onChange={(value) => setPageLimit(value.value)}
									/>
								</div>
								<h1 className="text-lg inline-block">Records</h1>
							</div>
							<div className="my-4">
								<div className="flex flex-row items-center justify-end">
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
							</div>
						</div>
						<table className="min-w-full divide-y divide-x divide-gray-200">
							<thead style={{ backgroundColor: theme.backgroundColor }}>
								<tr>
								<th scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking-wider border">
											SL.NO
									</th>
									<th scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border">
											Name
									</th>
									<th scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border">
											ID
									</th>
									<th scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border">
										Date
									</th>
									<th scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border">
										Checked In
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Checked Out
									</th>
								</tr>
							</thead>
							<tbody className="w-full">{loading ? <Loader /> : 
								attendance.slice((pageNumber - 1)*pageLimit, ((pageNumber - 1)*pageLimit + pageLimit)).map((attendance, idx) => {
									return (
										<tr className="font-medium ">
											<th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{idx + 1 + (pageNumber - 1)*pageLimit}</div>
											</th>
											<th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{users[attendance['user_id']].fullName}</div>
											</th>
											<th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{users[attendance['user_id']].email_id}</div>
											</th>
											<th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{attendance.date}</div>
											</th>
											<th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{attendance.checkinTime}</div>
											</th>
											<th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{attendance.checkoutTime}</div>
											</th>
										</tr>
									)}
									)}
							</tbody>
						</table>
					</div>
					<div className="flex flex-row items-end justify-end my-8">
						<div className="mt-8">
							<nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
								<button href="#" disabled={pageNumber == 1 ? true : false} onClick={() => setPageNumber((pageNumber) => pageNumber - 1)} className="relative inline-flex items-center px-8 py-2 rounded border text-sm font-medium mx-1 pagination_btn">
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
		{selectAttendanceFilter && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="flex items-end justify-center min-h-screen pt-4 px-8 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 bg-opacity-75 transition-opacity" aria-hidden="true" style={{backgroundColor: 'rgb(226 226 226 / 20%)'}}></div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="">
									<div className="w-full flex justify-end">
										<GrClose onClick={() => setSelectAttendanceFilter(false)}/>
									</div>
									<div className="w-full flex items-center justify-center">
									</div>
								</div>
            <div className="p-5">
              <div className="my-5 w-full">
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<ThemeProvider theme={materialTheme}>
										<DatePicker
											InputProps={{
													disableUnderline: true
												}}
												label="Start Date"
												value={filterAttendanceStartDate}
												onChange={(date) => {setFilterAttendanceStartDate(new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); getAttendanceByDate(new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), new Date(filterAttendanceStopDate).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) )}}
											/>
									</ThemeProvider>
								</MuiPickersUtilsProvider>
							</div>
							<div className="my-5 w-full">
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<ThemeProvider theme={materialTheme}>
										<DatePicker
											InputProps={{
													disableUnderline: true
												}}
												label="End Date"
												value={filterAttendanceStopDate}
												onChange={(date) => {setFilterAttendanceStopDate(new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); getAttendanceByDate(filterAttendanceStartDate, new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}}
											/>
									</ThemeProvider>
								</MuiPickersUtilsProvider>
							</div>
            </div>
						</div>
						</div>
					</div>
				</div>
      )}
		</div>
  );
};

export default ViewAttendance;

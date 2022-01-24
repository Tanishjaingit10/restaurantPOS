import React, {useState, useEffect, useContext} from 'react'
import Loader from "../Loader";
import CustomNavBar from "../../items/CustomNavBar";
import { ThemeContext } from "../../context/Theme";
import Select from 'react-select';
import CustomButton from "../../items/CustomButton";
import { FiRefreshCcw } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

const Attendance = () => {
    
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
	const [reload, setReload] = useState(false)
	const [attendance, setAttendance] = useState([]);
	const [componentLoading, setComponentLoading] = useState(false)
	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [pageList, setPageList] = useState([])
	const [paginagtionBtn, setPaginagtionBtn] = useState({}) 

  const theme = useContext(ThemeContext);
	const history = useHistory();

	useEffect(() => {
		setPageList([])
		fetch("/app/users")
      .then((res) => res.json())
      .then((json) => {
        if (json !== "undefined") {
					var dict = {}
					for (var i = 0; i < json.length; i++) {
						dict[json[i]['_id']] = json[i]
					}
					console.log(dict)
					setUsers(dict);
					fetch("/app/attendance")
					.then((res) => res.json())
					.then((json) => {
						setLoading(false);
						if (json !== "undefined") {
							setAttendance(json);
              setComponentLoading(false)
              var dict = {}
              var len = json.length
              for (var i = 0; i < len/pageLimit; i++) {
                  setPageList((pageList) => [...pageList, i+1])
              }
              dict[1] = 'Active'
              setPaginagtionBtn(dict)
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

	const updateAttendance = (attendance) => {
		console.log(attendance)
		setComponentLoading(true)
		console.log(new Date().toLocaleTimeString('en-US', { hour12: false }))
		var updatedData = {}
		updatedData['date'] = attendance.date
		updatedData['userId'] = attendance.user_id
		if (attendance.status == 'Shift Not Started'){
			updatedData['status'] = 'Clocked In'
			updatedData['checkInTime'] = new Date().toLocaleTimeString('en-US', { hour12: false })
			updatedData['checkOutTime'] = 'N/A'
		}
		else if (attendance.status == 'Clocked In'){
			updatedData['status'] = 'Shift Completed'
			updatedData['checkInTime'] = attendance.checkInTime
			updatedData['checkOutTime'] = new Date().toLocaleTimeString('en-US', { hour12: false })
		}
		fetch(`/app/updateAttendance/${attendance._id}`, {
			method: "PUT",
			headers: {
					"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedData)
		})
		.then((res) => {
			setReload(!reload)
			setComponentLoading(false)
		})
		.catch((err) => {
			console.log(err)
			setComponentLoading(false)
		})
			console.log(updatedData)
	}

	const options = [
		{ value: 10, label: '10' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' },
		{ value: 200, label: '200' }
	]

    const updatePageList = (pageLimit) => {
		setPageLimit(pageLimit)
		var pageList = []
		for (var i = 0; i < attendance.length/pageLimit; i++) {
			pageList.push(i+1)
		}
		setPageList(pageList)
	}

	const updatePageBtnDict = (state) => {
		var pageDict = paginagtionBtn; 
		var updatePageDict = pageDict; 
		updatePageDict[pageNumber] = ''; 
		if (state == 'prev')
			updatePageDict[pageNumber - 1] = 'Active'; 
		else
			updatePageDict[pageNumber + 1] = 'Active'; 
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
						<div className="inline-block w-full">
							<h1 className="text-lg inline-block font-bold text-gray-600">Take Attendance</h1>
							<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, float: 'right' }} title="View Report" onPress={() => {history.push('/viewattendance')}}/>
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
									onChange={(value) => updatePageList(value.value)}
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
									<th scope="col" colspan="2" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{ 
									loading ? <Loader /> :
									attendance.slice((pageNumber - 1)*pageLimit, ((pageNumber - 1)*pageLimit + pageLimit)).map((attendance, idx) => {
										return (
											<tr className="">
												<th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
													<div className="text-base text-gray-500 font-semibold">{idx + 1 + (pageNumber - 1)*pageLimit}</div>
												</th>
												<th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
													<div className="text-base text-gray-500 font-semibold">{users[attendance['user_id']].fullName}</div>
												</th>
												<th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
													<div className="text-base text-gray-500 font-semibold">{users[attendance['user_id']].email_id}</div>
												</th>
												<th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
													<div className="text-base text-gray-500 font-semibold">{attendance.date}</div>
												</th>
												<th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
													<div className="text-base text-gray-500 font-semibold" style={{color: theme.backgroundColor }}>{attendance.status}</div>
												</th>
												<th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												{
													attendance.status !== 'Shift Completed' ?
													<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14, width: 150 }} title={attendance.status == "Clocked In" ? "Clock Out" : "Clock In"} onPress={() => {updateAttendance(attendance)}}/>
													: null
												}
												</th>
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
								<button href="#" disabled={pageNumber == 1 ? true : false} onClick={() => {setPageNumber((pageNumber) => pageNumber - 1); updatePageBtnDict('prev')}} className="relative inline-flex items-center px-8 py-2 rounded border text-sm font-medium mx-1 pagination_btn">
									Previous
								</button>
								{console.log(pageList, pageList[-1])}
								{(() => {
									if (pageList.length <= 4 ){
										return(
										pageList.slice(0, 4).map((i, idx) => {
											return (
												<button href="#"  id={"pagBtn" + String(i)} onClick={() => setPageNumber(i)} className={paginagtionBtn[i] ? "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn" + paginagtionBtn[i] : "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn"}>
													{i}
												</button>
											)
										})
										)
									}
									else {
										return(
										pageList.slice(0, 2).map((i, idx) => {
											return (
												<button href="#"  id={"pagBtn" + String(i)} onClick={() => setPageNumber(i)} className={paginagtionBtn[i] ? "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn" + paginagtionBtn[i] : "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn"}>
													{i}
												</button>
											)
										})
										)
									}
								}
								)()}
									{
										pageList.length > 4 ?
										<>
										<span className="relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn text-red-700">
										...
										</span>
										{
										pageList.slice(pageList.length - 1, pageList.length).map((i, idx) => {
											return (
												<button href="#"  id={"pagBtn" + String(i)} onClick={() => setPageNumber(i)} className={paginagtionBtn[i] ? "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn" + paginagtionBtn[i] : "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn"}>
													{i}
												</button>
											)
										})
									}
									</> : null
										
									}
								<button href="#" disabled={pageNumber == pageList[pageList.length -1] ? true : false} onClick={() => {setPageNumber((pageNumber) => pageNumber + 1); updatePageBtnDict('next')}} className="relative inline-flex items-center px-8 py-2 rounded border border-red-600 bg-white text-sm font-medium mx-1 pagination_btn">
									Next
								</button>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
  );
};

export default Attendance;

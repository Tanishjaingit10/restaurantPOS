import React, {useState, useEffect, useContext, useRef} from 'react'
import Loader from "../Loader";
import { ThemeContext } from "../../context/Theme";
import Select from 'react-select';
import CustomButton from "../Common/CustomButton";
import { FiRefreshCcw } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import CustomTable from '../Common/CustomTable';
import CustomPagination from '../Common/CustomPagination';
import { DownloadTable, PrintTable } from '../Common/download_print';

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
  const [incriment, setIncriment] = useState(0)
  const printTable = useRef();

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
		if (attendance.status === 'Shift Not Started'){
			updatedData['status'] = 'Clocked In'
			updatedData['checkInTime'] = new Date().toLocaleTimeString('en-US', { hour12: false })
			updatedData['checkOutTime'] = 'N/A'
		}
		else if (attendance.status === 'Clocked In'){
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
		if (state === 'prev')
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
									<i onClick={() => {setReload(!reload); setComponentLoading(true)}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
								</div>
                <PrintTable printTableRef={printTable} />

								{/* <CustomButton
									title="Print"
									customStyle={{ backgroundColor: theme.backgroundColor }}
								/> */}
								<DownloadTable fileName="Atendance" tableId="DownloadTable" />
							</div> 
						</div>
            <table id="DownloadTable" style={{display: 'none'}}>
              <thead>
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
              <tbody>
              { 
									loading ? <Loader /> :
									attendance.map((attendance, idx) => {
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
													<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14, width: 150 }} title={attendance.status === "Clocked In" ? "Clock Out" : "Clock In"} onPress={() => {updateAttendance(attendance)}}/>
													: null
												}
												</th>
											</tr>
									)
								})
								}
              </tbody>
            </table>
            <div  ref={printTable}>
							<CustomTable>
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
								{ 
									loading ? <Loader /> :
                  attendance.slice((pageNumber - 1)*pageLimit, ((pageNumber - 1)*pageLimit + pageLimit)).length > 0 ?
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
													<CustomButton customStyle={{ backgroundColor: theme.backgroundColor, fontSize: 14, width: 150 }} title={attendance.status === "Clocked In" ? "Clock Out" : "Clock In"} onPress={() => {updateAttendance(attendance)}}/>
													: null
												}
												</th>
											</tr>
										)
                  }) : 
            <tr>
              <td colspan="6" >
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
		</div>
  );
};

export default Attendance;

import React, { useState } from "react";
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { FiLogOut, FiTrash } from "react-icons/fi";
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsLayers } from 'react-icons/bs';
import { BiFoodMenu } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import { FaConciergeBell, FaHome, FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/SideBar.css';
import { WastageModal } from "./Wastage/WastageModal";

const SideBar = () => {
	const [menuCollapse, setMenuCollapse] = useState(true)
	const location = useLocation();  
	const [wastageIsOpen, setWastageIsOpen] = useState(false)
	
	const menuIconClick = () => {
		menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
	};
	
	return (
	<div id="sidebar">
		<ProSidebar collapsed={menuCollapse}>
			<div className="px-1 pt-4 bg-red-500">
				<SidebarHeader className="pb-4">
					<div onClick={menuIconClick}>
							{menuCollapse ? (
									<GiHamburgerMenu color="white" style={{fontSize:23, cursor: 'pointer'}} className="mx-auto"/>
							) : (
									<FaArrowLeft color="white" style={{fontSize:23, 'transform': 'translateX(180px)', cursor: 'pointer'}}/>
							)}
					</div>
				</SidebarHeader>
			</div>
			<SidebarContent>
				<Menu iconShape="square" onClick={()=>setMenuCollapse(true)}>
					<MenuItem active={location.pathname === '/dashboard' ? true: false} icon={<FaHome />}><Link to="/dashboard">Dashboard</Link></MenuItem>
					<MenuItem active={location.pathname === '/tables' ? true: false} icon={<AiOutlineEye color="white" />}><Link to="/tables">Table View</Link></MenuItem>
					<MenuItem active={location.pathname === '/orders' ? true: false} icon={<BsLayers color="white" />}><Link to="/orders">Orders</Link></MenuItem>
					<MenuItem active={location.pathname === '/kitchen' ? true: false} icon={<FaConciergeBell color="white" />}><Link to="/kitchen">Kitchen Dashboard</Link></MenuItem>
					<MenuItem active={location.pathname === '/menu' ? true: false} icon={<BiFoodMenu color="white" />}><Link to="/menu">Menu</Link></MenuItem>
					<MenuItem active={location.pathname === '/attendance' ? true: false} icon={<IoIosPeople color="white" />}><Link to="/attendance">Attendance</Link></MenuItem>
					<MenuItem active={location.pathname === '/wastage' ? true: false} onClick={()=>setWastageIsOpen(true)} icon={<FiTrash color="white"/>}>Wastage</MenuItem>
					<MenuItem active={location.pathname === '/logout' ? true: false} icon={<FiLogOut color="white" />}>Log Out</MenuItem>
				</Menu>
			</SidebarContent>
		</ProSidebar>
		<WastageModal isOpen={wastageIsOpen} setIsOpen={setWastageIsOpen}/>
	</div>
	)
}

export default SideBar;
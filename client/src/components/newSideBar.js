import React, { useState, useEffect, useContext } from "react";
import {  ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FiHome, FiLogOut, FiArrowLeftCircle } from "react-icons/fi";
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsLayers } from 'react-icons/bs';
import { BiFoodMenu } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import { FaConciergeBell, FaHome, FaArrowLeft } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from "../context/Theme";
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/SideBar.css';

const SideBar = () => {
	const [menuCollapse, setMenuCollapse] = useState(true)
  const theme = useContext(ThemeContext);
	const location = useLocation();  
	console.log(location.pathname)
	
	const menuIconClick = () => {
			menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
	};
	
	return (
	<div id="sidebar">
		<ProSidebar collapsed={menuCollapse}>
			<div class="px-1 pt-4" style={{ backgroundColor: theme.backgroundColor}}>
				<SidebarHeader className="pb-4">
					<div onClick={menuIconClick}>
							{menuCollapse ? (
									<GiHamburgerMenu color="white" style={{'fontSize':23}} className="mx-auto"/>
							) : (
									<FaArrowLeft color="white" style={{'fontSize':23, 'transform': 'translateX(180px)'}}/>
							)}
					</div>
				</SidebarHeader>
			</div>
			<SidebarContent>
				<Menu iconShape="square">
					<MenuItem active={location.pathname === '/home' ? true: false} icon={<FaHome />}><a href="/home">Dashboard</a></MenuItem>
					<MenuItem active={location.pathname === '/tables' ? true: false} icon={<AiOutlineEye color="white" />}><a href="/tables">Table View</a></MenuItem>
					<MenuItem active={location.pathname === '/orders' ? true: false} icon={<BsLayers color="white" />}><a href="/orders">Orders</a></MenuItem>
					<MenuItem active={location.pathname === '/kitchen' ? true: false} icon={<FaConciergeBell color="white" />}><a href="/kitchen">Kitchen Dashboard</a></MenuItem>
					<MenuItem active={location.pathname === '/menu' ? true: false} icon={<BiFoodMenu color="white" />}><a href="/menu">Menu</a></MenuItem>
					<MenuItem active={location.pathname === '/attendance' ? true: false} icon={<IoIosPeople color="white" />}><a href="/attendance">Attendance</a></MenuItem>
					<MenuItem active={location.pathname === '/logout' ? true: false} icon={<FiLogOut color="white" />}>Log Out</MenuItem>
				</Menu>
			</SidebarContent>
		</ProSidebar>
	</div>
	)
}

export default SideBar;
import React, { useContext } from "react";
import { ProSidebar, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { FiLogOut } from "react-icons/fi";
import { AiOutlineEye } from 'react-icons/ai';
import { BsLayers } from 'react-icons/bs';
import { BiFoodMenu } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import { FaConciergeBell, FaHome } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/SideBar.css';
import { UserContext } from "../context/User";

const SideBar = () => {
	const location = useLocation();  
	const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(UserContext);

	const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
    };
	
	return (
	<div id="sidebar">
		<ProSidebar collapsed={true} collapsedWidth={220} width={220}>
			<SidebarContent>
				<Menu>
					<MenuItem active={location.pathname === '/dashboard' ? true: false} icon={<FaHome />}><Link to="/dashboard">Dashboard</Link></MenuItem>
					<MenuItem active={location.pathname === '/tables' ? true: false} icon={<AiOutlineEye color="white" />}><Link to="/tables">Table View</Link></MenuItem>
					<MenuItem active={location.pathname === '/orders' ? true: false} icon={<BsLayers color="white" />}><Link to="/orders">Orders</Link></MenuItem>
					<MenuItem active={location.pathname === '/kitchen' ? true: false} icon={<FaConciergeBell color="white" />}><Link to="/kitchen">Kitchen Dashboard</Link></MenuItem>
					<MenuItem active={location.pathname === '/menu' ? true: false} icon={<BiFoodMenu color="white" />}><Link to="/menu">Menu</Link></MenuItem>
					<MenuItem active={location.pathname === '/attendance' ? true: false} icon={<IoIosPeople color="white" />}><Link to="/attendance">Attendance</Link></MenuItem>
					<MenuItem onClick={handleLogout} active={location.pathname === '/logout' ? true: false} icon={<FiLogOut color="white" />}>Log Out</MenuItem>
				</Menu>
			</SidebarContent>
		</ProSidebar>
	</div>
	)
}

export default SideBar;
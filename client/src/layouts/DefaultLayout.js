import React from 'react';  
import SideBar from '../components/newSideBar';
import CustomNavBar from "../items/CustomNavBar";

export const DefaultLayout = ({children}) => {

	return (
		<div className="flex flex-row">
			<div className="" style={{position: 'fixed', zIndex: 999, minHeight: '100vh'}}>
					<SideBar />
			</div>
			<div style={{'width':'calc(100vw - 55px)', float: 'right', margin: '0 0 0 55px', minHeight: '100vh'}}>
                <CustomNavBar />
        <div className="pl-3">
				  {children}
        </div>
			</div>
		</div>
	);
}

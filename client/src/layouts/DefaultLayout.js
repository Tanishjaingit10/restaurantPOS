import React from 'react';  
import SideBar from '../components/newSideBar';

export const DefaultLayout = ({children}) => {

	return (
		<div className="flex flex-row">
			<div className="" style={{position: 'fixed', zIndex: 999, minHeight: '100vh'}}>
					<SideBar />
			</div>
			<div style={{'width':'calc(100vw - 55px)', float: 'right', margin: '0 0 0 55px'}}>
				{children}
			</div>
		</div>
	);
}
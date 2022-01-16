import React from 'react'
import { GrClose } from 'react-icons/gr';

const Popup = (props) => {
	return (
		<div className="popup-box">
		  <div className="box text-center py-20">
            <GrClose onClick={props.handleClose} style={{marginTop: -60, marginLeft: '90%', marginBottom: 20}}/>
			{props.content}
		  </div>
		</div>
	)
}

export default Popup

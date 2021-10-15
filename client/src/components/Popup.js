import React from 'react'

const Popup = (props) => {
	return (
		<div className="popup-box">
		  <div className="box text-center py-20">
			<span className="close-icon" onClick={props.handleClose}>x</span>
			{props.content}
		  </div>
		</div>
	)
}

export default Popup

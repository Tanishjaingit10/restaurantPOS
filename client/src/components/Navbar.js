import React, { useState } from 'react';


const Navbar = () => {

	const [show, setshow] = useState(false);

	const openDrop = () => {
		setshow(!show);
	}

	/*window.onclick = function (e) {
		var x = document.getElementById("drop");
		/*if (show === true) {
			setshow(!show);
		}
		/*else if (show === false && (e.target.matches("#drop"))) {
			setshow(!show);
		}
	}*/



	return (
		<div>
			<nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">

				<div className="flex flex-wrap items-center">
					<div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
						<a href="#">
							<span className="text-xl pl-2"><i className="em em-grinning"></i></span>
						</a>
					</div>

					<div className="flex flex-row md:w-1/3 justify-center md:justify-start text-white px-2">

						<div className="w-full"><input type="search" placeholder="Search" className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-2 px-2 pl-10 appearance-none leading-normal" />
						</div>
						<div className="py-2 px-2 search-icon bg-gray-900 rounded ml-2">
							<svg className="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
							</svg>
						</div>

					</div>

					<div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
						<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
							<li className="flex-1 md:flex-none md:mr-3">
								<a className="inline-block py-2 px-4 text-white hover:text-gray-200 hover:text-underline" href="#">Order New</a>
							</li>
							<li className="flex-1 md:flex-none md:mr-3">
								<a className="inline-block py-2 px-4 text-white hover:text-gray-200 hover:text-underline" href="#">Online Orders</a>
							</li>
							<li id="drop" className="flex-1 md:flex-none md:mr-3">
								<div className="relative inline-block">
									<button onClick={openDrop} className="drop-button text-white focus:outline-none"> <span className="pr-2"><i className="em em-robot_face"></i></span> Hi, User <svg className="h-3 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
										<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></button>
									<div className={show ? "dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30" : "hidden"}>
										<a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-user fa-fw"></i> Profile</a>
										<a href="#" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fa fa-cog fa-fw"></i> Settings</a>
										<div className="border border-gray-100"></div>
										<a href="/login" className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>


			</nav>


		</div>
	)
}

export default Navbar

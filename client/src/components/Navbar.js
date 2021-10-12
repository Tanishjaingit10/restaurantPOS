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
		<div className="">
			<nav className="bg-white border-primary border-b-4 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
				<div className="">
					<ul className="flex flex-1 md:flex-none w-1/3 ml-28">
						<li className="flex-1 md:flex-none md:mr-3 border-primary border-4 px-4 py-2 w-full text-center">
							<a className="block py-2 px-4 text-primary font-semibold text-2xl" href="#">Counter Dashboard</a>
						</li>
						<li className="flex-1 md:flex-none md:mr-3 border-primary border-4 px-4 py-2 w-full text-center">
							<a className="block py-2 px-4 text-primary font-semibold text-2xl" href="#">POS</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}

export default Navbar

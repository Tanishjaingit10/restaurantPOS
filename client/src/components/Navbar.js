import React, { useState } from 'react';


const Navbar = () => {

   const [show, setshow] = useState(false);

   const openDrop = ()=> {
	   setshow(!show);
   }


    return (
        <div className="">
			<nav className="bg-white border-primary border-b-4 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
				<div className="">
					<ul className="flex flex-1 md:flex-none w-1/3 justify-content-center ml-11">
						<li className="flex-1 md:flex-none md:mr-3 border-primary border-4 px-4 py-2 w-full text-center">
						<a className="block py-2 px-4 text-primary font-semibold text-2xl" href="#"><i className="far fa-clock mr-2"></i><span>Counter Dashboard</span></a>
						</li>
						<li className="flex-1 md:flex-none md:mr-3 border-primary border-4 px-4 py-2 w-full text-center">
						<a className="block py-2 px-4 text-primary font-semibold text-2xl" href="#"><i className="far fa-clone mr-2"></i><span>POS</span></a>
						</li>
						
					</ul>
				</div>
			</nav>
		</div>
    )
}

export default Navbar

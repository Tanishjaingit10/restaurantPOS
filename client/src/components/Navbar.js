import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const Navbar = () => {
    return (
        <div>
            <nav className="bg-gray-200 p-2 mt-0 fixed w-full z-10 pin-t">
        <div className="container mx-auto flex flex-wrap items-center">
		    <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
				<a className="text-gray-900 no-underline hover:text-gray-700 hover:no-underline" href="#">
					<span className="text-2xl pl-2"><i className="em em-grinning"></i> Brand</span>
				</a>
            </div>
			<div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
				<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
				  <li className="mr-3">
					<a className="inline-block py-2 px-4 text-gray-600 no-underline" href="/">Home</a>
				  </li>
				  <li className="mr-3">
					<a className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="/about">About Me</a>
				  </li>
				  <li className="mr-3">
					<a className="bg-gray-400 rounded-lg inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="/signup">SignUp</a>
				  </li>
					<li className="mr-3">
					<a className="bg-gray-400 rounded-lg inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="/login">Login</a>
				  </li>
				</ul>
			</div>
        </div>
    </nav>


        </div>
    )
}

export default Navbar

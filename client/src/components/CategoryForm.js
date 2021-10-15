import React, { useState } from 'react'

const CategoryForm = () => {
    const [show, setShow] = useState(false);

    const openDrop = () => {
        setShow(!show);
    }
    return (
        <div>
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/menu"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Add Category</div>
                </div>
            </nav>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32 w-1/2 mx-auto mt-100">

                <form className="flex flex-col pt-3 md:pt-6 font-roboto font-bold text-2xl" onsubmit="event.preventDefault();">
                    <div className="flex flex-col pt-4">
                        <label for="name" className="">Name</label>
                        <input type="text" id="name" className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="description" className="">Description</label>
                        <input type="text" id="desc" className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex flex-col pt-4 ">
                        <label for="color" className="">Category Colour</label>
                        <ul className=" w-full mt-1 text-white ">
                            <li className=" flex-1 bg-primary">
                                <a href="#" className="block  align-middle  no-underline p-4 " onClick={openDrop}>
                                    Select Colour<span className="ml-40"><i className="fas fa-chevron-down ml-32"></i></span></a>
                            </li>
                            <li className={show ? " flex flex-wrap  bg-white py-4 pb-2 px-6 mx-auto" : "hidden"}>
                                <a href="#" className="block align-middle w-24 h-20 no-underline bg-teal m-2" />

                                <a href="#" className="block align-middle w-24 h-20  no-underline bg-mustard m-2 " />

                                <a href="#" className="block align-middle w-24 h-20 no-underline bg-tealblue m-2" />

                                <a href="#" className="block align-middle w-24 h-20 no-underline bg-lightgreen m-2" />

                                <a href="#" className="block align-middle w-24 h-20 no-underline bg-purple m-2" />

                                <a href="#" className="block align-middle w-24 h-20 no-underline bg-orange m-2" />

                                <a href="#" className="block align-middle w-24 h-20 no-underline bg-magenta m-2" />

                                <a href="#" className="block align-middle w-24 h-20 no-underline bg-lightorange m-2" />
                            </li>
                        </ul>
                    </div>
                    <button type="submit" className="bg-green text-white py-4 mt-10">Done</button>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm

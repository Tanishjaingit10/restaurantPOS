import React,{useState} from 'react'

const ItemForm = () => {
    const [show, setShow] = useState(false);
    const [cat, showCat] = useState(false);

    const openCat = ()=>{
        showCat(!cat);
    }

    const openDrop = ()=> {
        setShow(!show);
    }
    return (
        <div>
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/menu"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Add Food Item</div>
                </div>
            </nav>
            <div className="w-3/4 flex flex-wrap mx-auto font-roboto text-2xl font-bold">
                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0  w-1/2 px-4">

                    <form className="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                    <div className="flex flex-col pt-4">
                        <label for="discount" className="">Discount</label>
                        <input type="text" id="discount" className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="description" className="">Description</label>
                        <input type="text" id="desc" className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="time" className="">Time to Cook</label>
                        <input type="text" id="time" className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="description" className="">Description</label>
                        <ul className=" w-full mt-1 text-white ">
                            <li className=" flex-1 bg-primary">
                                <a href="#" className="block  align-middle  no-underline p-4">
                                    Select <span className="ml-44"><i className="fas fa-chevron-down ml-40"></i></span></a>
                            </li>
                            </ul>
                    </div>
                    <div className="flex flex-wrap pt-4">
                        <div className="w-2/3 pr-4"><label for="image" className="w-full">Image</label>
                        <input type="text" className="py-2 w-full focus:outline-none"/>
                        <button className="bg-primary text-white w-full py-2 mt-8">Choose File</button></div>
                        <div className="bg-gray-200 w-1/3 h-40 justify-items-end"></div>
                    </div>    
                    </form>

                </div>
                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0  w-1/2 px-4">

                    <form className="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                    <div className="flex flex-col pt-4">
                        <label for="discount" className="">Discount</label>
                        <input type="text" id="discount" className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="variant" className="">Variant</label>
                        <a className="shadow appearance-none bg-primary text-white text-center w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline">+</a>
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="price" className="">Item Unit Price</label>
                        <input type="text" id="price" className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="description" className="">Current Availability</label>
                        <ul className=" w-full mt-1 text-white ">
                            <li className=" flex-1 bg-primary">
                                <a href="#" className="block  align-middle  no-underline p-4" onClick={openDrop}>
                                    Select <span className="ml-44"><i className="fas fa-chevron-down ml-40"></i></span></a>
                            </li>
                            <li className={show?"flex-1 bg-primary":"hidden"}>
                                <a href="#" className="block  align-middle  no-underline p-4">Yes</a>
                            </li>
                            <li className={show?"flex-1 bg-primary":"hidden"}>
                                <a href="#" className="block  align-middle  no-underline p-4">No</a>
                            </li>
                            </ul>
                    </div>
                    <div className="flex flex-wrap pt-4">
                    <label for="description" className="">Category</label>
                    <ul className=" w-full mt-1 text-white ">
                            <li className=" flex-1 bg-primary">
                                <a href="#" className="block  align-middle  no-underline p-4 " onClick={openCat}>
                                    Select Colour<span className="ml-40"><i className="fas fa-chevron-down ml-32"></i></span></a>
                            </li>
                            <li className={cat ? " flex flex-wrap  bg-white py-4 pb-2 px-6 mx-auto" : "hidden"}>
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
                    </form>

                </div>
               


            </div>
        </div>
    )
}

export default ItemForm

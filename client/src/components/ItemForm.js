import React, { useState } from 'react';
import Popup from './Popup';
import days from '../days';
// import TimePicker from 'react-time-picker';
import TimePicker from 'react-gradient-timepicker';


const ItemForm = () => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [displayDays, setDisplayDays] = useState();
    const [showDays, setShowDays] = useState(false);
    const [showTime, setShowTime] = useState(false);
   
    // const [clock, setClock] = useState("");
    const openDrop = () => {
        setShow(!show);
    }

    let clock,st,et;
    const showStart = (e) => {
        st = e;
    }

    const showEnd = (e)=>{
        et = e;
    }

    const showWeek = () => {
        setShowDays(!showDays);
        setDisplayDays(
            days.map((obj) => {
                return <button value={obj.day} className="bg-primary p-2 text-white text-left px-6" onClick={() => setShowTime(!showTime)}>{obj.day}</button>
            })
        )

    }

    const openPop = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="h-screen justify-items-conter">
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/menu"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Add Food Item</div>
                </div>

            </nav>
            <div className=" w-full p-4 px-8">
                <form className=" w-full px-10 text-xl font-semibold font-roboto justify-items-center flex flex-col space-y-4">
                    <div className=" flex flex-col md:flex-row md:space-x-10 px-8 py-6">
                        <div className=" w-1/2 space-y-2 p-4">
                            <div className="flex flex-col bg-white">
                                <label htmlFor="name" className="mb-2">Name</label>
                                <input type="text" name="name" className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Description</label>
                                <input type="text" name="description" className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="time" className="mb-2">Time to Cook</label>
                                <input type="text" name="time" className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Available</label>
                                <ul className="bg-primary text-center text-white" onClick={openDrop}><li className="py-2">Select</li>
                                    {show ? <><li className="py-2">Everyday/All Time</li>
                                        <li className="py-2" onClick={openPop}>Select Day/Time</li></> : null}
                                </ul>
                            </div>
                            <div className="flex flex-row bg-white space-x-4">
                                <div className="flex flex-col w-2/3 space-y-2">
                                    <label className="mb-2">Image</label>
                                    <div className="border-gray-200 border-2 py-2">Image.png</div>
                                    <button className="bg-primary text-white py-2 font-bold">Choose File</button>
                                </div>
                                <div className="bg-gray-200 w-1/3 border-primary border-2">Item Picture</div>
                            </div>
                        </div>
                        <div className=" w-1/2 space-y-2 p-4">
                            <div className="flex flex-col bg-white">
                                <label htmlFor="discount" className="mb-2">Discount</label>
                                <input type="text" name="discount" className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="variant" className="mb-2">Variant</label>
                                <div className="bg-primary text-center py-2 text-white">+</div>
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="price" className="mb-2">Item Unit Price</label>
                                <input type="text" name="price" className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Current Availability</label>
                                <ul className="bg-primary text-center text-white" onClick={() => setOpen(!open)}><li className="py-2">Yes</li>
                                    {open ? <li className="py-2">No</li> : null}
                                </ul>
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Category</label>
                                <div className="bg-primary text-center py-2 text-white">Select Category</div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-green w-72 mx-auto text-white py-2 font-bold">Done</button>
                </form>
            </div>
            {isOpen && <Popup
                content={<>
                    <div className="flex flex-col px-8 space-y-4 text-white">
                        <button className="bg-green px-10 py-2" onClick={showWeek}>+</button>
                        <button className="bg-green px-10 py-2" onClick={openPop}>Done</button>
                    </div>
                </>}
                handleClose={openPop}
            />}
            {showDays && <div className="popup-box">
                <div className="flex flex-col w-80 mx-auto font-roboto font-bold mt-52">
                    {displayDays}
                    <button className="bg-green p-2 text-white text-center font-bold px-6" onClick={showWeek}>Done</button>
                </div>
            </div>}
            {showTime && <div className="popup-box">
                <div className="flex flex-col w-80 mx-auto font-roboto font-bold mt-72 bg-primary">
                    <div className="flex flex-row py-2">
                    <label className="text-white w-1/2 ml-2">Start Time:</label>
                    <TimePicker
                        time={st}
                        theme="Bourbon"
                        className="timepicker bg-primary text-white"
                  
                        onSet={(val) => {
                            showStart(val.format12);
                          }}
                    />
                    </div>
                    <div className="flex flex-row py-2">
                    <label className="text-white w-1/2 ml-2">End Time:</label>
                      <TimePicker
                        time={et}
                        theme="Bourbon"
                        className="timepicker bg-primary text-white"
                       
                        onSet={(val) => {
                            showEnd(val.format12);
                          }}
                    />
                    </div> 

                    <button className="bg-green p-2 text-white text-center font-bold px-6" onClick={() => setShowTime(!showTime)}>Done</button>
                </div>
            </div>}
           

          
        </div>
    )
}

export default ItemForm

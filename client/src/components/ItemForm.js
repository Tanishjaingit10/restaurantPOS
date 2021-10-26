import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import days from '../days';
import signup from '../popup';
// import TimePicker from 'react-time-picker';
import TimePicker from 'react-gradient-timepicker';
import { useHistory, useParams } from 'react-router-dom';


const ItemForm = () => {
    const history = useHistory();
    const [img,setImg] = useState("");
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cat, setCat] = useState(false);
    const [displayCat, setdisplayCat] = useState()
    const [displayDays, setDisplayDays] = useState();
    const [showDays, setShowDays] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [avail, setAvail] = useState(true)
    const [isError, setIsError] = useState(false);
    const [msg, setMsg] = useState("");
    const [item, setItem] = useState({ foodItem: "", category: "",  time: "", description: "", price: 0, availability: "", discount: 0, image: "", finalVariant: [], finalAvailable: [] })
    const [Var, setVar] = useState({ variant: "", description: "", price: "" })
    const [variant, setVariant] = useState(false);
    const [showAvailable, setShowAvailable] = useState(false);
    const [availabilty, setAvailability] = useState({ day: "", startTime: "", endTime: "" });
    const [list, setList] = useState();
    const [set, setAvailable]=useState(false);
    const [finalAvail, setFinalAvail]=useState([]);
    const [finalVar, setFinalVariant]=useState([]);
    const [imageStatus, setImageStatus]=useState('Upload')
    const [addList, setAddList] = useState();
    const [add, setAdd] = useState(false);
    const [popup, setPopup] = useState(false);
    const [allTime, showAllTime] = useState(false);
    let name,value;

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            setImg(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
        console.log({img})
      };
   
   
    
    const openDrop = () => {
        setShow(!show);
    }
   
    
    const handleInputs = (e) => {

        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setItem({ ...item, [name]: value });
        if(name==='image')
            setImageStatus('Image Uploaded')
    
    }


    const handleAvail = (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        if (value === 'Yes')
            setAvail(true);
        else setAvail(false);
        setItem({ ...item, [name]: value });
        console.log(item.availability)
    }
    const openCat = async (e) => {
        e.preventDefault();
        setCat(!cat);
        await fetch(
            "/app/category")
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setdisplayCat(json.map((option) => {
                    return (<li><button className="py-2" onClick={handleInputs} name="category" value={option.category}>{option.category}</button></li>)
                }))
            })

    }
    const handleVar = (e) => {
        name = e.target.name;
        value = e.target.value;
        console.log(name)
        console.log(value)
        setVar({ ...Var, [name]: value });
       
        // item.variant.push(value);
        // console.log(item.variant)
    }

    const newVariant = ()=>{
        setItem({...item, ['finalVariant']:finalVar})
    }

    useEffect(() => {
        setAddList(
            finalVar.map((obj)=>{
            return (<button className="bg-primary px-10 py-2 w-full mb-2">{obj.variant} / $ {obj.price}</button>)
            }))
    }, [finalVar])

    const addVariant = async (e) => {
        e.preventDefault();
        setAdd(true);
        setVariant(!variant)
        
        newVariant();
        // const res = await fetch("/app/addVariant", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         variant,description,price
        //     })

        // });
        console.log(Var)
        setFinalVariant(oldArray => [...oldArray, Var])

        


        
        
        
     
       console.log(Var)
       console.log(finalVar)
     
    }
    let clock, st, et;
    const showStart = (e) => {
        st = e;
        name = "startTime";
        value = e;
        console.log(st);
        setAvailability({ ...availabilty, [name]: value });
    }

    const showEnd = (e) => {
        et = e;
        name = "endTime";
        value = e;
        setAvailability({ ...availabilty, [name]: value });
        console.log(et);
    }
 
    const handleAvailable=(e)=>{
        setIsOpen(!isOpen)
        setAvailable(true)
        setItem({...item, ['finalAvailable']:finalAvail})

    }
    const handleDay = (e) => {
        e.preventDefault();
        setShowDays(!showDays);
        setShowTime(!showTime)
        name = e.target.name;
        value = e.target.value;
        setAvailability({ ...availabilty, [name]: value });
    }

    const showWeek = () => {
        setShowDays(!showDays);
        setDisplayDays(
            days.map((obj) => {
                return <button value={obj.day} name="day" className="bg-primary p-2 text-white text-left px-6" onClick={handleDay}>{obj.day}</button>
            })
        )

    }
     
    const showDayTime = ()=> {
        setShowDays(!showDays);
        setList(
            finalAvail.map((obj)=>{
            return (<button className="bg-primary px-10 py-2 w-full mb-2">{obj.day} | {obj.startTime} - {obj.endTime}</button>)
            }))
        //    <button className="bg-primary px-10 py-2">{availabilty.day} | {availabilty.startTime} - {availabilty.endTime}</button>
        

       
    }

    const dayTime = (e)=> {
        setShowTime(!showTime)
        setShowAvailable(true);
        setFinalAvail(oldArray => [...oldArray, availabilty])
        console.log(availabilty);
    }
    const onMenu = (e) => {
        history.push('/menu');
    }

    const onsubmit = async (e) => {

        e.preventDefault();
        setItem({...item, ['finalVariant']:finalVar})
        let { foodItem, category, time, description, price, availability, discount,image, finalVariant, finalAvailable } = item;
        if(allTime){finalAvailable = [{
            "day": "everyday",
            "startTime": "12:00 AM",
            "endTime": "11:59 PM"
        }]}
        console.log(item)
        console.log(availability)
        console.log(finalVariant)
        const res = await fetch("/app/addItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                foodItem, category, time, description, price, availability, discount, image, finalVariant, finalAvailable
            })

        });
        
        if (res.status === 201) {
            setMsg('Added Successfully');
            setPopup(!popup);
        }
        else {
            setIsError(!isError);
            let obj = signup.find((pop) => pop.id === res.status);
            setMsg(obj.title);
            console.log(msg);


        }

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
                <form className=" w-full px-10 text-xl font-semibold font-roboto justify-items-center flex flex-col space-y-4" method="POST" action="/additem" enctype="multipart/form-data">
                    <div className=" flex flex-col md:flex-row md:space-x-10 px-8 py-6">
                        <div className=" w-1/2 space-y-2 p-4">
                            <div className="flex flex-col bg-white">
                                <label htmlFor="name" className="mb-2">Name</label>
                                <input type="text" name="foodItem" onChange={handleInputs} value={item.foodItem} className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Description</label>
                                <input type="text" name="description" onChange={handleInputs} value={item.description} className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="time" className="mb-2">Time to Cook (in minutes)</label>
                                <input type="text" name="time" onChange={handleInputs} value={item.time} className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Available</label>
                                {set?<div className="text-white w-full">{list}</div>:null}
                                {allTime?<button className="bg-primary px-10 py-2 w-full mb-2 text-white">Everyday / All Time</button>:null}
                                <ul className="bg-primary text-center text-white cursor-pointer" onClick={()=>{setShow(!show)}}>
                                    
                                    <li className="py-2">Select</li>
                                    {show ? <><li className="py-2" onClick={()=>{showAllTime(!allTime)}}>Everyday/All Time</li>
                                        <li className="py-2" onClick={()=>{setIsOpen(!isOpen)}}>Select Day/Time</li></> : null}
                                </ul>
                            </div>
                            <div className="flex flex-row bg-white space-x-4">
                                <div className="flex flex-col w-2/3 space-y-2">
                                    <label className="mb-2">Image</label>
                                    <div className="border-gray-200 border-2 py-2"><input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} /></div>
                                    
                                    <button className="bg-primary text-white py-2 font-bold cursor-pointer" name="image" value={img} onClick={handleInputs}>{imageStatus}</button>
                                </div>
                                <div className="bg-gray-200 w-1/3 border-primary border-2 img-holder"><img src={img} className="image" alt="" id="img" className="img" /></div>
                            </div>
                            {/* <form method="POST" action="/upload-profile-pic" enctype="multipart/form-data"> */}
                                {/* <div>
                                    <label>Select your profile picture:</label>
                                    <input type="file" name="profile_pic" />
                                </div>
                                <div>
                                    <input type="submit" name="btn_upload_profile_pic" value="Upload" />
                                </div> */}
                            {/* </form> */}
                        </div>
                        <div className=" w-1/2 space-y-2 p-4">
                            <div className="flex flex-col bg-white">
                                <label htmlFor="discount" className="mb-2">Discount</label>
                                <input type="text" name="discount" onChange={handleInputs} value={item.discount} className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="variant" className="mb-2">Variant</label>
                                {add?<div className="text-white w-full">{addList}</div>:null}
                                <div className="bg-primary text-center py-2 text-white cursor-pointer" onClick={() => { setVariant(!variant) }}>+</div>
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="price" className="mb-2">Item Unit Price</label>
                                <input type="text" name="price" onChange={handleInputs} value={item.price} className=" border-2 border-black py-2" />
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Current Availability</label>
                                <ul className="bg-primary text-center text-white" onClick={() => setOpen(!open)}><li><button className="py-2" name="availability" value="Yes" onClick={handleAvail}> {avail ? 'Yes' : 'No'}</button></li>
                                    {open ? <li><button className="py-2" name="availability" value="No" onClick={handleAvail}>{avail ? 'No' : 'Yes'}</button></li> : null}
                                </ul>
                            </div>
                            <div className="flex flex-col bg-white">
                                <label htmlFor="description" className="mb-2">Category</label>
                                <ul className="bg-primary text-center py-2 text-white cursor-pointer" onClick={openCat}>{item.category ? item.category : 'Select Category'}
                                    {cat ? <>{displayCat}</> : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-green w-72 mx-auto text-white py-2 font-bold" onClick={onsubmit}>Done</button>
                </form>
            </div>
            {isOpen && <Popup
                content={<>
                    <div className="flex flex-col px-8 space-y-4 text-white">
                        {showAvailable ? <div className="">{list}</div>:null}
                        <button className="bg-green px-10 py-2" onClick={showWeek}>+</button>
                        <button className="bg-green px-10 py-2" onClick={handleAvailable}>Done</button>
                    </div>
                </>}
                handleClose={()=>{setIsOpen(!isOpen)}}
            />}
            {showDays && <div className="popup-box">
                <div className="flex flex-col w-80 mx-auto font-roboto font-bold mt-52">
                    {displayDays}
                    <button className="bg-green p-2 text-white text-center font-bold px-6" onClick={showDayTime}>Done</button>
                </div>
            </div>}
            {showTime && <div className="popup-box">
                <div className="flex flex-col w-80 mx-auto font-roboto font-bold mt-72 bg-primary">
                    <div className="flex flex-row py-2">
                    <label className="text-white w-1/2 ml-2">Start Time:</label>
                    <TimePicker
                        placeholder={availabilty.startTime}
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
                       placeholder={availabilty.endTime}
                        theme="Bourbon"
                        className="timepicker bg-primary text-white"
                        onSet={(val) => {
                            showEnd(val.format12);
                          }}
                    />
                    </div> 

                    <button className="bg-green p-2 text-white text-center font-bold px-6" onClick={dayTime}>Done</button>
                </div>
            </div>}
            {isError && <Popup
                content={<>

                    <p className='pb-4 font-bold text-red'>{msg}</p>
                    <button className="bg-green px-10 py-2" onClick={onsubmit}>Ok</button>
                </>}
                handleClose={onsubmit}
            />}
            {popup && <Popup
                content={<>

                    <p className='pb-4 font-bold text-green'>{msg}</p>
                    <button className="bg-primary px-10 py-2" onClick={onMenu}>Ok</button>
                </>}
                handleClose={onMenu}
            />}

            {variant && <div className="popup-box">
                <div className="bg-white p-4 px-10 w-96 mx-auto font-roboto font-bold mt-40">
                    <form className="flex flex-col">
                        <div className="flex flex-col py-2">
                            <label htmlFor="variant" className="mb-2">Variant</label>
                            <input type="text" name="variant" value={Var.variant} onChange={handleVar} className=" border-2 border-black py-2" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="description" className="mb-2">Description</label>
                            <input type="text" name="description" value={Var.description} onChange={handleVar} className=" border-2 border-black py-2" />
                        </div>
                        <div className="flex flex-col py-2">
                            <label htmlFor="price" className="mb-2">Price</label>
                            <input type="text" name="price" value={Var.price} onChange={handleVar} className=" border-2 border-black py-2" />
                        </div>
                        <button className="bg-green p-2 text-white text-center font-bold px-6 my-4" onClick={addVariant}>Done</button>
                    </form>
                </div>
            </div>}



        </div>
    )
}

export default ItemForm
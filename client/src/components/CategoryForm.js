import React, { useState } from 'react';
import color from '../color';

const CategoryForm = () => {
    const [show, setShow] = useState(false);
    const [cat, setCat] = useState({ category: "", description: "", color: ""});
    const [curr, setColour] = useState("");

    let name,value;
    const handleInputs = (e) => {
       
        name = e.target.name;
        value = e.target.value;
        setCat({ ...cat, [name]: value });
    }

    const setColor = (e)=> {
        cat.color = "1";
        console.log(cat.color);
        console.log(e.target.value);
    }

    const addCategory = async() => {
        const { category, description, color} = cat;
        
        /*const res = await fetch("/app/addCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category, description, color
            })
        });
       
        const data = await res.json();*/
        console.log(cat);
    }

    const openDrop = () => {
        setShow(!show);
        let colors = color.filter((col) => col.check===true);
        console.log(colors);
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
                        <input type="text" name="category" value={cat.category} onChange={handleInputs} className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="description" className="">Description</label>
                        <input type="text"  name="description" value={cat.description} onChange={handleInputs} className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex flex-col pt-4 ">
                        <label for="color" className="">Category Colour</label>
                        <ul className=" w-full mt-1 text-white ">
                            <li className=" flex-1 bg-primary">
                                <a href="#" className="block  align-middle  no-underline p-4 " onClick={openDrop}>
                                    Select Colour<span className="ml-40"><i className="fas fa-chevron-down ml-28"></i></span></a>
                            </li>
                            <li className={show ? " flex flex-wrap  bg-white py-4 pb-2 px-6 mx-auto" : "hidden"}>
                            {color.map((option) => (
                                    <a value={option.code} name="color" onClick={setColor(option.code)} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer" style={{backgroundColor:option.code}}></a>
                            ))}
                               {/* <a value={cat.color="#39BEB9"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-tealblue" ></a>
                                <a value={cat.color="#F2AD22"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-mustard" ></a>
                                <a value={cat.color="#16B6AA"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-teal" ></a>
                                <a value={cat.color="#BCD63D"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-lightgreen" ></a>
                                <a value={cat.color="#5B64AF"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-purple" ></a>
                                <a value={cat.color="#F15A25"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-orange" ></a>
                                <a value={cat.color="#E71880"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-pink" ></a>
                                <a value={cat.color="#F47621"} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 cursor-pointer bg-lightorange" ></a>
                        */}
                                </li>
                            </ul>
                    </div>
                    <button type="submit" className="bg-green text-white py-4 mt-10" onClick={addCategory}>Done</button>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm

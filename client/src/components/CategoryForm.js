import React, { useState } from 'react';
import colour from '../color';
// import { useHistory } from 'react-router-dom';
const CategoryForm = () => {
    // const history = useHistory();
    const [show, setShow] = useState(false);
    const [colours, setColours] = useState([]);
    const [cat, setCat] = useState({ category: "", description: "", color: ""});
    const [displayColor, setdisplayColor]= useState();
    let name,value;

    
    const handleInputs = (e) => {
       e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        console.log(name)
        console.log(value)
        setCat({ ...cat, [name]: value });

    }

    

    const addCategory = async(e) => {
        e.preventDefault();
        const { category, description, color} = cat;
        const res = await fetch("/app/addCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category, description, color
            })
            
        });
       
        const data = await res.json();
        console.log(cat);
        colour.map((option) => {
            if(option.code===cat.color)
                option.check=false;
        }
        )
        // if (res.status === 201) {
        //     let ans = "Registration Successful";
        //     //setMsg(ans);
        //     console.log(ans);
        //     history.push("/menu");
           
        // }

    }

    const openDrop = async (e) => {
        e.preventDefault();
        setShow(!show);
        // await fetch(
        //     "/app/colours")
        //                 .then((res) => res.json())
        //                 .then((json) => {
        //                     console.log(json)
        //                     let colors = json.filter((col) => col.check===true);
        //                     console.log(colors);
                           
        //                     // setColours(json)

        //                     // console.log(colours)
        //                     setdisplayColor(colors.map((option)=>{
        //                         console.log(option.code)
        //                         console.log(option)
        //                         return (<button value={option.code} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 " style={{backgroundColor:option.code}}></button>)
        //                     }))
        //                 })
        // let colors = colours.filter((col) => col.check===true);
        // console.log(colors);
        
    }
    const col = async(e)=> await fetch(
        "/app/colours")
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json)
                        let colorss = json.filter((col) => col.check===true);
                        let colors = colour.filter((col) => col.check===true);
                        console.log(colors);
                        console.log(colorss);
                        console.log(typeof(colors))
                        console.log(typeof(colorss))
                        e.preventDefault();
                        setShow(!show);
                        // setColours(json)

                        // console.log(colours)
                        setdisplayColor(colorss.map((option,index)=>{
                            
                            console.log(option.code)
                            console.log(typeof(option.code))
                            console.log(option)
                            return (<button key = {index} value={option.code} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 " style={{backgroundColor:JSON.stringify(option.code)}}></button>)
                        }))
                    })
    return (
        <div>
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/menu"><i className="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Add Category</div>
                </div>
            </nav>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32 w-1/2 mx-auto mt-100">

                <form className="flex flex-col pt-3 md:pt-6 font-roboto font-bold text-2xl">
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
                        <div className=" w-full mt-1 text-white ">
                            <div className=" flex-1 bg-primary">
                                <a href="#" className="block  align-middle  no-underline p-4 " onClick={col}>
                                    Select Colour<span className="ml-40"><i className="fas fa-chevron-down ml-28"></i></span></a>
                            </div>
                            <div className={show ? " flex flex-wrap  bg-white py-4 pb-2 px-6 mx-auto" : "hidden"}>
                                {displayColor}
                            {/* {colour.map((option) => {
                                console.log(option.check)
                                if (option.check===true) {
                                    <button value={option.code} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 " style={{backgroundColor:option.code}}></button>
                                }
                                // <button value={option.code} name="color" onClick={handleInputs} className="block align-middle w-24 h-20 no-underline m-2 " style={{backgroundColor:option.code}}></button>

                            })}
                                     */}
                        
                                </div>
                            </div>
                    </div>
                    <button type="submit" className="bg-green text-white py-4 mt-10" onClick={addCategory}>Done</button>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm

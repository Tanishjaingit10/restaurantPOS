import React, { useState, useEffect } from 'react';
import colour from '../color';
import Popup from './Popup';
import signup from '../popup';
import { useHistory, useParams } from 'react-router-dom';
const CategoryForm = () => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [col, setCol] = useState('primary');
    const [text, setText] = useState('Select Colour')
    const [cat, setCat] = useState({ category: "", description: "", color: "" });
    const [displayColor, setdisplayColor] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    
    let name, value;

    const handleInputs = (e) => {
        
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        console.log(name)
        console.log(value)
        setCat({ ...cat, [name]: value });
    }
    const onMenu = (e) => {
        history.push('/menu');
    }
    const handleColor = (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setCol(value)
        setText(value)
        setCat({ ...cat, [name]: value });
    }

    const loadCategory = async () => {
        await fetch(`/app/category/${id}`).then((res) => res.json())
            .then((json) => {
                setCol(json.color)
                setText(json.color)
                setCat(json)
            })
    }
    useEffect(() => {
        console.log(id)
        if (id) {
            loadCategory();
        }
    })

    const addCategory = async (e) => {
        e.preventDefault();
        const { category, description, color } = cat;
        let res;
        if (id) {
            res = await fetch(`/app/updateCategory/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category, description, color
                })

            });
        }
        else {
            res = await fetch("/app/addCategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category, description, color
                })

            });

        }

        await res.json();
        console.log(cat);

        console.log(res.status)
        if (res.status === 201) {
            setMsg('Added Successfully');
            let code;
            colour.map((option) => {
                if (option.name === cat.color) { code = option.code; }
                return null;
            })
            setIsOpen(!isOpen);
            await fetch(
                `/app/updateColour/${color}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: color, code: code, check: false
                })
            })
                .then((res) => res.json())
                .then((json) => console.log(json))

        }
        else {
            let obj = signup.find((pop) => pop.id === res.status);
            setMsg(obj.title);
            console.log(msg);
            setIsError(!isError);

        }

    }

    const openDrop = async (e) => {
        e.preventDefault();
        setShow(!show);
        await fetch(
            "/app/colours")
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                let colors = json.filter((col) => col.check === true);
                setdisplayColor(colors.map((option) => {
                    return (<button value={option.name} name="color" onClick={handleColor} className="hover:bg-black-700 block align-middle w-24 h-20 no-underline m-2 " style={{ backgroundColor: option.code }}></button>)
                }))
            })

    }


    return (
        <div>
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white"><a href="/menu"><i className="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">{id ? 'Edit Category' : 'Add Category'}</div>
                </div>
            </nav>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 md:px-24 lg:px-32 w-2/3 mx-auto">

                <form className="px-6 flex flex-col pt-3 md:pt-6 font-roboto font-bold text-2xl">
                    <div className="flex flex-col pt-4">
                        <label htmlFor="name" className="">Name</label>
                        <input type="text" name="category" value={cat.category} onChange={handleInputs} className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="description" className="">Description</label>
                        <input type="text" name="description" value={cat.description} onChange={handleInputs} className="shadow appearance-none border-2 border-black  w-full py-2 px-3  mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex flex-col pt-4 ">
                        <label for="color" className="">Category Colour</label>
                        <div className=" w-full mt-1 text-white ">
                            <div className=" flex flex-row bg-primary" style={{ backgroundColor: col }}>
                                <button className="block  align-middle  no-underline p-4 " onClick={openDrop}>
                                    {text}<span ><i className="fas fa-chevron-down ml-72"></i></span></button>
                            </div>
                            <div className={show ? " flex flex-wrap  bg-white py-4 pb-2 px-6 mx-auto" : "hidden"}>
                                {displayColor}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-green text-white py-4 mt-10" onClick={addCategory}>Done</button>
                </form>
            </div>
            {isOpen && <Popup
                content={<>

                    <p className='pb-4 font-bold text-green'>{msg}</p>
                    <button className="bg-primary px-10 py-2" onClick={onMenu}>Ok</button>
                </>}
                handleClose={onMenu}
            />}
            {isError && <Popup
                content={<>

                    <p className='pb-4 font-bold text-red'>{msg}</p>
                    <button className="bg-green px-10 py-2" onClick={addCategory}>Ok</button>
                </>}
                handleClose={addCategory}
            />}
        </div>
    )
}

export default CategoryForm

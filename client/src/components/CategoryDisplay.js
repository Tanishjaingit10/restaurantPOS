import React, { useState,useEffect } from 'react'
import { useHistory, useParams} from 'react-router-dom';
import colour from '../color';
import Popup from './Popup';
const CategoryDisplay = () => {
    const history = useHistory();
    const [cat, setCat]=useState({category:"", description:"",color:""})
    const {id}= useParams();
    const [displayitem, setDisplayItem]=useState();
    console.log(id);
    const [show, setShow] = useState(false);
    const showItems= async (e)=>{
        e.preventDefault();
        setShow(!show)
        const result = await fetch('/app/items').then((res) => res.json())
        .then((json) => {
            console.log(json)
            setDisplayItem(json.map((option) => {
                if(option.category===id)
                {
                    return(<div className="bg-gray-200 w-1/3 border-primary border-2 img-holder"><img src={option.image} className="image" alt="" id="img" className="img" /></div>)
                }
            }))

        })
    
    }
    const loadCategory = async ()=>{
        const result = await fetch(`/app/category/${id}`).then((res) => res.json())
        .then((json) => {
            console.log(json)
            setCat(json)
        })
    }
    const deleteCat= async ()=>{
        let code;
        await fetch(`/app/removeCategory/${id}`,{
            method: "DELETE",
        }).then((res) => res.json())
        .then((json)=>{console.log(json)})

        colour.map((option) => {
            if (option.name === cat.color) { code = option.code; }

        })

        await fetch(
            `/app/updateColour/${cat.color}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:cat.color, code: code, check: false
            })
        })
            .then((res) => res.json())
            .then((json) => console.log(json))
        history.push('/menu')

    }

    useEffect(() => {
        loadCategory();
    }, [])
    return (
        <div className="justify-content-center h-screen">
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/menu"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Category</div>
                </div>
            </nav>
            <div className=" h-screen mx-10 px-8 space-y-8 py-4">
                <div className=" w-full flex flex-row p-6 space-x-10 ">
                    <div className=" w-1/2 font-bold font-roboto px-12 flex flex-col justify-center mx-auto text-xl my-auto py-8">
                        <div className="flex flex-row pt-4 bg-white">
                            <label className="text-black w-1/2">Category Name</label><span className="text-primary w-1/2">{cat.category}</span>
                        </div>
                        <div className="flex flex-row pt-4 bg-white">
                            <label className="text-black w-1/2">Category Description</label><span className="text-primary w-1/2">{cat.description}</span>
                        </div>
                    </div>
                    <div className=" w-1/2 font-bold font-roboto px-12 flex flex-col justify-center mx-auto text-xl py-8 my-auto">
                    <div className="flex flex-row pt-4 bg-white">
                            <label className="text-black w-1/2">Category Color</label><span className="p-8 w-1/2" style = {{backgroundColor: cat.color}}></span>
                        </div>
                    </div>
                </div>
                <div className=" w-full">
                    <div className=" flex flex-col w-96 justify-center mx-auto text-xl my-auto">
                    <button className=" bg-primary text-white font-bold py-4 my-4" onClick={showItems}><a href={"/itemdisplay/"+id}>View Food Items in Category</a></button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href="/additem">Add New Food Item</a></button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href={"/editcategory/"+id}>Edit Category Details</a></button>
                    <button className="bg-gray-400 hover:bg-red text-white font-bold py-4  my-4" onClick={deleteCat}>Delete</button>
                    </div>
                </div>
            </div>
            {show && <Popup
                content={<>

                    {displayitem}
                </>}
                handleClose={showItems}
            />}
        </div>
    )
}

export default CategoryDisplay


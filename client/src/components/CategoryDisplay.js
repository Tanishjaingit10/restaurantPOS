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
    const [check, setCheck]=useState(false);
    const [Open,setOpen]=useState(false);
    const showItems= async (e)=>{
        e.preventDefault();
        setShow(!show)
        await fetch('/app/items').then((res) => res.json())
        .then((json) => {
            // console.log(json)
            setDisplayItem(json.map((option) => {
                if(option.category===id)
                {
                     return(<div className="relative rounded-2xl shadow-2xl m-4 w-44 font-roboto text-xl"><img src={option.image} alt="" id="img" />
                     <span className="absolute right-0 top-0 text-center w-20 py-2 bg-white">{option.price}</span><div className="text-center py-2">{option.foodItem}</div></div>
                     )
                }
                return null;
            }))

        })
    
    }
    const loadCategory = async ()=>{
        await fetch(`/app/category/${id}`).then((res) => res.json())
        .then((json) => {
            console.log(json)
            setCat(json)
        })
    }
    const onMenu = async()=>{
        history.push('/menu');
    }
    const deleteCat= async ()=>{
        let code;
        await fetch(`/app/removeCategory/${id}`,{
            method: "DELETE",
        }).then((res) => res.json())
        .then((json)=>{console.log(json)})

        colour.map((option) => {
            if (option.name === cat.color) { code = option.code; }
            return null;
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
            setOpen(!Open)

    }
    const delCheck = async (e)=>{
        e.preventDefault();
        setCheck(!check);

    }

    useEffect(() => {
        loadCategory();
    })
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
                    <button className="bg-gray-400 hover:bg-red text-white font-bold py-4  my-4" onClick={delCheck}>Delete</button>
                    </div>
                </div>
            </div>
            {show && <div className="popup-box">
                <div className="w-1/2 bg-white mx-auto flex flex-wrap justify-evenly mt-10">
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white text-center cursor-pointer" onClick={()=>{setShow(!show)}} >
                    <span className=" text-gray-500 text-center object-center text-xl">x</span>
                    </div>
                    {displayitem}
                </div>
                
            </div>}
            {check && <Popup
                content={<>

                    <p className='font-bold text-green'>Please confirm to delete the category?</p>
                    <button className="mt-10 bg-primary px-10 py-2" onClick={deleteCat}>Confirm</button>
                </>}
                handleClose={delCheck}
            />}
            {Open && <Popup
                content={<>

                    <p className='font-bold text-green'>Deleted Successfully</p>
                    <button className="mt-10 bg-primary px-10 py-2" onClick={onMenu}>Ok</button>
                </>}
                handleClose={onMenu}
            />}
            

            
        </div>
    )
}

export default CategoryDisplay


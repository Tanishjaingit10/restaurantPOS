import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
const Menu = () => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [displayCategory, setDisplayCategory] = useState(false);

    const openCategory = (id)=> (e)=>{
        console.log(id)
        history.push(`/categorydisplay/${id}`)
    }
    const openMenu = async (e) => {
         e.preventDefault();
         setShow(!show);
         await fetch(
            "/app/category")
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setDisplayCategory(json.map((option) => {
                    return (<button value={option.category} name="color" onClick={openCategory(option.category)} className="hover:bg-gray-300 block align-middle py-4 px-6 w-44 no-underline m-2 " style={{ backgroundColor: option.color }}>{option.category}</button>)
                }))
            })


    }

    return (
        <div className=" text-white font-roboto">
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
            <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
           <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">Menu</div>
           </div>
            </nav>
            <div className="flex flex-col w-96 justify-center mx-auto h-auto top-36 mt-44 text-xl">
                    <button className=" bg-primary text-white font-bold py-4 my-4" onClick={openMenu}>View Menu</button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href="/addcategory">Add new category</a></button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href="/additem">Add new food item</a></button>
            </div>
            
            {show && <div className="popup-box">
                <div className=" w-96 mx-auto font-roboto font-bold mt-52 bg-white relative">
                    <div className="text-gray-400 text-center cursor-pointer rounded-full w-8 h-8 absolute -top-2 -right-4 bg-white" onClick={()=>{setShow(!show)}}><span className="text-lg">x</span></div>
                    <div className="flex flex-wrap">
                    {displayCategory}
               </div>
                </div>
            </div>}
            
        </div>
    )
}

export default Menu

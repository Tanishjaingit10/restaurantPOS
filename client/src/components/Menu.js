import React from 'react'

const Menu = () => {
    return (
        <div className=" text-black">
            <div className="inline ">
                    <button className="bg-white text-gray-800 font-bold p-2 rounded-lg mx-10"><a href="/addItem">Add item</a></button>
                    <button className="bg-white text-gray-800 font-bold p-2 rounded-lg mx-10"><a href="/addItem">Edit item</a></button>
            </div>
        </div>
    )
}

export default Menu

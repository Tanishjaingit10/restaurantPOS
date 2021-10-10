import React from 'react'

const Menu = () => {
    return (
        <div className=" text-black">
            <div className="flex flex-col w-96 mt-100 justify-center mx-auto">
                    <button className=" bg-yellow-600 text-white font-bold py-4 my-4"><a href="/addItem">View Menu</a></button>
                    <button className="bg-yellow-600 text-white font-bold py-4  my-4"><a href="/addcategory">Add new category</a></button>
                    <button className="bg-yellow-600 text-white font-bold py-4  my-4"><a href="/additem">Add new food item</a></button>
            </div>
        </div>
    )
}

export default Menu

import React from 'react'

const CategoryForm = () => {
    return (
        <div>
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32 w-1/2 mx-auto mt-100">
                <p className="text-center text-3xl">Add Category</p>
            <form className="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                    <div className="flex flex-col pt-4">
                        <label for="name" className="text-lg">Name</label>
                        <input type="text" id="name" placeholder="Italian" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="flex flex-col pt-4">
                        <label for="description" className="text-lg">Description</label>
                        <textarea type="text" id="email" placeholder="Italian dish description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex flex-col pt-4">
                        <label for="color" className="text-lg">Color</label>
                        <select>
                            <option>Select</option>
                            <option>Green</option>
                            <option>Red</option>
                            <option>Blue</option>
                        </select>
                    </div>
                    
    
                   
    
                    <button type="submit" className="bg-yellow-600 text-white font-bold text-lg hover:bg-green-600 p-2 mt-8">Add Category </button>
                </form>
                </div>
        </div>
    )
}

export default CategoryForm

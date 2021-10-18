import React from 'react'

const ItemForm = () => {
    return (
        <div>
             <div class="w-full flex flex-row">



<div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
    
    <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
        <div class="flex flex-col pt-4">
            <label for="name" class="text-lg">Name</label>
            <input type="text" id="name" placeholder="John Smith" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div class="flex flex-col pt-4">
            <label for="description" class="text-lg">Description</label>
            <input type="text" id="description" placeholder="Describe your item" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div class="flex flex-col pt-4">
            <label for="time" class="text-lg">Time to cook</label>
            <input type="text" id="time" placeholder="Time to cook" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div class="flex flex-col pt-4">
            <label for="available" class="text-lg">Available</label>
            <select id="available" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                <option>Select</option>
                <option>Everyday/All time</option>
                <option>Select Day/Time</option>
                </select>
           
        </div>
        <div class="flex flex-col pt-4">
            <label for="image" class="text-lg">Add image</label>
            <input type="text" id="time" placeholder="Time to cook" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <input type="submit" value="Register" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
    </form>
  
</div>
<div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
    
    <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
        <div class="flex flex-col pt-4">
            <label for="discount" class="text-lg">Discount</label>
            <input type="text" id="name" placeholder="Discount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div class="flex flex-col pt-4">
            <label for="description" class="text-lg">Variant</label>
            <select>
                <option></option>
            </select>
        </div>

        <div class="flex flex-col pt-4">
            <label for="time" class="text-lg">Time to cook</label>
            <input type="text" id="time" placeholder="Time to cook" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div class="flex flex-col pt-4">
            <label for="available" class="text-lg">Available</label>
            <select id="available" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                <option>Select</option>
                <option>Everyday/All time</option>
                <option>Select Day/Time</option>
                </select>
           
        </div>
        <div class="flex flex-col pt-4">
            <label for="image" class="text-lg">Add image</label>
            <input type="text" id="time" placeholder="Time to cook" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <input type="submit" value="Register" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
    </form>
  
</div>


</div>
        </div>
    )
}

export default ItemForm

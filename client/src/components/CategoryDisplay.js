import React from 'react'

const CategoryDisplay = () => {
    return (
        <div className="overflow-hidden justify-content-center h-screen">
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
                            <label className="text-black w-1/2">Category Name</label><span className="text-primary w-1/2">Category Name</span>
                        </div>
                        <div className="flex flex-row pt-4 bg-white">
                            <label className="text-black w-1/2">Category Description</label><span className="text-primary w-1/2">Description abshchs hfjdushdbchsg</span>
                        </div>
                    </div>
                    <div className=" w-1/2 font-bold font-roboto px-12 flex flex-col justify-center mx-auto text-xl py-8 my-auto">
                    <div className="flex flex-row pt-4 bg-white">
                            <label className="text-black w-1/2">Category Color</label><span className="text-primary w-1/2">Color</span>
                        </div>
                    </div>
                </div>
                <div className=" w-full">
                    <div className=" flex flex-col w-96 justify-center mx-auto text-xl my-auto">
                    <button className=" bg-primary text-white font-bold py-4 my-4"><a href="/categorydisplay">View Food Items in Category</a></button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href="/addcategory">Add New Food Item</a></button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href="/editcategory">Edit Category Details</a></button>
                    <button className="bg-gray-400 hover:bg-red text-white font-bold py-4  my-4"><a href="/deletecategory">Delete</a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryDisplay


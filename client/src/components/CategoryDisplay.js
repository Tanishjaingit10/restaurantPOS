import React from 'react'

const CategoryDisplay = () => {
    return (
        <div className="overflow-hidden justify-content-center">
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/menu"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Category</div>
                </div>
            </nav>
            <div className="bg-red mt-8 h-screen mx-10 p-8">
                <div className="bg-yellow w-full h-1/2 flex flex-row p-6 space-x-10">
                    <div className="bg-blue w-1/2 font-bold text-xl font-roboto px-12">
                        <div className="flex flex-row pt-4 space-x-10 bg-white text-center">
                            <label className="text-black">Category Name</label><span className="text-primary">Category Name</span>
                        </div>
                        <div className="flex flex-row pt-4 space-x-10 bg-white text-center">
                            <label className="text-black">Category Description</label><span className="text-primary">Description</span>
                        </div>
                    </div>
                    <div className="bg-blue w-1/2 font-bold text-xl font-roboto px-12">
                    <div className="flex flex-row pt-4 space-x-8 bg-white">
                            <label className="text-black">Category Color</label><span className="text-primary">Color</span>
                        </div>
                    </div>
                </div>
                <div className="bg-green w-full h-1/2 py-8">
                    <div className="bg-pink flex flex-col w-96 justify-center mx-auto text-xl my-auto">
                    <button className=" bg-primary text-white font-bold py-4 my-4"><a href="/categorydisplay">View Menu</a></button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href="/addcategory">Add new category</a></button>
                    <button className="bg-primary text-white font-bold py-4  my-4"><a href="/additem">Add new food item</a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryDisplay


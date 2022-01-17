import React, { useState } from "react";
import ReactModal from "react-modal";
import EditCategoryButton from "./EditCategoryButton";

function CategoryButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button 
                onClick={() => setIsOpen((prev) => !prev)}
                className="px-8 py-3 font-bold text-gray-500 text-xl m-2 border shadow-md border-black rounded-md"
            >
                Appetizers
            </button>

            <ReactModal
                isOpen={isOpen}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(2px)",
                    },
                }}
                contentLabel={"Add Category Modal"}
                className={
                    "flex justify-center absolute z-50 items-center w-screen h-screen"
                }
            >
                <div className=" p-10 flex flex-col items-center relative bg-white rounded-xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fas fa-times absolute text-2xl right-6 top-4"
                    />
                    <div className="text-center font-semibold text-3xl mb-6 text-red font-semibold">
                        Category - Appetizers
                    </div>
                    <div className="w-2/3">
                        <div className="my-4">
                            <div className="text-gray-500 text-sm">Category Name</div>
                            <div className="font-semibold">Appetizer</div>
                        </div>
                        <div className="my-4">
                            <div className="text-gray-500 text-sm">Category Discription</div>
                            <div className="font-semibold">Discription of this category ....</div>
                        </div>
                        <div className="flex justify-between my-4">
                            <div className="text-gray-500">
                                <div className="my-4 text-lg">
                                    Category Image
                                </div>
                                <div className="m-2 font-medium">Image.jpg</div>
                            </div>
                            <div className="border border-red h-36 w-36"></div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button onClick={()=>setIsOpen(false)} className="rounded-lg p-3 w-40 font-medium m-2 bg-red text-white">
                            Menu
                        </button>
                        <button className="rounded-lg p-3 w-40 font-medium m-2 bg-red text-white">
                            - Delete Category
                        </button>
                        <EditCategoryButton/>
                    </div>
                </div>
            </ReactModal>
        </>
    );
}

export default CategoryButton;

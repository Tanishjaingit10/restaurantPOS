import React, { useState } from "react";
import ReactModal from "react-modal";

function EditCategoryButton() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [discription, setDiscription] = useState("");

    const handleImageUpload = (e) => {
        const img = e.target.files[0];
        setImageName(img.name);
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
                console.log(reader.result);
            }
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("okk");
    };

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="rounded-lg p-3 w-40 font-medium m-2 bg-green text-white"
            >
                + Edit Category
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
                className="flex justify-center absolute z-50 items-center w-screen h-screen"
            >
                <div className="w-5/12 h-5/6 p-10 flex flex-col items-center relative bg-white rounded-xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fas fa-times absolute text-2xl right-6 top-4"
                    />
                    <div className="text-center text-3xl mb-6 text-red font-semibold">
                        Edit Category
                    </div>
                    <form className="w-2/3" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            name="Category"
                            type="text"
                            required
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter Category Name"
                            className="w-full p-4 font-medium rounded-md border-gray-400 border outline-none transition duration-150 ease-in-out mb-4 mt-2"
                        />
                        <input
                            name="Discription"
                            type="text"
                            value={discription}
                            onChange={(e) => setDiscription(e.target.value)}
                            placeholder="Enter Category Discription"
                            className="w-full p-4 font-medium rounded-md border-gray-400 border outline-none transition duration-150 ease-in-out mb-4 mt-2"
                        />
                        <div className="flex justify-between mt-4">
                            <div className="text-gray-500 flex flex-col justify-between">
                                <div className="m-2">
                                    Select Category Image
                                    <div className="text-lg font-medium">
                                        {imageName}
                                    </div>
                                </div>
                                <div className="m-4">
                                    <label
                                        className="rounded-lg px-6 p-3 font-medium bg-red text-white"
                                        htmlFor="image"
                                    >
                                        Choose File
                                    </label>
                                    <input
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e)}
                                        id="image"
                                    />
                                </div>
                            </div>
                            <div>
                                <img
                                    className="border border-red w-40 h-40"
                                    src={image}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="rounded-lg p-3 w-40 font-medium m-4 bg-red text-white"
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </ReactModal>
        </>
    );
}

export default EditCategoryButton;

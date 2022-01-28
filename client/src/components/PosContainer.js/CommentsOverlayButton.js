import React, { useState } from "react";
import { Modal } from "../Common/Modal";

function CommentsOverlayButton({
    item,
    children,
    comments,
    setComments,
    ...rest
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault()
        setComments(e.target.comment.value)
        setIsOpen(false)
    }

    return (
        <>
            <button onClick={() => setIsOpen((prev) => !prev)} {...rest}>
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="px-20 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    Comments
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-10">
                        <textarea
                            type="text"
                            name="comment"
                            defaultValue={comments}
                            className="border text-gray-500 border-gray-300 rounded-md p-4 h- w-80"
                            rows={7}
                            placeholder="Add comments..."
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-red p-2 text-white font-semibold px-10 rounded-md"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default CommentsOverlayButton;

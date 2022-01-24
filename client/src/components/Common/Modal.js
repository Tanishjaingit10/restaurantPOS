import React from "react";
import ReactModal from "react-modal";

export const Modal = ({ children, isOpen, controller, ...rest }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            ariaHideApp={false}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => controller(false)}
            overlayClassName={
                "fixed z-40 top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-xs backdrop-filter"
            }
            {...rest}
        >
            {children}
        </ReactModal>
    );
};

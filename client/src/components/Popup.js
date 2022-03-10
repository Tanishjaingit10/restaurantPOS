import React from "react";
import { GrClose } from "react-icons/gr";

const Popup = (props) => {
    return (
        <div className="popup-box">
            <div className="box text-center pt-20 pb-16">
                <GrClose
                    onClick={props.handleClose}
                    className="cursor-pointer"
                    style={{
                        marginTop: -60,
                        marginLeft: "90%",
                        marginBottom: 20,
                    }}
                />
                {props.content}
            </div>
        </div>
    );
};

export default Popup;

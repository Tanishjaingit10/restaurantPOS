import React, { useEffect, useState } from "react";

const UserContext = React.createContext("light");

function UserProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const authenticate = () => {
        const token = localStorage.getItem("token");
        if (token) setIsAuthenticated(true);
        else setIsAuthenticated(false);
    };
    useEffect(() => {
        authenticate();
    }, []);

    return (
        <UserContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, authenticate }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

import React, { useState, createContext, useEffect } from "react";

export const CustomersContext = createContext();

export const CustomersProvider= (props)=>{

    const [customers, setCustomers] = useState([])

    const fetchCustomers = async () => {
        const response = await fetch("/app/customers")
          .then((res) => res.json())
          .catch((err) => {
            console.log("Error", err);
          });
        setCustomers(response);
      };
      useEffect(() => {
        fetchCustomers();
        //eslint-disable-next-line
      }, []);


    return (
        <div>
            <CustomersContext.Provider value = {[customers, setCustomers]}>
                {props.children}
            </CustomersContext.Provider>
        </div>
    );
}
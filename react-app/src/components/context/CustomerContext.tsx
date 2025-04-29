import React, { createContext } from "react";
import { Customer, emptyCustomer } from "../interfaces/Customer";

interface CustomerContextType {
    customer: Customer;
    setCustomer: (customer: Customer) => void;
}


export const CustomerContext = createContext<CustomerContextType>({customer: emptyCustomer, setCustomer: () => {}});

/*
const CustomerProvider: React.FC<{children: React.ReactNode}> = (children: React.ReactNode) => {
    const [customer, setCustomer] = React.useState<Customer>(emptyCustomer);

    return (
        <CustomerContext.Provider value={{customer, setCustomer}}>
            {children}
        </CustomerContext.Provider>
    )
}
    */
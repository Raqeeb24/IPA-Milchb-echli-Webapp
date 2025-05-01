import React, { createContext } from "react";
import { Customer, emptyCustomer } from "../interfaces/Customer";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../../config";
import { enqueueSnackbar } from "notistack";

interface CustomerContextType {
    customer: Customer;
    setCustomer: (customer: Customer) => void;
}

export const CustomerContext = createContext<CustomerContextType>({ customer: emptyCustomer, setCustomer: () => { } });

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customer, setCustomer] = React.useState<Customer>(emptyCustomer);

    React.useEffect(() => {
        if (customer.customerId > 0) {
            return;
        }

        const encryptedCustomer = Cookies.get("customer");
        if (!encryptedCustomer) {
            return;
        }
        try {
            const decryptedCustomer = CryptoJS.AES.decrypt((encryptedCustomer), SECRET_KEY).toString(CryptoJS.enc.Utf8);
            const parsedDecryptedCustomer = JSON.parse(decryptedCustomer);
            setCustomer(parsedDecryptedCustomer);
            console.log("provider", parsedDecryptedCustomer);
        } catch (error) {
            enqueueSnackbar(`Fehler beim entschlüsseln des Cookies: ${error}`, { variant: "error" });
        }
    }, []);


    return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
            {children}
        </CustomerContext.Provider>
    )
}
import axios from "axios";
import { Customer } from "./components/interfaces/Customer";
import { enqueueSnackbar } from "notistack";

const instance = axios.create({
    baseURL: "https://localhost:7160/"
});

const ApiRequest = {
    getTestingData: async () => {
        await instance.get("WeatherForeCast")
            .then((response) => {
                console.log("Response:", response.data);
            });
    },
    getCustomers: async () => {
        try {
            const response = await instance.get("api/Customers");
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error GET customers:", error);
            enqueueSnackbar("Failed to fetch data");
        }
    },
    addCustomer: async (customer: Customer) => {
        try {
            const response = await instance.post("api/Customers", customer);
            console.log("Response:", response.data);
            return response.status;
        } catch (error) {
            console.error("Error POST customer:", error);
            enqueueSnackbar(`Kunde hinzufügen fehlgeschlagen: ${error}`, {variant: "error"});
        }
    },
    editCustomer: async (customer: Customer) => {
        try {
            const response = await instance.put(`api/Customers/${customer.customerId}`, customer);
            console.log("Response:", response.data);
            return response.status;
        } catch (error) {
            console.error("Error PUT customer:", error);
            enqueueSnackbar(`Kunde editieren fehlgeschlagen: ${error}`, {variant: "error"});
        }
    },
    deleteCustomer: async (customerId: number) => {
        try {
            await instance.delete(`api/Customers/${customerId}`);
        } catch (error) {
            console.error("Error DELETE customer:", error);
            enqueueSnackbar(`Kunde löschen fehlgeschlagen: ${error}`, {variant: "error"});
        }
    },
}

export default ApiRequest;
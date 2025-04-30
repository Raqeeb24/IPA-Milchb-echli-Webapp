import axios from "axios";
import { Customer } from "./components/interfaces/Customer";
import { enqueueSnackbar } from "notistack";
import { Transaction, TransactionDto } from "./components/interfaces/Transaction";

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
            enqueueSnackbar(`Kunde hinzufügen fehlgeschlagen: ${error}`, { variant: "error" });
        }
    },
    editCustomer: async (customer: Customer) => {
        try {
            const response = await instance.put(`api/Customers/${customer.customerId}`, customer);
            console.log("Response:", response.data);
            return response.status;
        } catch (error) {
            console.error("Error PUT customer:", error);
            enqueueSnackbar(`Kunde editieren fehlgeschlagen: ${error}`, { variant: "error" });
        }
    },
    deleteCustomer: async (customerId: number) => {
        try {
            await instance.delete(`api/Customers/${customerId}`);
        } catch (error) {
            console.error("Error DELETE customer:", error);
            enqueueSnackbar(`Kunde löschen fehlgeschlagen: ${error}`, { variant: "error" });
        }
    },
    getCustomerTransactions: async (customerId: number) => {
        try {
            const response = await instance.get(`api/Transactions/Customer/${customerId}`);
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error GET transactions from CustomerId: ${customerId}`, error);
            enqueueSnackbar("Failed to fetch data");
        }
    },
    getTransactionId: async () => {
        try {
            const response = await instance.get("api/Transactions/TransactionId");
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error GET transactions:", error);
            enqueueSnackbar("Failed to fetch data");
        }
    },
    addTransaction: async (transaction: TransactionDto) => {
        try {
            const response = await instance.post("api/Transactions", transaction);
            console.log("Response:", response.data);
            return response.status;
        } catch (error) {
            console.error("Error POST transaction:", error);
            enqueueSnackbar(`Buchung hinzufügen fehlgeschlagen: ${error}`, { variant: "error" });
        }
    },
    editTransaction: async (transaction: TransactionDto) => {
        try {
            if (transaction.transactionId) {
                const response = await instance.put(`api/Transactions/${transaction.transactionId}`, transaction);
                console.log("Response:", response.data);
                return response.status;
            }
            return 404;
        } catch (error) {
            console.error("Error PUT transaction:", error);
            enqueueSnackbar(`Buchung editieren fehlgeschlagen: ${error}`, { variant: "error" });
        }
    },
    deleteTransaction: async (transactionId: number) => {
        try {
            await instance.delete(`api/Transactions/${transactionId}`);
        } catch (error) {
            console.error("Error DELETE transaction:", error);
            enqueueSnackbar(`Buchung löschen fehlgeschlagen: ${error}`, { variant: "error" });
        }
    },
    getAccounts: async () => {
        try {
            const response = await instance.get("api/Accounts");
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error GET accounts:", error);
            enqueueSnackbar("Failed to fetch data");
        }
    },
    getAccountSummaryList: async (customerId: number) => {
        try {
            const response = await instance.get(`api/Accounts/SumByAccount/${customerId}`);
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error GET resultList:", error);
            enqueueSnackbar("Failed to fetch data");
        }
    },
    getCategories: async () => {
        try {
            const response = await instance.get("api/Categories");
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error GET categories:", error);
            enqueueSnackbar("Failed to fetch data");
        }
    },
}

export default ApiRequest;
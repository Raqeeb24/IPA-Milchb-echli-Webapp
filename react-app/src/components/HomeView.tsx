import React from "react";
import { Customer, emptyCustomer } from "./interfaces/Customer";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { Grid } from "@mui/system";
import { Autocomplete, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import ApiRequest from "../api.requests";
import { emptyTransaction, Transaction, TransactionDto } from "./interfaces/Transaction";
import { SECRET_KEY } from "../config";
import { DeleteIconButton, EditIconButton, LogoutIconButton } from "./IconButtons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import { Account } from "./interfaces/Account";
import { StyledTableCell } from "./StyledTable";
import { useNavigate } from "react-router-dom";

const HomeView: React.FC = () => {
    const navigate = useNavigate();

    const fetchData = async () => {
        const transactions: Transaction[] = await ApiRequest.getTransactions();
        if (transactions) {
            setTransactionList(transactions);
            console.log("transactions", transaction);
        }
        const accounts: any[] = await ApiRequest.getAccounts();
        if (accounts) {
            setAccountList(accounts);
            console.log("accounts", accounts);
        }
    };
    const getCookie = () => {
        const encryptedCustomer = Cookies.get("customer");
        if (!encryptedCustomer) {
            navigate("/");
            return;
        }
        const decryptedCustomer = CryptoJS.AES.decrypt((encryptedCustomer), SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const parsedDecryptedCustomer = JSON.parse(decryptedCustomer);
        setCustomer(parsedDecryptedCustomer);
    }

    const [customer, setCustomer] = React.useState<Customer>(emptyCustomer);
    const [transaction, setTransaction] = React.useState<Transaction>(emptyTransaction);
    const [transactionList, setTransactionList] = React.useState<Transaction[]>([]);
    const [accountList, setAccountList] = React.useState<Account[]>([]);

    const autocompleteProps = {
        options: accountList,
        getOptionLabel: (option: Account) => `${option.accountId} - ${option.accountName}`
    }

    React.useEffect(() => {
        getCookie();
        fetchData();
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(transaction);
        setTransaction((prevTransaction) => ({
            ...prevTransaction,
            [e.target.name]: e.target.value
        }));

        console.log("log", transaction);
    };

    const onChangeDateHandler = (e: Date | null) => {
        setTransaction((prevTransaction) => ({
            ...prevTransaction,
            date: e
        }));
    }

    const onChangeAccountHandler = (e: React.StyleHTMLAttributes<Account>, account: Account | null) => {
        setTransaction((prevTransaction) => ({
            ...prevTransaction,
            accountId: account?.accountId ?? 0
        }));
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const transactionDto: TransactionDto = {
            customerId: customer.customerId,
            date: transaction.date?.toISOString() ?? "",
            accountId: transaction.accountId,
            description: transaction.description,
            amount: transaction.amount
        }

        console.log("Buchung:", transactionDto);

        let response;

        response = await ApiRequest.postTransaction(transactionDto);
        /*
        const result = zTransaction.safeParse(transaction);

        if(!result.success) {
            const fieldErrors: any = {};
        }

        /*
        let response;
        if (actionType === "addCustomer") {
            response = await ApiRequest.addCustomer(customer);
            console.log("response", response);
        }
        if (actionType === "editCustomer") {
            response = await ApiRequest.editCustomer(customer);
            console.log("response", response);
        }
        if (response) {
            enqueueSnackbar(response);
            setLoading(true);
            await fetchData();
            setLoading(false);
            setOpen(false);
        } else {
            console.log("no response: ", response)
        }
            */

    }

    return (
        <>
            <Grid container spacing={3} flexGrow={1}>
                <Grid size={12}>
                    <Typography variant="h6" textAlign="center">
                        Eingeloggt als: {customer.customerName}
                    </Typography>
                    <LogoutIconButton />
                </Grid>
                <Grid size={12}>
                    <Paper
                        component="form"
                        onSubmit={onSubmitHandler}
                        style={{ padding: 16 }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
                                    <DateField
                                        label="Datum"
                                        name="date"
                                        value={transaction.date}
                                        onChange={onChangeDateHandler}
                                        fullWidth
                                        required
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                    label="Belegnummer"
                                    name="transactionId"
                                    type="number"
                                    value={transaction.transactionId}
                                    onChange={onChangeHandler}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} marginTop={2}>
                            <Grid size={{ xs: 12, md: 3.5, lg: 4 }}>
                                <Autocomplete
                                    {...autocompleteProps}
                                    autoHighlight
                                    value={accountList.find(a => a.accountId === transaction.accountId) ?? null}
                                    onChange={onChangeAccountHandler}
                                    renderInput={(params) => (
                                        <TextField 
                                        {...params} 
                                        label="Buchungskonto" 
                                        fullWidth
                                        required
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4.5 }}>
                                <TextField
                                    label="Beschreibung"
                                    name="description"
                                    value={transaction.description}
                                    onChange={onChangeHandler}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 2 }}>
                                <TextField
                                    label="Betrag"
                                    name="amount"
                                    type="number"
                                    value={transaction.amount}
                                    onChange={onChangeHandler}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 6, md: 2 }}>
                                <Button type="submit" fullWidth>
                                    Buchen
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Paper sx={{ width: "100%" }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className="TableHead">
                                <TableRow>
                                    <StyledTableCell>Datum</StyledTableCell>
                                    <StyledTableCell>Nr</StyledTableCell>
                                    <StyledTableCell>Buchungskonto</StyledTableCell>
                                    <StyledTableCell>Beschreibung</StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "right" }}>Betrag</StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "right" }}>Aktion</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactionList.map((t: Transaction, i: number) => (
                                    <TableRow key={i} onClick={() => console.log(t.accountId)}>
                                        <TableCell>
                                           {t.date ? new Date(t.date).toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" }) : ""}
                                        </TableCell>
                                        <TableCell>{t.transactionId}</TableCell>
                                        <TableCell>{t.accountId}</TableCell>
                                        <TableCell>{t.description}</TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>{t.amount}</TableCell>
                                        <TableCell sx={{ textAlign: "right" }}>
                                            <EditIconButton />
                                            <DeleteIconButton />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </>
    );
}
export default HomeView;
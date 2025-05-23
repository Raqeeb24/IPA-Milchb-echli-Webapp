import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, TextField, Button, Dialog, DialogTitle, DialogContent, IconButton, Grid } from "@mui/material";
import React from "react";
import { Customer, emptyCustomer } from "./interfaces/Customer";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../api.requests";
import { SECRET_KEY } from "../config";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { DeleteIconButton, EditIconButton, LoginIconButton, PersonAddIconButton } from "./IconButtons";
import { StyledTableHeadCell } from "./StyledTableComponents";
import { ActionType } from "./ActionType";
import { CustomerContext } from "./context/CustomerContext";

const LoginView: React.FC = () => {

    const [customerList, setCustomerList] = React.useState<Customer[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [customer, setCustomer] = React.useState<Customer>(emptyCustomer);
    const { setCustomer: setSelectedCustomer } = React.useContext(CustomerContext);
    const [open, setOpen] = React.useState(false);
    const [actionType, setActionType] = React.useState<ActionType>("");

    const navigate = useNavigate();

    const fetchData = async () => {
        const customers: Customer[] = await ApiRequest.getCustomers();
        if (customers) {
            setCustomerList(customers);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("log:", customer);

        let response;
        if (actionType === "ADD") {
            response = await ApiRequest.addCustomer(customer);
            console.log("response", response);
        }
        if (actionType === "EDIT") {
            response = await ApiRequest.editCustomer(customer);
            console.log("response", response);
        }
        if (response) {
            setLoading(true);
            await fetchData();
            setLoading(false);
            setOpen(false);
        } else {
            console.log("no response: ", response)
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [e.target.name]: e.target.value
        }));
        console.log("log:", customer);
    }

    const handleIconClick = async (action: ActionType, selectedCustomer: Customer) => {
        setActionType(action);


        switch (action) {
            case "SELECT":
                const encryptedCustomer = CryptoJS.AES.encrypt(JSON.stringify(selectedCustomer), SECRET_KEY).toString();
                Cookies.set("customer", encryptedCustomer, { expires: 0.2 });
                setSelectedCustomer(selectedCustomer);
                setCustomer(emptyCustomer);
                navigate("/HomeView");
                break;
            case "ADD":
                setCustomer(emptyCustomer);
                setOpen(true);
                break;
            case "EDIT":
                setCustomer(selectedCustomer);
                setOpen(true);
                break;
            case "DELETE":
                console.log("delete customer:", selectedCustomer)
                setLoading(true);
                await ApiRequest.deleteCustomer(selectedCustomer.customerId);
                console.log("ok delete");
                fetchData();
                setLoading(false)
                setCustomer(emptyCustomer);
                break;
        }
    }

    return (
        <Grid container spacing={3} flexGrow={1}>
            <Grid size={12}>
                <Box sx={{ display: "grid", gap: 5, marginTop: "5vh" }}>
                    <Typography variant="h3" textAlign="center" gutterBottom>Milchbüechli Webapp</Typography>
                    <Stack direction="row" justifyContent="end">
                        <PersonAddIconButton onClick={() => handleIconClick("ADD", emptyCustomer)} />
                    </Stack>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        maxWidth="xs"
                    >
                        <DialogTitle variant="h5" textAlign="center">
                            {actionType === "ADD" && "Kunde hinzufügen"}
                            {actionType === "EDIT" && "Kunde bearbeiten"}
                        </DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                onSubmit={onSubmitHandler}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 2,
                                    paddingTop: 2,
                                    marginBottom: -2
                                }}
                            >
                                <TextField
                                    label="Name"
                                    name="customerName"
                                    value={customer.customerName}
                                    onChange={onChangeHandler}
                                    required
                                    sx={{ gridColumn: " 1 / span 2" }}
                                />
                                <TextField
                                    label="Adresse"
                                    name="address"
                                    value={customer.address}
                                    onChange={onChangeHandler}
                                    required
                                    sx={{ gridColumn: "1 / span 2" }}
                                />
                                <TextField
                                    label="Postleitzahl"
                                    type="number"
                                    inputProps={{
                                        min: 1000,
                                        max: 9999
                                    }}
                                    name="zip"
                                    value={customer.zip}
                                    onChange={onChangeHandler}
                                    sx={{ gridColumn: "1" }}
                                    required
                                />
                                <TextField
                                    label="Ort"
                                    name="place"
                                    value={customer.place}
                                    onChange={onChangeHandler}
                                    sx={{ gridColumn: "2" }}
                                    required
                                />
                                <Button
                                    type="submit"
                                    sx={{ gridColumn: "2" }}
                                >
                                    Bestätigen
                                </Button>
                            </Box>
                        </DialogContent>
                    </Dialog>
                    {!loading ? (
                        <>
                            <Paper sx={{ width: "100%", overflowX: "auto" }}>
                                <TableContainer>
                                    <Table stickyHeader aria-label="resposive table">
                                        <TableHead className="TableHead">
                                            <TableRow>
                                                <StyledTableHeadCell>Kundenname</StyledTableHeadCell>
                                                <StyledTableHeadCell>Adresse</StyledTableHeadCell>
                                                <StyledTableHeadCell>Ort</StyledTableHeadCell>
                                                <StyledTableHeadCell sx={{ textAlign: "end" }}>Aktion</StyledTableHeadCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {customerList.map((c: Customer, i: number) => (
                                                <TableRow key={i} hover>
                                                    <TableCell>{c.customerName}</TableCell>
                                                    <TableCell>{c.address}</TableCell>
                                                    <TableCell>{c.zip} {c.place}</TableCell>
                                                    <TableCell sx={{ textAlign: "right" }}>

                                                        <LoginIconButton
                                                            onClick={() => handleIconClick("SELECT", c)}
                                                        />
                                                        <EditIconButton
                                                            onClick={() => handleIconClick("EDIT", c)}
                                                        />
                                                        <DeleteIconButton
                                                            onClick={() => handleIconClick("DELETE", c)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </>
                    )
                        :
                        <Typography variant="h5" textAlign="center">Loading...</Typography>
                    }
                </Box>
            </Grid>

        </Grid>

    );
}

export default LoginView;
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, Stack, Modal, TextField, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import React from "react";
import { PersonAddAlt1 } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomizedIconButton } from "./CustomizedIconButton";
import { Customer } from "./interfaces/Customer";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../api.requests";
import { enqueueSnackbar } from "notistack";

const LoginView: React.FC = () => {
    const emptyCustomer: Customer = {
        customerId: 0,
        customerName: "",
        address: "",
        zip: 0,
        place: ""
    }

    type ActionType = "selectCustomer" | "addCustomer" | "editCustomer" | "deleteCustomer" | "";

    const [customerList, setCustomerList] = React.useState<Customer[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [customer, setCustomer] = React.useState<Customer>(emptyCustomer);
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


    const StyledTableCell = styled(TableCell)({
        color: "white",
        backgroundColor: "Black"
    });

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("log:", customer);

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
        } else{
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
            case "selectCustomer":
                navigate("/Home-View");
            case "addCustomer":
                setCustomer(emptyCustomer);
                setOpen(true);
                return;
            case "editCustomer":
                setCustomer(selectedCustomer);
                setOpen(true);
                return;
            case "deleteCustomer":
                console.log("delete customer:", selectedCustomer)
                setLoading(true);
                await ApiRequest.deleteCustomer(selectedCustomer.customerId);
                console.log("ok delete");
                fetchData();
                setLoading(false)
                setCustomer(emptyCustomer);
                return;
        }
        console.log("log:", action)
    }

    return (
        <Box sx={{ display: "grid", gap: 5, marginTop: "5vh" }}>
            <Typography variant="h3" textAlign="center" gutterBottom>Milchbüechli Webapp</Typography>
            <Stack direction="row" justifyContent="end">
                <CustomizedIconButton customColorOnHover="#38B000" onClick={() => handleIconClick("addCustomer", emptyCustomer)}>
                    <PersonAddAlt1
                        fontSize="large"
                    />
                </CustomizedIconButton>
            </Stack>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="xs"
            >
                <DialogTitle variant="h5" textAlign="center">
                    {actionType === "addCustomer" && "Kunde hinzufügen"}
                    {actionType === "editCustomer" && "Kunde bearbeiten"}
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
                            sx={{ gridColumn: "2" }}>Bestätigen</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            {!loading ? (
                <>
                    <Paper sx={{ width: "100%" }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead className="TableHead">
                                    <TableRow>
                                        <StyledTableCell>Kundenname</StyledTableCell>
                                        <StyledTableCell>Adresse</StyledTableCell>
                                        <StyledTableCell>Ort</StyledTableCell>
                                        <StyledTableCell sx={{ textAlign: "end" }}>Aktion</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customerList.map((c: Customer, i: number) => (
                                        <TableRow key={i} hover>
                                            <TableCell>{c.customerName}</TableCell>
                                            <TableCell>{c.address}</TableCell>
                                            <TableCell>{c.zip} {c.place}</TableCell>
                                            <TableCell>
                                                <Stack direction="row" justifyContent="end">
                                                    <CustomizedIconButton
                                                        customColorOnHover="#0D6EFD"
                                                        sx={{ gridRow: 1 }}
                                                        onClick={() => handleIconClick("selectCustomer", c)}
                                                    >
                                                        <LoginIcon
                                                            fontSize="medium"
                                                        />
                                                    </CustomizedIconButton>
                                                    <CustomizedIconButton
                                                        customColorOnHover="#FFA500"
                                                        sx={{ gridRow: 1 }}
                                                        onClick={() => handleIconClick("editCustomer", c)}
                                                    >
                                                        <EditIcon
                                                            fontSize="medium"
                                                        />
                                                    </CustomizedIconButton>
                                                    <CustomizedIconButton
                                                        customColorOnHover="#DC3545"
                                                        sx={{ gridRow: 1 }}
                                                        onClick={() => handleIconClick("deleteCustomer", c)}
                                                    >
                                                        <DeleteIcon
                                                            fontSize="medium"
                                                        />
                                                    </CustomizedIconButton>
                                                </Stack>
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
    );
}

export default LoginView;
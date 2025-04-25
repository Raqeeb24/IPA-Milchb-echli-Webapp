import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, Stack, Modal, TextField, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import React from "react";
import customers from "../assets/customers.json";
import { PersonAddAlt1 } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomizedIconButton } from "./CustomizedIconButton";
import { Customer } from "./interfaces/Customer";
import { useNavigate } from "react-router-dom";

const LoginView: React.FC = () => {
    const emptyCustomer: Customer = {
        name: "",
        address: "",
        zip: 0,
        place: ""
    }

    const [customer, setCustomer] = React.useState<Customer>(emptyCustomer);
    const [open, setOpen] = React.useState(false);
    
    const navigate = useNavigate();


    const StyledTableCell = styled(TableCell)({
        color: "white",
        backgroundColor: "Black"
    });

    const onChangeHandler = (e: any) => {
        console.log("log:", e.target.value)
    }
    const handleIconClick = (action: string, selectedCustomer: Customer) => {
        switch (action) {
            case "selectCustomer":
                navigate("/Home-View");
            case "addCustomer":
                setOpen(true);
                return;
            case "editCustomer":
                setCustomer(selectedCustomer);
                setOpen(true);
                return;
            case "deleteCustomer":
                console.log("delete customer:", selectedCustomer)
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
                <DialogTitle variant="h5" textAlign="center">Titel</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 2
                        }}
                    >
                        <TextField
                            label="Name"
                            value={customer.name}
                            onChange={onChangeHandler}
                            required
                            sx={{ gridColumn: " 1 / span 2" }}
                        />
                        <TextField
                            label="Adresse"
                            value={customer.address}
                            onChange={onChangeHandler}
                            required
                            sx={{ gridColumn: "1 / span 2" }}
                        />
                        <TextField
                            label="Postleitzahl"
                            value={customer.zip}
                            onChange={onChangeHandler}
                            required
                        />
                        <TextField
                            label="Ort"
                            value={customer.place}
                            onChange={onChangeHandler}
                            required
                        />
                        <Button
                            type="submit"
                            sx={{ gridColumn: "2" }}>Bestätigen</Button>
                    </Box>
                </DialogContent>
            </Dialog>

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
                            {customers.customer.map((c: any, i: number) => (
                                <TableRow key={i} hover>
                                    <TableCell>{c.name}</TableCell>
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
        </Box>
    );
}

export default LoginView;
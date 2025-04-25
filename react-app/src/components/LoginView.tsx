import { Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, Stack } from "@mui/material";
import React from "react";
import customers from "../assets/customers.json";
import { PersonAddAlt1 } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomizedIconButton } from "./CustomizedIconButton";

const LoginView: React.FC = () => {
    const [customer, setCustomer] = React.useState();

    const StyledTableCell = styled(TableCell)({
        color: "white",
        backgroundColor: "Black"
    });

    return (
        <Box sx={{ display: "grid", gap: 5 }}>
            <Typography variant="h3" textAlign="center" gutterBottom>Milchbüechli Webapp</Typography>
            <Stack direction="row" justifyContent="end">
                <CustomizedIconButton customColorOnHover="#38B000" onClick={() => window.alert("add customer")}>
                    <PersonAddAlt1
                        fontSize="large"
                    />
                </CustomizedIconButton>

            </Stack>

            <Paper sx={{ width: "100%" }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className="TableHead">
                            <TableRow>
                                <StyledTableCell>Kundenname</StyledTableCell>
                                <StyledTableCell>Adresse</StyledTableCell>
                                <StyledTableCell>Ort</StyledTableCell>
                                <StyledTableCell sx={{textAlign: "end"}}>Aktion</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.customer.map((c: any, i: number) => (
                                <TableRow key={i} hover onClick={() => setCustomer(c.name)}>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.address}</TableCell>
                                    <TableCell>{c.zip} {c.place}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" justifyContent="end">
                                            <CustomizedIconButton customColorOnHover="#0D6EFD" onClick={() => window.alert("add customer")} sx={{gridRow: 1}}>
                                            <LoginIcon
                                                fontSize="medium"
                                            />
                                        </CustomizedIconButton>
                                        <CustomizedIconButton customColorOnHover="#FFA500" onClick={() => window.alert("add customer")} sx={{gridRow: 1}}>
                                            <EditIcon
                                                fontSize="medium"
                                            />
                                        </CustomizedIconButton>
                                        <CustomizedIconButton customColorOnHover="#DC3545" onClick={() => window.alert("add customer")} sx={{gridRow: 1}}>
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
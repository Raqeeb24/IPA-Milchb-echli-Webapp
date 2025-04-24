import { Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";

import customers from "../assets/customers.json";

const LoginView: React.FC = () => {
    const [customer, setCustomer] = React.useState();

    return (
        <Box sx={{ display: "grid", gap: 5 }}>
            <Typography variant="h3" textAlign="center" gutterBottom>Milchbüechli Webapp</Typography>
            <Box sx={{ display: "grid", gridAutoColumns: "1fr", gap: 2 }}>
                <Button variant="outlined" size="medium" sx={{ gridRow: "1", gridColumn: "span 1" }}>Neu</Button>
                <Button variant="outlined" size="medium" sx={{ gridRow: "1", gridColumn: "span 2" }}>Bearbeiten</Button>
                <TextField variant="outlined" value={customer} sx={{ gridRow: "1", gridColumn: "span 4" }} />
                <Button variant="outlined" size="medium" sx={{ gridRow: "1", gridColumn: "span 2" }} onClick={() => console.log("Kunde auswählen")}>Auswählen</Button>
            </Box>

            <Paper sx={{ width: "100%" }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Kundenname</TableCell>
                                <TableCell>Adresse</TableCell>
                                <TableCell>Ort</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.customer.map((c: any, i: number) => (
                                <TableRow key={i} hover onClick={() => setCustomer(c.name)}>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.address}</TableCell>
                                    <TableCell>{c.zip} {c.place}</TableCell>
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
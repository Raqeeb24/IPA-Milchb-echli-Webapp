import { AppBar, Toolbar, Typography, Box, Container, Stack, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "./interfaces/Customer";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../config";
import { LogoutIconButton } from "./IconButtons";

const AppNavbar = () => {
    const navigate = useNavigate();

    const [customer, setCustomer] = React.useState<Customer>();

    React.useEffect(() => {
        getCookie();
    }, []);

    const getCookie = () => {
        const encryptedCustomer = Cookies.get("customer");
        if (!encryptedCustomer) {
            navigate("/");
            return;
        }
        const decryptedCustomer = CryptoJS.AES.decrypt((encryptedCustomer), SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const parsedDecryptedCustomer = JSON.parse(decryptedCustomer);
        setCustomer(parsedDecryptedCustomer);
    };

    const handleLogout = () => {
        Cookies.remove("customer")
        navigate("/");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#151B21" }}>
            <Container maxWidth="lg" sx={{ width: "100%" }}>
                <Grid container alignItems="center">
                    <Grid size={1} />
                    <Grid size={10} sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography variant="subtitle2">
                            Eingeloggt als: <strong>{customer?.customerName}</strong>
                        </Typography>
                    </Grid>
                    <Grid size={1} sx={{ textAlign: 'right' }}>
                        <LogoutIconButton onClick={handleLogout} sx={{ color: "white" }} />
                    </Grid>
                </Grid>
                <Toolbar>
                    <Typography
                        variant="h6"
                    >
                        Milchbüechli
                    </Typography>
                    <Box sx={{ display: 'flex', gap: {xs: 1, sm: 3, md: 4}, ml: 'auto' }}>
                        <Typography
                            variant="body1"
                            sx={{ color: 'white', cursor: 'pointer', ":hover": { color: "#42bff5" } }}
                            onClick={() => navigate("/HomeView")}
                        >
                            Buchungen
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: 'white', cursor: 'pointer', ":hover": { color: "#42bff5" } }}
                            onClick={() => navigate("/ReportView")}
                        >
                            Berichte
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppNavbar;
import { AppBar, Toolbar, Typography, Box, Container, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LogoutIconButton } from "./IconButtons";
import { CustomerContext } from "./context/CustomerContext";
import { emptyCustomer } from "./interfaces/Customer";

const AppNavbar = () => {
    const navigate = useNavigate();
    const { customer, setCustomer } = React.useContext(CustomerContext);

    React.useEffect(() => {
        const customerCookie = Cookies.get("customer");
        if (!customerCookie && customer === emptyCustomer) {
            navigate("/");
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("customer");
        setCustomer(emptyCustomer);
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
                    <Typography variant="h6">
                        Milchbüechli
                    </Typography>
                    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 3, md: 4 }, ml: 'auto' }}>
                        <Typography
                            variant="body1"
                            sx={{ color: 'white', cursor: 'pointer', ":hover": { color: "#42bff5" }, fontSize: {xs: "0.8rem", sm: "1rem"} }}
                            onClick={() => navigate("/HomeView")}
                        >
                            Buchungen
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: 'white', cursor: 'pointer', ":hover": { color: "#42bff5" }, fontSize: {xs: "0.8rem", sm: "1rem"} }}
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
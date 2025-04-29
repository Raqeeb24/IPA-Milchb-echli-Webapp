import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export const LoginLayout = () => {
    return (
        <Container maxWidth="lg">
            <Outlet />
        </Container>
    );
};

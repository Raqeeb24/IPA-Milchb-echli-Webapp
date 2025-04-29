import { Container } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import AppNavbar from "./components/AppNavbar"

export const AppLayout: React.FC = () => {
    return (
        <>
            <AppNavbar />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>
    )
}
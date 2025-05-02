import { IconButton, IconButtonProps, styled } from "@mui/material";
import { PersonAddAlt1 } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PrintIcon from '@mui/icons-material/Print';

// Login-icon
const StyledLoginButton = styled(IconButton)({
    color: "black",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#0D6EFD"
    }
});

export const LoginIconButton = (props: IconButtonProps) => {
    return (
        <StyledLoginButton {...props}>
            <LoginIcon
                titleAccess="Kunde auswählen"
                fontSize="medium"
            />
        </StyledLoginButton>
    );
}

// Add-Person-icon
const StyledPersonaAddButton = styled(IconButton)({
    color: "black",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#38B000"
    }
});

export const PersonAddIconButton = (props: IconButtonProps) => {
    return (
        <StyledPersonaAddButton {...props}>
            <PersonAddAlt1
                titleAccess="Kunde hinzufügen"
                sx={{ fontSize: { xs: 30, sm: 40 } }}
            />
        </StyledPersonaAddButton>
    );
}

// Edit-icon
const StyledEditButton = styled(IconButton)({
    color: "black",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#FFA500"
    }
});

export const EditIconButton = (props: IconButtonProps) => {
    return (
        <StyledEditButton {...props}>
            <EditIcon
                titleAccess="Bearbeiten"
                fontSize="medium"
            />
        </StyledEditButton>
    );
}

// Delete-icon
const StyledDeleteButton = styled(IconButton)({
    color: "black",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#DC3545"
    }
});

export const DeleteIconButton = (props: IconButtonProps) => {
    return (
        <StyledDeleteButton {...props}>
            <DeleteIcon
                titleAccess="Löschen"
                fontSize="medium"
            />
        </StyledDeleteButton>
    );
}

// Logout-icon
const StyledLogoutButton = styled(IconButton)({
    color: "black",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#e74c3c"
    }
});

export const LogoutIconButton = (props: IconButtonProps) => {
    return (
        <StyledLogoutButton {...props}>
            <ExitToAppIcon
                titleAccess="Logout"
                fontSize="medium"
            />
        </StyledLogoutButton>
    );
}

// Print-icon
const StyledPrintIcon = styled(IconButton)({
    color: "black",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#0f346b"
    }
});

export const PrintIconButton = (props: IconButtonProps) => {
    return (
        <StyledPrintIcon {...props}>
            <PrintIcon
                titleAccess="PDF-Druck"
                sx={{ fontSize: { xs: 25, sm: 30, md: 35 } }}
            />
        </StyledPrintIcon>
    );
}
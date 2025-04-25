import { IconButton, styled } from "@mui/material";

interface CustomIconProps {
    customColorOnHover?: string;
}

export const CustomizedIconButton = styled(IconButton)<CustomIconProps>(({customColorOnHover = "white"}) => ({
    color: "black",
    "&:hover": {
        backgroundColor: "transparent",
        color: customColorOnHover
    }
}));
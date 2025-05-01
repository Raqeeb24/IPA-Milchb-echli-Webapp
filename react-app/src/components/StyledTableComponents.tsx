import { styled, TableCell } from "@mui/material";

export const StyledTableHeadCell = styled(TableCell)({
    color: "white",
    backgroundColor: "#151B21",

    "@media print": {
        color: "black",
        backgroundColor: "#f0f0f0"
    }
});

export const StyledCategoryTableCell = styled(TableCell)({
    color: "white",
    backgroundColor: "#49525B",
    '@media print': {
        color: "black",
        backgroundColor: "#f0f0f0"
    }
});
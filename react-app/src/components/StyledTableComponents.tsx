import { styled, TableCell } from "@mui/material";

export const StyledTableHeadCell = styled(TableCell)({
    color: "white",
    backgroundColor: "#151B21",

    "@media print": {
        color: "black",
        backgroundColor: "#151B21"
    }
});

export const StyledCategoryTableCell = styled(TableCell)({
    color: "white",
    backgroundColor: "#49525B",

    '@media print': {
        color: "black",
        backgroundColor: "#49525B"
    }
});
import { Checkbox, FormControlLabel, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { StyledCategoryTableCell, StyledTableHeadCell } from "./StyledTableComponents";
import { Category } from "./interfaces/Category";
import ApiRequest from "../api.requests";
import { AccountSummary } from "./interfaces/AccountSummary";
import { CustomerContext } from "./context/CustomerContext";
import "./print.css";

const ReportView: React.FC = () => {

    const { customer } = React.useContext(CustomerContext);
    const [categoryList, setCategoryList] = React.useState<Category[]>();
    const [accountSummaryList, setAccountSummaryList] = React.useState<AccountSummary[]>([]);
    const [hasDetails, setHasDetails] = React.useState<boolean>(true);
    const totalIncome = accountSummaryList.filter(a => a.categoryId === 1).reduce((sum, a) => sum + a.totalAmount, 0);
    const totalExpenses = accountSummaryList.filter(a => a.categoryId !== 1).reduce((sum, a) => sum + a.totalAmount, 0);
    const totalSum = totalIncome - totalExpenses;

    React.useEffect(() => {
        fetchData();
    }, [customer]);

    const fetchData = async () => {
        const categories: Category[] = await ApiRequest.getCategories();
        if (categories) {
            setCategoryList(categories);
            console.log("categories", categories);
        }

        if (customer?.customerId) {
            console.log("cID", customer.customerId)
            const results: any[] = await ApiRequest.getAccountSummaryList(customer.customerId);
            if (results) {
                setAccountSummaryList(results);
                console.log("accountSummaryList", results);
            }
        }
    };

    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasDetails(e.target.checked);
    };

    return (
        <Grid container spacing={3} flexGrow={1}>
            <Grid size={12} />
            <Grid container size={12}spacing={3}>
                <Grid textAlign={"start"}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hasDetails}
                                onChange={handleChangeCheckbox}
                            />
                        }
                        label="Detaillierte Ansicht">
                    </FormControlLabel>
                </Grid>
            </Grid>
            <Grid container className="print">
                        <Grid size={8}>
                            <Typography variant="h4">{customer.customerName}</Typography>
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h5">Datum</Typography>
                        </Grid>
            </Grid>
            <Paper sx={{ width: "100%" }} className="print">
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className="TableHead">
                            <TableRow>
                                <StyledTableHeadCell>Buchungskonto</StyledTableHeadCell>
                                <StyledTableHeadCell sx={{ textAlign: "end" }}>Total</StyledTableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Array.isArray(categoryList) && categoryList.length > 0 ? (
                                    [
                                        categoryList.map((c: Category) => {
                                            const filteredSummaryList = accountSummaryList.filter((a) => a.categoryId == c.categoryId);
                                            const sumOfCategory = filteredSummaryList.reduce((sum, a) => sum + a.totalAmount, 0);

                                            return (
                                                <>
                                                    <TableRow
                                                        key={c.categoryId}
                                                        hover
                                                        sx={{
                                                            backgroundColor: "#edf3f5",
                                                            ":hover": {
                                                                backgroundColor: ""
                                                            }
                                                        }}>
                                                        <StyledCategoryTableCell>{c.categoryName}</StyledCategoryTableCell>
                                                        <StyledCategoryTableCell sx={{ textAlign: "end" }}>{sumOfCategory}</StyledCategoryTableCell>
                                                    </TableRow>
                                                    {
                                                        hasDetails && (
                                                            Array.isArray(filteredSummaryList) && filteredSummaryList.length > 0 ? (
                                                                filteredSummaryList.map((a: AccountSummary, i: number) => (
                                                                    <TableRow
                                                                        key={a.accountId}
                                                                        hover
                                                                    >
                                                                        <TableCell>{a.accountName}</TableCell>
                                                                        <TableCell sx={{ textAlign: "end" }}>{a.totalAmount}</TableCell>
                                                                    </TableRow>
                                                                ))
                                                            )
                                                                :
                                                                (
                                                                    <TableRow>
                                                                        <TableCell>Keine Buchungskonten sind vorhanden</TableCell>
                                                                    </TableRow>
                                                                )
                                                        )
                                                    }
                                                </>
                                            );
                                        }),
                                        <TableRow>
                                            {
                                                Math.sign(totalSum) ?
                                                    <StyledCategoryTableCell>Jahresverlust</StyledCategoryTableCell>
                                                    :
                                                    <StyledCategoryTableCell>Jahresgewinn</StyledCategoryTableCell>
                                            }
                                            <StyledCategoryTableCell style={{ textAlign: "end" }}>{totalSum}</StyledCategoryTableCell>
                                        </TableRow>
                                    ]
                                )
                                    :
                                    (
                                        <TableRow>
                                            <TableCell>Keine Kategorien sind vorhanden</TableCell>
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid >
    );
}

export default ReportView;
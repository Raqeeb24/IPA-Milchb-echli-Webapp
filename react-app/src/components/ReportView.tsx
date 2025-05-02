import { Box, Checkbox, FormControlLabel, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { StyledCategoryTableCell, StyledTableHeadCell } from "./StyledTableComponents";
import { Category } from "./interfaces/Category";
import ApiRequest from "../api.requests";
import { AccountSummary } from "./interfaces/AccountSummary";
import { CustomerContext } from "./context/CustomerContext";
import "./print.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import { PrintIconButton } from "./IconButtons";

const ReportView: React.FC = () => {
    const { customer } = React.useContext(CustomerContext);
    const [categoryList, setCategoryList] = React.useState<Category[]>();
    const [accountSummaryList, setAccountSummaryList] = React.useState<AccountSummary[]>([]);
    const [hasDetails, setHasDetails] = React.useState<boolean>(true);
    const [daterange, setDaterange] = React.useState<{ dateFrom: Date, dateTo: Date }>({ dateFrom: new Date(2025, 0, 1), dateTo: new Date(2025, 11, 31) });
    const totalIncome = accountSummaryList.filter(a => a.categoryId === 1).reduce((sum, a) => sum + a.totalAmount, 0);
    const totalExpenses = accountSummaryList.filter(a => a.categoryId !== 1).reduce((sum, a) => sum + a.totalAmount, 0);
    const totalSum = totalIncome - totalExpenses;

    React.useEffect(() => {
        fetchData();
    }, [customer, daterange]);

    const fetchData = async () => {
        const categories: Category[] = await ApiRequest.getCategories();
        if (categories) {
            setCategoryList(categories);
            console.log("categories", categories);
        }

        if (customer.customerId) {
            const isoDateFrom = daterange.dateFrom.toISOString();
            const isoDateTo = daterange.dateTo.toISOString();

            const results: any[] = await ApiRequest.getAccountSummaryList(customer.customerId, isoDateFrom, isoDateTo);
            if (results) {
                setAccountSummaryList(results);
                console.log("accountSummaryList", results);
            }
        }
    };

    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasDetails(e.target.checked);
    };

    const onChangeDateHandler = (date: Date | null, type: "dateFrom" | "dateTo") => {
        setDaterange((prevDaterange) => ({
            ...prevDaterange,
            [type]: date
        }));
    };

    return (
        <Grid container spacing={3} flexGrow={1}>
            <Grid size={12} />
            <Grid container size={12} spacing={3} alignItems={"center"}>
                <Grid size={{ xs: "auto" }} textAlign={"start"}>
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
                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 3, md: 4 }, ml: 'auto' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
                        <Grid container>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <DatePicker
                                    label="Datum von"
                                    name="dateFrom"
                                    value={daterange?.dateFrom}
                                    onChange={(date) => onChangeDateHandler(date, "dateFrom")}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <DatePicker
                                    label="Datum bis"
                                    name="dateTo"
                                    value={daterange?.dateTo}
                                    onChange={(date) => onChangeDateHandler(date, "dateTo")}
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                    <PrintIconButton onClick={() => window.print()} />
                </Box>

            </Grid>
            <Paper sx={{ width: "100%" }} className="print">
                <Grid size={12} sx={{ display: "none" }} className="helpertext">
                    <Typography variant="h4">
                        {customer.customerName}
                    </Typography>
                    <Typography variant="h6">
                        {hasDetails ? (<Box>Detaillierte Erfolgsrechnung</Box>) : (<Box>Vereinfachte Erfolgsrechnung</Box>)}
                    </Typography>
                    <Typography variant="h6">Zeitraum: {`${daterange.dateFrom.toLocaleDateString()} bis ${daterange.dateTo.toLocaleDateString()}`}</Typography>
                </Grid>
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
                                                    >
                                                        <StyledCategoryTableCell>{c.categoryName}</StyledCategoryTableCell>
                                                        <StyledCategoryTableCell sx={{ textAlign: "end" }}>{sumOfCategory}</StyledCategoryTableCell>
                                                    </TableRow>
                                                    {
                                                        hasDetails && (
                                                            Array.isArray(filteredSummaryList) && filteredSummaryList.length > 0 ? (
                                                                filteredSummaryList.map((a: AccountSummary, i: number) => (
                                                                    <TableRow
                                                                        key={i}
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
                                                    <StyledCategoryTableCell>Verlust</StyledCategoryTableCell>
                                                    :
                                                    <StyledCategoryTableCell>Gewinn</StyledCategoryTableCell>
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
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { StyledCategoryTableCell, StyledTableHeadCell } from "./StyledTableComponents";
import { Category } from "./interfaces/Category";
import { Customer } from "./interfaces/Customer";
import { SECRET_KEY } from "../config";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import ApiRequest from "../api.requests";
import { AccountSummary } from "./interfaces/AccountSummary";

const ReportView: React.FC = () => {

    const [customer, setCustomer] = React.useState<Customer>();
    const [categoryList, setCategoryList] = React.useState<Category[]>();
    const [accountSummaryList, setAccountSummaryList] = React.useState<AccountSummary[]>([]);

    React.useEffect(() => {
        getCookie();
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [customer]);

    const getCookie = () => {
        const encryptedCustomer = Cookies.get("customer");
        if (!encryptedCustomer) {
            return;
        }
        const decryptedCustomer = CryptoJS.AES.decrypt((encryptedCustomer), SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const parsedDecryptedCustomer = JSON.parse(decryptedCustomer);
        setCustomer(parsedDecryptedCustomer);
    };

    const fetchData = async () => {
        const categories: Category[] = await ApiRequest.getCategories();
        if (categories) {
            setCategoryList(categories);
            console.log("categories", categories);
        }

        if (customer?.customerId) {
            const results: any[] = await ApiRequest.getAccountSummaryList(customer.customerId);
            if (results) {
                setAccountSummaryList(results);
                console.log("accountSummaryList", results);
            }
        }
    };



    return (
        <Grid container spacing={3} flexGrow={1}>
            <Grid size={12} />
            <Paper sx={{ width: "100%" }}>
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
                                                    Array.isArray(filteredSummaryList) && filteredSummaryList.length > 0 ? (
                                                        filteredSummaryList.map((a: AccountSummary, i: number) => (
                                                            <TableRow
                                                                key={c.categoryId}
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
                                                }
                                            </>
                                        )

                                    })
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
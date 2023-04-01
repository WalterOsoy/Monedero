
import ApiService from "../../Services/ApiServices";
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, IconButton, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Checkbox, Table, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const headCells = [
    { id: 'ID', label: 'ID' },
    { id: 'accountType', label: 'Account Type' },
    { id: 'description', label: 'Description' },
    { id: 'amount', label: 'Amount' },
    { id: 'creationDate', label: 'Creation Date' },
];

export default function Accounts() {
    const apiService = new ApiService();
    const location = useLocation();
    const userName = location.state?.userName;
    const [rows, setRows] = React.useState([]);
    const [selected, setSelected] = React.useState(rows);
    useEffect(() => {
        apiService.get(`/Account/${userName}`).then(response => {
            setRows(response.data)
        }).catch(error => {
            console.log(error)
        });
    }, [userName]);

    return (
        <React.Fragment>
            <Grid container direction="column" justifyContent="center" alignItems="center" >
                <Typography fontWeight="400" variant="h3" style={{ lineHeight: '143%' }}>
                    User Name: {userName}
                </Typography>
                <Button variant="outlined">
                    Create New Account
                </Button>
                <Grid item xs={8}>
                    <EnhancedTable rows={rows} selected={selected} setSelected={setSelected} userName={userName} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function EnhancedTableHead({ columns, onSelectAllClick, numSelected, rowCount, selected, userName }) {
    const apiService = new ApiService();

    const onDelete = () => {
        selected.map((item) => {
            apiService.delete(`/Account/${userName}/${item.id}`).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            });
        })
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {columns.map((column, index) => (
                    <TableCell key={index}>
                        <Typography fontWeight="600" style={{ lineHeight: '24px' }}>
                            {column.label}
                        </Typography>
                    </TableCell>
                ))}
                {numSelected > 0 && (
                    <TableCell key={9}>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTable({ selected, setSelected, rows, userName }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.reduce((acc, obj) => {
                if (!isSelected(obj, selected)) {
                    acc.push(obj);
                }
                return acc;
            }, [...selected]);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, obj) => {
        const objIndex = selected.findIndex((item) => item.id === obj.id);
        let newSelected = [];
        if (objIndex === -1) {
            newSelected = [...selected, obj];
        } else {
            newSelected = selected.filter((item) => item.id !== obj.id);
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (obj) => {
        const objIndex = selected.findIndex((item) => item.id === obj.id);
        return objIndex !== -1;
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
    }
    function formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return (
        // <Paper sx={{ width: '100%', mb: 2 }} style={{ borderRadius: '0px 0px 8px 8px', paddingBottom: '10px' }}>
        <React.Fragment>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <EnhancedTableHead
                        columns={headCells}
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={rows.length}
                        selected={selected}
                        userName={userName}
                    />
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row);
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell><Typography fontWeight="400" >{row.id}</Typography></TableCell>
                                        <TableCell><Typography fontWeight="400" >{row.accountType}</Typography></TableCell>
                                        <TableCell><Typography fontWeight="400" >{row.description}</Typography></TableCell>
                                        <TableCell><Typography fontWeight="400" >{formatMoney(row.amount)}</Typography></TableCell>
                                        <TableCell><Typography fontWeight="400" >{formatDate(row.creationDate)}</Typography></TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <MoreVertIcon color='primary' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {rows.length > 5 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </React.Fragment>
        // </Paper>
    );
}
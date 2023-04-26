
import ApiService from "../../Services/ApiServices";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Checkbox, Table, Button, Modal, Box, TextField, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const headCells = [
    { id: 'ID', label: 'ID' },
    { id: 'accountType', label: 'Account Type' },
    { id: 'description', label: 'Description' },
    { id: 'amount', label: 'Amount' },
    { id: 'creationDate', label: 'Creation Date' },
];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};

export default function Accounts() {
    const apiService = new ApiService();
    const location = useLocation();
    const userName = location.state?.userName;
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState(rows);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [userInfo, setUserInfo] = useState([]);
    const [accountType, setAccountType] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        apiService.get(`/Account/${userName}`).then(response => {
            setRows(response.data)
        }).catch(error => {
            console.log(error)
        });

        apiService.get(`/Users/${userName}`).then(response => {
            console.log(response.data)
            setUserInfo(response.data)
        }).catch(error => {
            console.log(error)
        });
    }, [userName]);

    const handleLogin = (e) => {
        apiService.post(`/Account`, {
            "userId": userInfo.id,
            "accountType": accountType,
            "creationDate": new Date(),
            "amount": amount,
            "description": description
        }).then(response => {
            if (response.status === 200) {
                apiService.get(`/Account/${userName}`).then(response => {
                    setRows(response.data)
                    handleClose()
                }).catch(error => {
                    console.log(error)
                });
            }
        }).catch(error => {
            console.log(error)
        });
    };

    return (
        <React.Fragment>
            <Grid container direction="column" justifyContent="center" alignItems="center" >
                <Typography fontWeight="400" variant="h3" style={{ lineHeight: '143%' }}>
                    User Name: {userName}
                </Typography>
                <Button variant="outlined" onClick={handleOpen}>
                    Create New Account
                </Button>
                <Grid item xs={8}>
                    <EnhancedTable rows={rows} selected={selected} setSelected={setSelected} userName={userName} setRows={setRows} />
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Typography component="h1" variant="h5">
                            Create New Account
                        </Typography>
                        <Select
                            required
                            id="simple-select"
                            placeholder={'Select one'}
                            onChange={(event) => setAccountType(event.target.value)}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>Select one</MenuItem>
                            <MenuItem id="SavingQ" value="Saving Q">Saving Q</MenuItem>
                            <MenuItem id="Saving$" value="Saving $">Saving $</MenuItem>
                            <MenuItem id="MonetaryQ" value="Monetary Q">Monetary Q</MenuItem>
                            <MenuItem id="Monetary$" value="Monetary $">Monetary $</MenuItem>
                        </Select>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Amount"
                            label="Amount"
                            name="Amount"
                            autoFocus
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Description"
                            label="Description"
                            name="Description"
                            autoFocus
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                        >
                            Create
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

function EnhancedTableHead({ columns, onSelectAllClick, numSelected, rowCount, selected, userName, setRows }) {
    const apiService = new ApiService();

    const onDelete = () => {
        selected.map((item) => {
            apiService.delete(`/Account/${userName}/${item.id}`).then(response => {

            }).catch(error => {
                console.log(error)
            });
            apiService.get(`/Account/${userName}`).then(response => {
                setRows(response.data)
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
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTable({ selected, setSelected, rows, userName, setRows }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(false);
    const [amount, setAmount] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const apiService = new ApiService();

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
    const handleLogin = (e) => {
        apiService.post(`/Account/bills`, {
            "id": selectedRow.id,
            "userId": selectedRow.userId,
            "accountType": selectedRow.accountType,
            "creationDate": selectedRow.creationDate,
            "amount": selectedRow.amount + Number(amount),
            "description": selectedRow.description,
        }).then(response => {
            if (response.status === 200) {
                apiService.get(`/Account/${userName}`).then(response => {
                    setRows(response.data)
                    handleClose()
                }).catch(error => {
                    console.log(error)
                });
            }
        }).catch(error => {
            console.log(error)
        });
    };
    return (
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
                        setRows={setRows}
                    />
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row);
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row)}
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
                                            <IconButton onClick={() => { setSelectedRow(row); handleOpen() }}>
                                                <EditIcon color='primary' />
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Typography component="h1" variant="h5">
                            {selectedRow.id}. {selectedRow.accountType}
                        </Typography>
                        Write the amount you want to add or debit
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Amount"
                            label="Amount"
                            name="Amount"
                            autoFocus
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                        >
                            Save Change
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
        // </Paper>
    );
}
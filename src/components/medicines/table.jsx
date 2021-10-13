import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {FullScreenDialog} from './dialog';
import { useState } from 'react';
import axios from 'axios';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'id',
    label: 'Id',
    minWidth: 170,
    align: 'right'
  }
];

function createData(name, id) {
  return { name, id };
}

export function StickyHeadTable({data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = data.map(e=>createData(e.c_name,e._id))
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);

  const heroku = 'https://saveo-task-back-end-ak.herokuapp.com';

  const [details,setDetails] = useState({});
  const [loading,setLoading] = useState(false);
  const handleClickOpen = (id) => {
    axios.get(`${heroku}/getMedicineDetails/${id}`)
    .then(res=>{
        if(res.status===200){
            setDetails(res.data);
            setLoading(true);
        }
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow className="row" hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>handleClickOpen(row.id)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FullScreenDialog open={open} handleClose={handleClose} loading={loading}  details={details}/>
    </Paper>
  );
}

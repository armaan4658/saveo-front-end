import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenDialog({open,handleClose,details,loading}) {
  let data = [];
  if(loading){
    for (const property in details[0]){
        data.push([property,details[0][property]])
    }
  }
  
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {loading ? details[0]['c_name'] : ''}
            </Typography>
          </Toolbar>
        </AppBar>
        {loading ? 
            (
                <TableContainer component={Paper}>
                <Table >
                    <TableBody>
                        {data.map((e,ind)=>(
                            ind!==data.length-1?
                                (
                                <TableRow>
                                    <TableCell align="left"> {e[0]} </TableCell>
                                    <TableCell align="right"> {e[1]} </TableCell>
                                </TableRow>
                            ):''
                        
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            ):''}
      </Dialog>
    </div>
  );
}

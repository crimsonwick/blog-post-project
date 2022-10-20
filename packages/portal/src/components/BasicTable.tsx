import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { AppContextInterface, UserInterface } from '../interface/App';

function createData(name: string, details: string): {name: string,details: string} {
  return { name, details };
}

export const BasicTable = () => {
  const context: AppContextInterface<UserInterface> | null = useContext(AppContext);
  if(!context){
    return <h1> Not Working</h1>;
  }
  else{
    if(!context.userData.id || !context.userData.email){
      return <h1> Not Working</h1>;
    }
  }
  const rows = [
    context && createData('uuid', context.userData.id),
    context && createData('Email', context.userData.email),
  ];
  return (
    <React.Fragment>
      <TableContainer component={Paper} elevation={2}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
};

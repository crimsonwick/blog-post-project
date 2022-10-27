import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AppContextInterface, UserInterface } from '../interface/App';
import { parseName } from '../services/LoginApi';
import { styled } from '@mui/material/styles';


/**
 * Returns created data from parameters
 * @param name 
 * @param details 
 * @returns 
 */
function createData(
  name: string,
  details: string
): { name: string; details: string } {
  return { name, details };
}

export const BasicTable = () => {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  if (!context) {
    return <h1> Not Working</h1>;
  } else {
    if (!context.userData.id || !context.userData.email) {
      return <h1> Not Working</h1>;
    }
  }
  const rows = [
    context && createData('Username', parseName(context.userData.email)),
    context && createData('Email', context.userData.email),
  ];

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <React.Fragment>
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='left'>{row.details}</TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

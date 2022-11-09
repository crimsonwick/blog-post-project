import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AppContextInterface, UserDetailInterface } from '../interface/App';
import { parseName } from '../services/LoginApi';
import { userDetail } from '../services/LoginApi';
import { useEffect, useState } from 'react';
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
  const context: AppContextInterface | null = useContext(AppContext);
  const [data, setData] = useState<UserDetailInterface>();
  const [loading, setLoading] = useState(false);

  const getUser = async (id: string) => {
    try {
      setLoading(true);
      if (id) {
        const response = await userDetail(id);
        setData(response.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(JSON.parse(localStorage.getItem('uuid') || '{}').id);
  }, []);
  debugger;
  const rows = [
    context && createData('Username', parseName(data?.email) as string),
    context && createData('Email', data?.email as string),
  ];

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
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
                  key={row?.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row?.name}
                  </TableCell>
                  <TableCell align='left'>{row?.details}</TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

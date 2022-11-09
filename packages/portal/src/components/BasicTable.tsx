import { Backdrop, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { AppContextInterface, UserDetailInterface } from '../interface/App';
import { parseName, userDetail } from '../services/LoginApi';
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
  const id = JSON.parse(localStorage.getItem('uuid') || '{}');

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
    getUser(id);
  }, [id]);

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
    <TableContainer component={Paper} elevation={2}>
      {data && (
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
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </TableContainer>
  );
};

import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from "axios";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


export default function Orders() {
  const [rows,setRows] = React.useState([]);
  // const navigate = useNavigate();

  const fetchData = async() =>{
    const res = await axios.get("http://localhost:3001/transactions");
    setRows(res.data);
    console.log(res);
  }

  const deletefn = async(id)=>{
    await axios.delete(`http://localhost:3001/delete/${id}`); 
    // navigate("/");
    window.location.reload();
  }
  React.useEffect(()=>{
    fetchData();
  },[])
  return (
    <React.Fragment>
      <Title>Transaction History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.mode}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
              <Button onClick={()=> deletefn(row.id)}>Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
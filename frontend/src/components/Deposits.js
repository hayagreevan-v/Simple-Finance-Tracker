import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';


export default function Deposits() {
  const [sum, setSum] = React.useState();
  const fetchData = async() =>{
    const res = await axios.get("http://localhost:3001/sum");
    setSum(res.data);
    console.log(res.data);
  }

  React.useEffect(()=>{
    fetchData();
  },[]);

  return (
    <React.Fragment>
      <Title>Total</Title>
      <Typography component="p" variant="h4">
        {sum?.sum}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {new Date().toLocaleDateString()}
      </Typography>
    </React.Fragment>
  );
}
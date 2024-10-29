import * as React from 'react';
import axios from 'axios';
import { FormControl , FormLabel, RadioGroup, Radio } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Input() {
  const [mode, setMode] = React.useState("debit");

  const theme = useTheme();
    const url = 'http://localhost:3001/add';
  const createTrans=async(transData)=>{
    try{
        // api call
        await axios.post(url, transData,{
          headers:{
            "Content-Type": "application/x-www-form-urlencoded"
          }
      });
        
    }catch(error){
        console.log(error)
    }
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        
    amount: parseInt(data.get('amount')),
    description: data.get('description'),
    mode: mode,
    });

    const transData = {
        amount: parseInt(data.get('amount')),
        description: data.get('description'),
        mode: mode,
          };
        createTrans(transData);
}

  return (
    
      
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginRight: 8,
            display: 'grid',
          }}
        >
       
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.5 }}>
            <TextField
              required
              fullWidth
              id="amount"    
              label="Amount"
              name="amount"
              type='decimal'
              autoComplete="amount"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="string"
              id="description"
              autoComplete="description"
            />

<FormControl>
  <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="debit"
    name="radio-buttons-group"
    row
    id='mode'
    onChange={(e) => setMode(e.target.value)}
  >
    <FormControlLabel value="debit" control={<Radio />} label="debit" id='debit'/>
    <FormControlLabel value="credit" control={<Radio />} label="credit" id='credit'/>
    
  </RadioGroup>
</FormControl>
            
            <Button
              type="submit"
              maxWidth="x"
              variant="contained"
              sx={{ mt: 0, mb: 0 }}
              onClick={() => {
                window.location.reload();
              }}
            >
              ADD
            </Button>           
    
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    
    
    
  );
}
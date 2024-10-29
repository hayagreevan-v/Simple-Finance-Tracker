const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();



const app = express();
const PORT = process.env.PORT;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials:true
  }
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended:true}));

const pg = require('pg')

const db = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
})
db.connect().then(()=>{
    console.log("PostgreSQL Database Connected!!!")
})


app.get("/",(req,res)=>{
    res.send("Hiii");
})

app.post("/add",async (req,res)=>{
    console.log(req.body);
    if(req.body.mode == 'credit'){
        await db.query("INSERT INTO transactions(description, mode, amount) VALUES ($1,$2,$3)",[req.body.description, req.body.mode, req.body.amount]);
    }else{
        await db.query("INSERT INTO transactions(description, mode, amount) VALUES ($1,$2,$3)",[req.body.description, req.body.mode, -req.body.amount]);
    }
    res.status(201).send("Record Inserted!");
})

app.get("/transactions", async(req,res)=>{
    const result = await db.query("SELECT * FROM transactions");
    res.send(result.rows);
})

app.get("/sum", async(req,res)=>{
    const result = await db.query("SELECT sum(amount) FROM transactions");
    res.send(result.rows[0]);
})

app.delete("/delete/:id", async (req,res)=>{
    await db.query("DELETE FROM transactions where id = $1",[req.params.id]);
    res.status(202).send("Deletion successful");
})



app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`);
})
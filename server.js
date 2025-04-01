import express from 'express';
import dotenv from 'dotenv';
import connection from './src/config/mongodb.js';
dotenv.config();


const app=express();
app.use(express.json());

connection();

app.get('/',(req,res)=>{
    res.send("backend macha")
});

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
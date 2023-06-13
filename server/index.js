import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Task from "./models/Task.js"

const app = express();
app.use(express.json());

async function connectmongoDB(){
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if(conn){
        console.log("Connected to MongoDB");
    }
}
connectmongoDB();

app.get('/health',(req,res)=>{
    res.json({
        success:true,
        message:'All good'
    })
})

//POST /task

app.post('/task',async(req,res)=>{
 const {title, description} = req.body;
 
const newTask = new Task({
    title : title,
    description :description
})

const savedTask = await newTask.save();

res.json({
    success:true,
    message:'Task saved successfully.',
    data : savedTask
})

});

//GET / tasks

//GET / task

//DELETE / task / delete

//PUT / task


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Listen on Port "+PORT)
})
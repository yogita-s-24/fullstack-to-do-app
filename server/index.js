import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';
dotenv.config();
const __dirname = path.resolve();

import Task from "./models/Task.js";

const app = express();
app.use(express.json());

async function connectMongoDB() {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
        console.log("Connected to MongoDB");
    }
}
connectMongoDB();

//Dumy API (basic server setup API)
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "All Good",
    });
});

// POST /task
app.post("/task", async (req, res) => {
    const { title, description } = req.body;

    const newTask = new Task({
        title: title,
        description: description,
    });

    const savedTask = await newTask.save();

    res.json({
        success: true,
        message: "Task saved successfully",
        data: savedTask,
    });
});

// Get /tasks   -  (for read all tasks)
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json({
        success: true,
        message: "All tasks fetched successfully",
        data: tasks,
    });
});

// Get /task
app.get("/task", async (req, res) => {
    const taskId = req.query.taskId;

    const task = await Task.findOne({ _id: taskId });

    if (!task) {
        return res.json({
            success: false,
            message: "Task not found",
            data: [],
        });
    }
    res.json({
        success: true,
        message: "Task successfully fetched",
        data: task,
    });
});

// POST/task/delete
app.post("/task/delete", async (req, res) => {
    const { taskId } = req.body;

    await Task.deleteOne({
        _id: taskId,
    });

    res.json({
        success: true,
        message: "Task successfully deleted",
    });
});

// Put/task

app.put("/task", async (req, res) => {
    const { taskId, title, description } = req.body;

    const task = await Task.updateOne({_id: taskId}, {
         $set: {title: title, description: description} 
    });

    res.json({
        success:true,
        message:'Task successfully updated'
    })
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    });
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

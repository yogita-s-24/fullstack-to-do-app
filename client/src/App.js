import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

const [tasks, setTasks] = useState([]);

const loadTask = async()=>{

  const {data} = await axios.get("/tasks");
  setTasks(data?.data)
}

useEffect(()=>{
  loadTask();
}, [])

  const addTask = async()=>{
    const {data} = await axios.post('/task',{
      title: title,
      description: description
    })
    alert(data?.message);
    setTitle("");
    setDescription("");
  }

const deleteTask = async(taskId)=>{
  const {data} = await axios.post('/task/delete', {
    taskId: taskId
  })
  alert(data?.message);
  loadTask();
}

  return (
    <>
      <h1 className="app-title">TODO APP</h1>
      <div className='container'>
      <div className="todo-form-container">
        <h2 className='add-task' >➕ Add Tasks</h2>
        <input type="text" className="todo-title" placeholder="Enter Title" value={title} onChange={(e)=>{
          setTitle(e.target.value);
        }}/>

        <input type="text" className="todo-description" placeholder="Enter Description" value={description} onChange={(e)=>{
          setDescription(e.target.value);
        }}/>
    
        <button className="todo-add" onClick={addTask}>Add Task</button> 
      </div>

      <div className="todo-container">
       {
        tasks.map((task)=>{
          return(
         
            <div className='task-card'>

              <p className='title-title'>{task?.title}</p>
              <p className='des-des'>{task?.description}</p>
              <div className='del-btn' onClick={()=>{
                deleteTask(task?._id);
              }}>❌</div>
              
            </div>
          )
        })
       }
      </div>
      
      </div>
    </>
  );
}

export default App;





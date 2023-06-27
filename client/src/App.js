import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = async()=>{
    const {data} = await axios.post('/task',{
      title: title,
      description: description
    })
    alert(data?.message);
    setTitle("");
    setDescription("");
  }

  return (
    <>
      <h1 className="app-title">TO DO APP</h1>
      <div className="todo-container">

      </div>
      <div className="todo-form-container">
        <input type="text" className="todo-title" placeholder="Enter Title" value={title} onChange={(e)=>{
          setTitle(e.target.value);
        }}/>

        <input type="text" className="todo-description" placeholder="Enter Description" value={description} onChange={(e)=>{
          setDescription(e.target.value);
        }}/>

        <button className="todo-add" onClick={addTask}>Add Task</button> 
      </div>
    </>
  );
}

export default App;





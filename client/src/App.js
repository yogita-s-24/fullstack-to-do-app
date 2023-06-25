import logo from './logo.svg';
import React, {useState, useEffect} from 'react';

import './App.css';

function App() {
  return (
   
    <>
      <h1 className="app-title">TO DO APP</h1>
      <div className="todo-container">
        
      </div>
      <div className="todo-form-container">
        <input type="text" className="todo-title" placeholder="Enter Your Title"/>
        <input type="text" className="todo-description" placeholder="Enter Your Description"/>
        <button className="todo-add">Add Task</button>
      </div>
    </>
  );
}

export default App;

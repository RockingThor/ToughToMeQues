/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useEffect } from "react";
import TodoList from "./TodoOperation/GetAllTodos";
import {Route, Routes, Link} from "react-router-dom"
import UpdateTodo from "./TodoOperation/updateTodo";
import AddTodo from "./TodoOperation/addTodo";




function App() {

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-center">
        <Link to="/" className="navbar-brand">Todo App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/add" className="nav-link">Add Todo</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>





      <Routes>
        <Route path="/" Component={TodoList}/>
        <Route path="/update/:id" Component={UpdateTodo}/>
        <Route path="/add" Component={AddTodo}/>
      </Routes>
    </>
  )
}


export default App;

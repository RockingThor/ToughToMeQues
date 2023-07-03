/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
const TodoList= ()=>{
    const [todos, setTodos]= useState([]);

    useEffect(()=>{
        const fetchTodos= async ()=>{
            try{
                const response= await fetch('http://localhost:3000/todos');
                if(!response.ok){
                    throw new Error('Failed to fetch todos');
                }
                const data= await response.json();
                setTodos(data);
            }catch(err){
                console.error(err);
            }
        };
        fetchTodos();
    }, []);


    const delteTodo= async (id,e)=>{
      e.preventDefault();
      const confirmDelete= window.confirm("Do you really want to delete the selected todo?");
      if(confirmDelete){
        try{
          const response= await fetch(`http://localhost:3000/todos/${id}`,{
                method: "DELETE"
            });
            if(!response.ok){
                throw new Error("Failed to add todo");
          }
          setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        }catch(err){
          console.error(err);
        }
      }
    }


  return(
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Completed</th>
                <th scope="col">Action</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.isDone ? "Yes" : "No"}</td>
                  <td>
                  <Link to={`/update/${todo.id}`} className="btn btn-warning">Update</Link>
                  </td>
                  <td>
                  <button onClick={(e)=>delteTodo(todo.id, e)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default TodoList;
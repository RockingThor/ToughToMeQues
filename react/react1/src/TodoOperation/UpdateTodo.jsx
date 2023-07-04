/* eslint-disable no-unused-vars */
import { useState, useEffect} from "react";
import { Router, useParams, useNavigate } from "react-router-dom";


const UpdateTodo= ()=>{
    const {id}= useParams();
    const [title, setTitle]= useState("");
    const [description, setDescription]= useState("");
    const [completed, setCompleted]= useState(false);
    const navigate= useNavigate();

    useEffect(()=>{
        const fetchTodos= async ()=>{
            try{
                const response= await fetch(`http://localhost:3000/todos/${id}`);
                if(!response.ok){
                    throw new Error('Failed to fetch todos');
                }
                const data= await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setCompleted(data.completed);
            }catch(err){
                console.error(err);
            }
        };
        fetchTodos();
    }, []);

    const onUpdate= async (e)=>{
        e.preventDefault();
        const newTodo={
            title: title,
            description: description,
            completed: completed
        }
        try{
            const response= await fetch(`http://localhost:3000/todos/${id}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
                })
            if(!response.ok){
                throw new Error("Failed to update todo");
            }
        }catch(err){
            console.error(err);
        }
        setTimeout(()=>{
            navigate("/");
        },2000);
    }
    return(
        <>
        <div className="container mt-4">
            <h2>Update Todo</h2>
            <form className="col-8" onSubmit={onUpdate}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="description"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    />
                </div>
                <div className=" form-check mb-3">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    id="completed"
                    checked= {completed}
                    onChange={(e)=> setCompleted(e.target.checked)}
                    />
                    <label htmlFor="completed" className="form-check-label">
                        Completed
                    </label>
                </div>
            <button className="btn btn-warning me-3" type="submit">
                Update Todo
            </button>
            <button onClick={(e)=>{navigate("/")}} className="btn btn-danger">
                Go Back
            </button>  
            </form>
        </div>  
        </>
    )
}

export default UpdateTodo;
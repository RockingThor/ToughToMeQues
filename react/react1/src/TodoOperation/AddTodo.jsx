import { useState } from "react";

/* eslint-disable no-unused-vars */
const AddTodo= ()=>{

    const [title, setTitle]= useState("");
    const [description, setDescription]= useState("");
    const [completed, setCompleted]= useState(false);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const newTodo={
            title: title,
            description: description,
            completed: completed
        }
        try{
            const response= await fetch("http://localhost:3000/todos",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });
            if(!response.ok){
                throw new Error("Failed to add todo");
            }

            setTitle("");
            setDescription("");
        }catch(err){
            console.error(err);
        }
    }
    
    return(
        <>
        <div className="container mt-4">
            <h2>Add Todo</h2>
            <form className="col-8" onSubmit={handleSubmit}>
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
            <button className="btn btn-primary" type="submit">
                Add Todo
            </button>   
            </form>
        </div>  
        </>
    )
}

export default AddTodo;
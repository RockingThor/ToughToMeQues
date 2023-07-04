const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const app=express();

app.use(cors());
app.use(express.json());

const SECRET= '';

const todoSchema= new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const Todo= mongoose.model('todo', todoSchema);

mongoose.connect('mongodb+srv://rohit:MGvEKGQxuJ9iWSnc@todo.s7fvlbb.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

app.post('/todos', async(req,res)=>{
    const{title, description,completed} =req.body;
    const newTodo= new Todo({title, description, completed});
    let response = await newTodo.save();
    if(response){
        return res.status(200).json({id: response._id});
    }else{
        return res.status(404).json({error: "unable to connect with database"});
    }
});

app.get('/todos', async(req,res)=>{
    const todos= await Todo.find();
    if(todos){
        return res.status(200).json(todos);
    }else{
        return res.status(404).json({error: "No todos found!!"});
    }
});

app.get('/todos/:id', async (req,res)=>{
    const id=req.params.id;
    //const query = { _id: new ObjectId(id) };
    const todo= await Todo.findById(id);
    if(todo){
        return res.status(200).json(todo);
    }else{
        return res.status(404).json({error: "The todo is not found"})
    }
});

app.put('/todos/:id', async(req,res)=>{
    const id=req.params.id;
    const todo=await Todo.findByIdAndUpdate(id, req.body, {new: true});
    if(todo){
        return res.status(203).json({message: "The todo is updated"});
    }else{
        return res.status(400).json({error: "Something went wrong"});
    }
});

app.delete('/todos/:id', async(req,res)=>{
    const id=req.params.id;
    const todo= await Todo.findByIdAndDelete(id);
    if(todo){
        return res.status(200).json({message: "Deletion successful"});
    }else{
        return res.status(400).json({message: "Something went wrong"});
    }
});

app.listen(3000,()=>{
    console.log("The app is listening on port 3000");
})
const express=require("express");
const bodyParser=require("body-parser");
var fs=require("fs");

const app=express();
app.use(bodyParser.json());
const PORT=3000;

var count=0;

app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`);
});

async function updateCount(){
    let temp=0;
    try{
        const data=await fs.promises.readFile('./count.txt','utf8');
        temp=parseInt(data,10);
        temp++;
    }catch(err){
        console.log(err);
    }
    try{
        let data1=temp;
        await fs.writeFile(filePath, data1.toString(), 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
        })
    }catch(err){
        console.log(err);
        return;
    }
    count=temp;
}

function saveTodosToAFile(newTodo) {
    let existingTodos=[];
    try {
        const data = fs.readFileSync('./todos.json');
        existingTodos = JSON.parse(data);
        console.log(existingTodos);
    } catch (err) {
        console.error('Error reading todos:', err);
    }
    existingTodos.push(newTodo);
    const data = JSON.stringify(existingTodos, null, 2);
    fs.writeFile('./todos.json', data, (err) => {
        if (err) {
          console.error('Error saving todos:', err);
          return [];
        } else {
          console.log('Todos saved successfully.');
          return newTodo;
        }
    });
}

function fetchAllTodos(){
    try{
        const data=fs.readFileSync('./todos.json');
        const todos=JSON.parse(data);
        return todos;
    }catch(err){
        console.log(err);
        return [];
    }
}

function searchForATodo(id){
    try{
        const todos=fetchAllTodos();
        for(let i=0;i<todos.length;i++){
            if(todos[i].id==id){
                return i;
            }
        }
        
    }catch(err){
        console.log(err);
        return [];
    }
}

function updateATodo(id, todo){
    let index=searchForATodo(id);
    if(index){
        let todos=fetchAllTodos();
        todos[i]=todo;
        fs.writeFile('./todos.json', todos, (err) => {
            if (err) {
              console.error('Error saving todos:', err);
              return [];
            } else {
              console.log('Todos saved successfully.');
              return newTodo;
            }
        });
    }else{
        return false;
    }
}

function deleteATodo(id){
    let index=searchForATodo(id);
    if(index){
        let todos=fetchAllTodos();
        todos.splice(i,1);
        fs.writeFile('./todos.json', todos, (err) => {
            if (err) {
              console.error('Error saving todos:', err);
              return [];
            } else {
              console.log('Todos saved successfully.');
              return newTodo;
            }
        });
    }else{
        return false;
    }
}

app.post('/todos', (req,res)=>{
    updateCount().then(()=>{
    count++;
    let todo={
        id: count,
        title: req.body.title,
        completed: req.body.completed,
        description: req.body.description
    }
    let response=saveTodosToAFile(todo);
    if(!response){
        res.status(201).json({id: count});
    }else{
        res.status(404).json({error: "Something is broken"});
    }
    })
})

app.get('/todos',(req,res)=>{
    let todos=fetchAllTodos();
    res.status(200).json(todos);
})

app.put('/todos/:id', (req,res)=>{
    let id=req.params.id;
    let todo={
        id: id,
        title: req.body.title,
        completed: req.body.completed,
        description: req.body.description
    }
    let response=updateATodo(id,todo);
    if(response){
        res.status(201).json(todo);
    }else{
        res.status(404).json({error: "Something is broken"});
    }
})

app.get('/todos/:id',(req,res)=>{
    let id=req.params.id;
    let todo=searchForATodo(id);
    if(todo){
        res.status(200).json(todo);
    }else{
        res.status(404).json({error: "Something is broken"});
    }
})

app.delete('/todos/:id', (req,res)=>{
    let id=req.params.id;
    let response=deleteATodo(id);
    if(response){
        res.status(200).json({success: "Deletion is successful"});
    }else{
        res.status(404).json({error: "Something is broken"});
    }
})

app.get('/test',(req,res)=>{
    updateCount().then(()=>{
        res.status(200).json({value: count});
    })
})
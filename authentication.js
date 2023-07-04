const { json } = require('body-parser');
const express = require('express');
const app = express();
const jwt=require("jsonwebtoken");

app.use(express.json());

const secretKey="my31323";

let ADMINS = [];
let USERS = [];
let COURSES = [];

const generateToken= (user)=>{
  let payload= {
    username: user.username
  };
  payload=JSON.stringify(payload);
  //console.log("Was here");
  return jwt.sign(payload, secretKey);
}

const authenticateAdminJWT =(req,res,next)=>{
  const authHeader=req.headers.authorization;
  if(authHeader){
    const token=authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, secretKey, (err,user)=>{
        console.log("Was here");
      if(err){
        return res.sendStatus(403);
      }
      req.user=user;
      let authenticated=false;
      for(let i=0;i<ADMINS.length;i++){
        if(ADMINS[i].username===user.username){
            authenticated=true;
            next();
        }
      }
      if(!authenticated){
        return res.sendStatus(403);
      }
    });
  }else{
    return res.sendStatus(403);
  }
}

const authenticateUserJWT =(req,res,next)=>{
  const authHeader=req.headers.authorization;
  if(authHeader){
    const token=authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, secretKey, (err,user)=>{
        console.log("Was here");
      if(err){
        return res.sendStatus(403);
      }
      req.user=user;
      let authenticated=false;
      for(let i=0;i<USERS.length;i++){
        if(USERS[i].username===user.username){
            authenticated=true;
            next();
        }
      }
      if(!authenticated){
        return res.sendStatus(403);
      }
    });
  }else{
    return res.sendStatus(403);
  }
}

app.post('/admin/signup', async (req,res)=>{
    let username=req.body.username;
    let password= req.body.password;
    for(let i=0;i<ADMINS.length;i++){
        if(ADMINS[i].username===username){
            return res.status(404).json({error: "The user already exist"});
        }
    }
    let user={
        username: username,
        password: password
    };
    ADMINS.push(user);
    return res.status(200).json({token: await generateToken(user)});
});

app.post('/admin/login', authenticateAdminJWT, (req,res)=>{
    return res.status(200).json({ message: 'Logged in successfully' });
})

app.post('/test', (req,res)=>{
    return res.sendStatus(200);
});

app.listen(3000, ()=>{
    console.log("The app is running on port 3000");
})
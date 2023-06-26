const fs=require("fs");

function callback(err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
}

fs.readFile('./a.txt','utf8', callback);
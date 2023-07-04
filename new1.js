let arr =[1,2,3];

let arr2 = arr.map((value)=>{
    return value*2;
})

console.log(arr2);


let arr3=[
    {
        name: "rohit",
        age: 25
    },
    {
        name: "sanchit",
        age: 12
    }
]

let arr4= arr3.map((value)=>{
    if(value.age>=25){
        return {
            name: value.name,
            age: value.age,
            allow: true
        }
    }else{
        return {
            name: value.name,
            age: value.age,
            allow: false
        }
    }
});
console.log(arr4);
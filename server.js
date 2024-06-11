const express =require("express");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.json());

//definnnig API route 
app.listen(3000,()=>{
    console.log(`server is running on port 3000`);

});

app.get(`/api/data`,(req,res)=>{
    const data={
        message:"Hello from API updated evening"
    }
    res.json(data);
});
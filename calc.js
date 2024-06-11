process.stdin.on("data", (chunk) =>{
  const  input= chunk.toString().trim();
    if (input=="quite"){
        
        process.exit(0);
    }

    try {
        console.log(eval(input));
    } catch (exception) {
        
    }
})

process.stdout.write("enter the equation ");
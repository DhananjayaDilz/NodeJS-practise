const { stdout } = require("process");
const readline= require("readline");
const rl =readline.createInterface({
    input:process.stdin,
    output:stdout
});

function question(){
    rl.question("enter the equation ", (input)=>{
        if (input=="quit") {
            rl.close();
        }else{
            
            try {
                console.log(eval(input));
            } catch (error) {
                console.log("error");
            }
            question();
        }

        
    });
}

question();
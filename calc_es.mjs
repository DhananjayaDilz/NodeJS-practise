import * as readline from "readline";
import { stdin as input, stdout as output }  from "process";




const rl =readline.createInterface({
    input,
    output
});


function question(query) {
    return new Promise(resolve => {
        rl.question(query,resolve);
    });
    
}
let answer=await question('eter the equatuion ');
while (answer !="quit") {
    try {
        console.log(eval(answer))
    } catch (exception) {
        console.log("hello ")
    }
     answer=await question('eter the equatuion ');
}


rl.close();
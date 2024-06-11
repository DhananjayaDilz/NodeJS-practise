import * as readline from "readline";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({
    input,
    output
});

function question(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

async function main() {
    let answer = await question('Enter the equation: ');
    while (answer !== 'quit') {
        try {
            console.log(eval(answer));
        } catch (exception) {
            console.log("Invalid input, please try again.");
        }
        answer = await question('Enter the equation: ');
    }
    rl.close();
}

main();

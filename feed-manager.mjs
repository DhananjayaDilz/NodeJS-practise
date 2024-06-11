import { access, constants, readFile, writeFile } from "fs/promises";
import {dirname, join} from "path";
import { fileURLToPath } from "url";

console.log(import.meta.url);

const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
const jsonFile=join(__dirname,"feeds.json");
console.log(jsonFile);

export async function getLinks(){
    try {
        await access(jsonFile,constants.F_OK);// check file is ok 
    } catch (error) {
        await writeFile(jsonFile,JSON.stringify([])) // file is create with a empty array as a string Convert a JavaScript object into a string with JSON.stringify().


    }
    const content=await readFile(jsonFile,{encoding:"utf8"});
    return JSON.parse(content); //function JSON.parse() to convert text into a JavaScript object
}

export async function saveLinks(links){
    await writeFile(jsonFile,JSON.stringify(links)); //when write to the file it must be string
}
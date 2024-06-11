import axios from "axios";
import { getLinks, saveLinks } from "./feed-manager.mjs";
import { rl, close } from "./rl.mjs";
import {EventEmitter} from 'events';
import Parser from "rss-parser";


const parser= new Parser();
const feeds= await getLinks();
const emitter= new EventEmitter();//create a emitter object 

function prompt(){
    rl.setPrompt("enter the command add, list, del, read ,quit : ");
    rl.prompt();
}
 rl.on("line",(input)=>{ //this will take the entire data on the  line after press enter 
    let cmdPart=input.trim().split(" ");
    emitter.emit(cmdPart[0],cmdPart[1]);// set the event listers ("event argument extract from the first part of the user input in this case it will be del/add/list, other  data that used for the event )
    
 })
 
emitter.on("quit", async ()=>{ // if user type "quit" async function invoked
    await saveLinks(feeds);
    close();
})

emitter.on("list", ()=>{
    feeds.forEach((url,number) => {
        console.log(`${url}\t ${number}`);
       
    });
    prompt();
})

emitter.on("add", async (url)=>{
    if (url==undefined) {
        console.log("please insert the url with the add command")
    }else{
        feeds.push(url);
    }
    prompt();

    
})

emitter.on("del", (index)=>{
    if(index==undefined){
        console.log("please insert the index with the del command")

    }else{
        if (index>-1 && index<feeds.length) {
            feeds.splice(index,1) //splice method get 2 arguments index to start the deletion process and number of items need to dlt after starting the delt process
        }else{
            console.log("index out of range ")
        }
    }
    prompt();
})

emitter.on('read', async (index) => {
    if (index === undefined) {
        console.log('Please include the index of the URL to reads.');
    } else {
        index = parseInt(index, 10);

        if (index > -1 && index < feeds.length) {
            if (index > -1 && index < feeds.length) {
                let {data} = await axios.get(feeds[index]); // get data as json 

                let feed = await parser.parseString(data);// convert to string

                feed.items.forEach(item => console.log(item.title));
            } else {
                console.log('The provided index is out of range.');
            }
        } else {
            console.log('The provided index is out of range.');
        }
    }
    
    prompt();
});

prompt();


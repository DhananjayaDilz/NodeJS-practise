import axios from "axios";
import { getLinks, saveLinks } from "./feed-manager.mjs";
import { question, close } from "./rl.mjs";

const feeds = await getLinks();

let input = await question("enter the command add, list, del, read ,quit : ");
while (input != "quit") {

    let cmdPart = input.trim().split(' ');
    let cmd = cmdPart[0];
    //List
    if (cmd == "list") {
        feeds.forEach((url, index) => {
            console.log(`${url}\t ${index}`);
        });
    }

    //add URL
    if (cmd == "add") {
        if (cmdPart.length < 2) {
            console.log("please enter url with add command");
        } else {
            feeds.push(cmdPart[1]);
            
        }
    }

    //del from index
    if (cmd == "del") {
        if (cmdPart.length < 2) {
            console.log("please enter index with del command");
        } else {
            let index = parseInt(cmdPart[1], 10);
            if (index < -1 && index < feeds.length) {
                feeds.splice(index, 1);
            } else {
                console.log("index out of range");
            }
        }

       
    }

    if (cmd=="read") {
        let {data}= await axios.get("https://www.reddit.com/r/node.rss");
        console.log(data);
    }

    input = await question("enter the command add, list, del, read ,quit : ");
}
await saveLinks(feeds);
close();
import { Client } from "../src/client";
require('dotenv').config();


let token: string;
if(process.env.TOKEN) {
  token = process.env.TOKEN;
} else {
  throw new Error("TOKEN environment variable is missing. Please provide a valid token.");
}



const client = new Client(token);


client.on("message", (msg)=>{
    console.log(msg.text)
    client.sendMessage(msg.chat.id, `${msg.from.first_name} says ${msg.text}`)
})

client.startPoll(30);
import { Client } from "../src/client";
require('dotenv').config();


let token: string;
if(process.env.TOKEN) {
  token = process.env.TOKEN;
} else {
  throw new Error("TOKEN environment variable is missing. Please provide a valid token.");
}



const client = new Client(token);

const message = await client.sendMessage(process.env.TEST_CHANNEL || -4005456628, "Hello");
const replyMessage = await client.sendMessage(process.env.TEST_CHANNEL || -4005456628, "Reply", 10, false);
console.log(message);
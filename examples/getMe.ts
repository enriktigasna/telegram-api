import { Client } from "../src/client";
require('dotenv').config();


let token: string;
if(process.env.TOKEN) {
  token = process.env.TOKEN;
} else {
  throw new Error("TOKEN environment variable is missing. Please provide a valid token.");
}



const client = new Client(token);

const user = await client.getMe();
console.log(user);
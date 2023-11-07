import { Client } from "../src/client";
require('dotenv').config();


let token: string;
if(process.env.TOKEN) {
  token = process.env.TOKEN;
} else {
  throw new Error("TOKEN environment variable is missing. Please provide a valid token.");
}



const client = new Client(token);

const update = await client.getUpdates();
console.log(update);

const update_id: number = update[update.length - 1].update_id;
const update2s = await client.getUpdates(update_id, 100, 5);

console.log(update2s);
import { assert } from "chai";
import { notEqual } from "assert";
import { Client } from "../src/client";
import 'dotenv/config';

let token: string;
if(process.env.TOKEN) {
  token = process.env.TOKEN;
} else {
  throw new Error("TOKEN environment variable is missing. Please provide a valid token.");
}
const client = new Client(token);
const TEST_CHANNEL = process.env.TEST_CHANNEL || -4005456628;

describe("getMe() method", ()=> {
  it("fetches self user", async()=>{
    const user = await client.getMe();
    assert.notEqual(user.id, undefined)
  })
})

describe("sendMessage() method", ()=> {
  it("sends message", async()=>{
    const testText = "Testing";
    const message = await client.sendMessage(TEST_CHANNEL, testText);
    assert.notEqual(message.message_id, undefined)
    assert.equal(message.text, testText)
  })
  it("replies to message", async()=>{
    const testText = "Testing reply";
    const message = await client.sendMessage(TEST_CHANNEL, testText, parseInt(process.env.TEST_REPLY_ID || "5"));

    assert.notEqual(message.message_id, undefined)
    assert.equal(message.text, testText)
    assert.equal(message.reply_to_message?.message_id, process.env.TEST_REPLY_ID || 5)
    assert.equal(message.reply_to_message?.chat.id, TEST_CHANNEL)

  })
  it("sends message despite failed reply, if allow_sending_without_reply=true", async()=>{
    const testText = "Testing reply";
    const message = await client.sendMessage(TEST_CHANNEL, testText, 999, true);
    assert.notEqual(message.message_id, undefined)
    assert.equal(message.text, testText)
  })
})
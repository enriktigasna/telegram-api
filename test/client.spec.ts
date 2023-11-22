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

describe("Client Class", () => {
  describe("getMe() method", () => {
    it("fetches self user", async () => {
      try {
        const user = await client.getMe();
        assert.notEqual(user.id, undefined, "User ID should not be undefined");
      } catch (error: any) {
        assert.fail(`Error in getMe test: ${error.message}`);
      }
    });
  });

  describe("sendMessage() method", () => {
    it("sends message", async () => {
      try {
        const testText = "Testing";
        const message = await client.sendMessage(TEST_CHANNEL, testText);
        assert.notEqual(message.message_id, undefined, "Message ID should not be undefined");
        assert.equal(message.text, testText, "Message text should match");
      } catch (error: any) {
        assert.fail(`Error in sendMessage test: ${error.message}`);
      }
    });

    it("replies to message", async () => {
      try {
        const testText = "Testing reply";
        const message = await client.sendMessage(TEST_CHANNEL, testText, parseInt(process.env.TEST_REPLY_ID || "5"));

        assert.notEqual(message.message_id, undefined, "Message ID should not be undefined");
        assert.equal(message.text, testText, "Message text should match");
        assert.equal(message.reply_to_message?.message_id, process.env.TEST_REPLY_ID || 5, "Reply ID should match");
        assert.equal(message.reply_to_message?.chat.id, TEST_CHANNEL, "Reply channel ID should match");
      } catch (error: any) {
        assert.fail(`Error in sendMessage reply test: ${error.message}`);
      }
    });

    it("sends message despite failed reply if allow_sending_without_reply", async () => {
      try {
        const testText = "Testing reply";
        const message = await client.sendMessage(TEST_CHANNEL, testText, 999, true);
        assert.notEqual(message.message_id, undefined, "Message ID should not be undefined");
        assert.equal(message.text, testText, "Message text should match");
      } catch (error: any) {
        assert.fail(`Error in sendMessage allow_sending_without_reply test: ${error.message}`);
      }
    });
  });
});
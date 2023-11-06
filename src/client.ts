import EventEmitter from "events";
import type { APIResponse, User, Message } from "./types";

/**
 * Represents a client for interacting with the Telegram Bot API.
 * @extends EventEmitter
 */
export class Client extends EventEmitter {
  /** The Telegram bot token used for authentication. */
  token: string;
  /** The base URL for the Telegram API server. */
  server: string;
  /** The base URL for making API requests. */
  base_url: string;


  /**
   * Creates a new Client instance.
   * @param {string} token - The Telegram bot token.
   */
  constructor(token: string) {
    super();
    this.token = token;
    this.server = "https://api.telegram.org";
    this.base_url = `${this.server}/bot${this.token}`;
  }

  /**
   * Retrieves information about the bot.
   * @async
   * @returns {Promise<User>} A Promise that resolves to the bot's user object.
   * @throws {Error} If there is an error fetching user data from the API.
   */
  async getMe(): Promise<User> {
    const fetchData = async (): Promise<APIResponse> => {
      const response = await fetch(`${this.base_url}/getMe`);
      const data: APIResponse = await response.json();
      return data;
    };

    const apiResponse: APIResponse = await fetchData();

    if (apiResponse.ok && apiResponse.result) {
      return apiResponse.result;
    } else {
      throw new Error(apiResponse.description || "Error fetching user data");
    }
  }

  /**
   * Sends a message to a specified chat.
   * @async
   * @param {string|number} chat_id - The ID of the chat where the message will be sent.
   * @param {string} text - The text of the message.
   * @param {number=} reply_to_message_id - (Optional) ID of the message to reply to.
   * @param {boolean=} allow_sending_without_reply - (Optional) Whether to allow sending without a reply.
   * @returns {Promise<Message>} A Promise that resolves to the sent message object.
   * @throws {Error} If there is an error sending the message via the API.
   */
  async sendMessage(
    chat_id: string | number,
    text: string,
    reply_to_message_id?: number,
    allow_sending_without_reply?: boolean
  ): Promise<Message> {
    const fetchData = async (): Promise<APIResponse> => {
      let link = `${this.base_url}/sendMessage?chat_id=${chat_id}&text=${text}`;

      if (reply_to_message_id != undefined) {
        link += `&reply_to_message_id=${reply_to_message_id}`;
      }

      if (allow_sending_without_reply != undefined) {
        link += `&allow_sending_without_reply=${allow_sending_without_reply}`;
      }

      const response = await fetch(link);
      const data: APIResponse = await response.json();
      return data;
    };

    const apiResponse: APIResponse = await fetchData();

    if (apiResponse.ok && apiResponse.result) {
      return apiResponse.result;
    } else {
      throw new Error(apiResponse.description || "Error sending message");
    }
  }
}

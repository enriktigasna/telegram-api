import EventEmitter from "events";
import type { APIResponse, User, Message, Update } from "./types";

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
  /** The offset used for polling */
  offset: number;

  private pollingActive: boolean = false;

  /**
   * Creates a new Client instance.
   * @param {string} token - The Telegram bot token.
   */
  constructor(token: string) {
    super();
    this.token = token;
    this.server = "https://api.telegram.org";
    this.base_url = `${this.server}/bot${this.token}`;
    this.offset = 0;
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
      throw new Error(
        `Error getting update \n\n \x1b[33m ${apiResponse.error_code} \x1b[0m \x1b[34m ${apiResponse.description} \x1b[0m`
      );
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
      throw new Error(
        `Error getting update \n\n \x1b[33m ${apiResponse.error_code} \x1b[0m \x1b[34m ${apiResponse.description} \x1b[0m`
      );
    }
  }
  /**
   * Retrieves updates from the Telegram server.
   * @async
   * @param {number=} offset - (Optional) The update ID to start from.
   * @param {number=} limit - (Optional) The maximum number of updates to retrieve.
   * @param {number=} timeout - (Optional) Timeout in seconds for long polling.
   * @param {string[]=} allowed_updates - (Optional) Array of allowed update types.
   * @returns {Promise<Update[]>} A Promise that resolves to an array of updates.
   * @throws {Error} If there is an error fetching updates from the API.
   */
  async getUpdates(
    offset?: number,
    limit?: number,
    timeout?: number,
    allowed_updates?: string[]
  ): Promise<Update[]> {
    const fetchData = async (): Promise<APIResponse> => {
      let link = `${this.base_url}/getUpdates`;

      if (offset != undefined) {
        link += `?offset=${offset}`;
      }

      if (limit != undefined) {
        link += `&limit=${limit}`;
      }

      if (timeout != undefined) {
        link += `&timeout=${timeout}`;
      }

      if (allowed_updates != undefined) {
        link += `&allowed_updates=${allowed_updates}`;
      }

      const response = await fetch(link);

      const data: APIResponse = await response.json();
      return data;
    };

    const apiResponse: APIResponse = await fetchData();

    if (apiResponse.ok && apiResponse.result) {
      return apiResponse.result;
    } else {
      throw new Error(
        `Error getting update \n\n \x1b[33m ${apiResponse.error_code} \x1b[0m \x1b[34m ${apiResponse.description} \x1b[0m`
      );
    }
  }
  /**
   * Processes a Telegram update and emits corresponding events.
   * @param {Update} update - The Telegram update to process.
   */
  processUpdate(update: Update) {
    if (update.message) {
      this.emit('message', update.message);
    }
    if (update.edited_message) {
      this.emit('editedMessage', update.edited_message);
    }
    if(update.edited_channel_post) {
      this.emit('editedChannelPost', update.edited_channel_post)
    }
    if(update.channel_post) {
      this.emit('channelPost', update.channel_post)
    }
    this.emit('update', update)
  }
  /**
   * Starts polling for updates from the Telegram server.
   * @async
   * @param {number} timeout - Timeout in seconds for long polling. Default is 30.
   */
  async startPoll(timeout: number=30) {
    this.pollingActive = true;

    while (this.pollingActive) {
      try {
        const updates = await this.getUpdates(this.offset, 1, timeout);

        for (const update of updates) {
          this.offset = update.update_id + 1;
          this.processUpdate(update);
        }
      } catch (error) {
        // Handle the error here or allow it to propagate to the calling code
        console.error(`Error in startPoll: ${error}`);
      }

      // Add a delay before making the next polling request
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  /**
   * Stops polling for updates.
   */
  async stopPolling(){
    this.pollingActive = false;
  }
}

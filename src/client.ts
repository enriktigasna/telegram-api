import EventEmitter from "events";
import type { APIResponse, User, Message } from "./types";

export class Client extends EventEmitter {
  token: string;
  server: string;
  base_url: string;

  constructor(token: string) {
    super();
    this.token = token;
    this.server = "https://api.telegram.org";
    this.base_url = `${this.server}/bot${this.token}`;
  }

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
      throw new Error(apiResponse.description || "Error fetching user data");
    }
  }
}

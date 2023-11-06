/**
 * Represents the response from the Telegram API.
 */
export interface APIResponse {
    /** Indicates whether the API request was successful. */
    ok: boolean;
    /** The API response result, if available. */
    result?: any;
    /** The error code, if there was an error in the API request. */
    error_code?: number;
    /** A description of the error, if any. */
    description?: string;
}

/**
 * Represents a Telegram user.
 */
export interface User {
    /** The unique identifier for the user. */
    id: number;
    /** Indicates whether the user is a bot. */
    is_bot: boolean;
    /** The user's first name. */
    first_name: string;
    /** The user's last name, if available. */
    last_name?: string;
    /** The user's username, if available. */
    username?: string;
    /** The user's language code, if available. */
    language_code?: string;
    /** Indicates if the user has a premium account. */
    is_premium?: true;
    /** Indicates if the user can be added to attachment menus. */
    added_to_attachment_menu?: true;
    /** Indicates if the user can join groups. */
    can_join_groups?: boolean;
    /** Indicates if the user can read all group messages. */
    can_read_all_group_messages?: boolean;
    /** Indicates if the user supports inline queries. */
    supports_inline_queries?: boolean;
}

/**
 * Represents a message sent via Telegram.
 */
export interface Message {
    /** The message being replied to, if applicable. */
    reply_to_message?: Message;
    /** The ID of the message thread, if available. */
    message_thread_id?: number | undefined;
    /** The sender of the message. */
    from?: User;
    /** The text content of the message. */
    text?: string;
    /** The timestamp when the message was sent. */
    date: number;
    /** The chat where the message was sent. */
    chat: Chat;
    /** The unique ID of the message. */
    message_id: number;
}

/**
 * Represents a chat in Telegram.
 */
export interface Chat {
    /** The unique identifier for the chat. */
    id: number;
    /** The type of the chat (private, group, supergroup, or channel). */
    type: ChatType;
}

/** Represents the type of chat in Telegram (private, group, supergroup, or channel). */
export type ChatType = "private" | "group" | "supergroup" | "channel";
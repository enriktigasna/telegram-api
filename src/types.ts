type ChatType = "private" | "group" | "supergroup" | "channel";

export interface APIResponse {
    ok: boolean,
    result?: any,
    error_code?: number,
    description?: string
}

export interface User {
    id: number,
    is_bot: boolean,
	first_name: string,
    last_name?: string,
    username?: string,
    language_code?: string,
    is_premium?: true,
    added_to_attachment_menu?: true,
	can_join_groups?: boolean,
	can_read_all_group_messages?: boolean,
	supports_inline_queries?: boolean
}

export interface Message {
    reply_to_message?: Message;
    message_thread_id?: number | undefined;
    from?: User;
    text?: string;
    date: number;
    chat: Chat;
    message_id: number;
}

export interface Chat {
    id: number;
    type: ChatType;
}
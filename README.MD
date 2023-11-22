# Telebot.js (Node.js with TypeScript)

> telegram bot api for node.js written in typescript

Telebot.js is a Node.js library written in TypeScript that provides a simple interface for interacting with the Telegram Bot API. With this library, you can easily send messages, get information about your bot, and handle updates from Telegram. The library also supports polling and events for real-time interaction with the Telegram server.

## Installation
```bash
npm i telebot.js
```

## Example
```typescript
const { Client } = require("telebot.js")

const token = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with telegram bot token
const client = new Client(token);

(async () => {
  try {
    // Get information about the bot
    const me: User = await client.getMe();
    console.log('Bot Info:', me);

    // Send a message
    const chatId = 'CHAT_ID'; // Replace with the destination chat ID
    const message: Message = await client.sendMessage(chatId, 'Hello, Telegram!');
    console.log('Message Sent:', message);

    // Send on events
    client.on("message", (msg)=>{
    console.log(msg.text)
    client.sendMessage(msg.chat.id, `${msg.from.first_name} says ${msg.text}`)
    
    // Turn on polling
    client.startPolling();
  } catch (error) {
    console.error('Error:', error);
  }
})();
```
## API Methods
### getMe()

Get information about the bot.

### sendMessage()
Send a message to a specified chat.

    chat_id: The ID of the chat where the message will be sent.
    text: The text of the message.
    reply_to_message_id (Optional): ID of the message to reply to.
    allow_sending_without_reply (Optional): Whether to allow sending without a reply.
### getUpdates()

Get updates from the Telegram server.

    offset (Optional): The starting update ID.
    limit (Optional): Maximum number of updates to retrieve.
    timeout (Optional): Timeout in seconds for long polling.
    allowed_updates (Optional): List of update types to receive.

### startPolling()

Start polling for updates from the Telegram server.

    timeout (Default 30): Timeout in seconds for long polling.

### stopPolling()

Stop polling for updates.

## TODO
-  Add more methods for extended API coverage. ✅ [COMPLETED]
-  Implement polling and events for real-time updates. ✅ [COMPLETED]

## Documentation

For detailed documentation, refer to the Typedoc generated documentation in the docs folder.

To generate documentation
``` bash
npm run docs
```

## Testing

This project uses Mocha and Chai for testing. Run tests using the following command:
```bash
npm test
```

## Contributing
Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback and contributions are welcome!

## License
This project is licensed under the GPL-3 License - see the LICENSE file for details.
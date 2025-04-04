const { StreamChat } = require('stream-chat');
require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

const serverClient = StreamChat.getInstance(api_key, api_secret);

const userId = "test_user";
const token = serverClient.createToken(userId);

console.log("Generated Token:", token);


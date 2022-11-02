import { config } from 'dotenv';
import pkg from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = pkg;

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

const BOT_TOKEN = process.env.BOT_TOKEN;
client.login(BOT_TOKEN);

const prefix = '>';

client.on('ready', () => {
    console.log("Bot is online!");
    client.user.setActivity('It works!', {type: "WATCHING"});
})

client.on("messageCreate", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    if(command === 'test') {
        message.channel.send("Bot is working!");
    }
    if(command === 'ping') {
        message.channel.send("Pong!");
    }
});

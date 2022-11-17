import { config } from 'dotenv';
import pkg from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder, MessageEmbed, PermissionsBitField, Permissions } = pkg;

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
let channelid = '';

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
    if(command === 'setchannel'){
        channelid = message.channel.id.toString();
        message.channel.send(channelid);
    }
    if(command === 'currchannel'){
        message.channel.send(channelid);
    }
});

client.on('messageDelete', message => {
    channelid = '1037039300132470865';
    if(channelid){
        if(!message.partial){
            const channel = client.channels.cache.get(channelid);
            message.channel.send("Grabbed channelid");
            if(channel){
                message.channel.send("Found deleted message.");
                const embed = new EmbedBuilder()
                    .setTitle('Deleted Message')
                    .addFields('Author', '${message.author.tag} (${message.author.id})')
                    .addFields('Channel', '${message.channel.name} (${message.channel.id})')
                    .setDescription(message.content)
                    .setTimestamp();
                channel.send(embed);
            }
        }
    }else{
        message.channel.send("No channel is set.");
    }
});
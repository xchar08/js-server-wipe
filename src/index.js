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
var channelid = null;

client.on('ready', () => {
    console.log("Bot is online!");
    client.user.setActivity('server messages 🤡',{type: 'WATCHING'});
});

client.on("messageCreate", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    if(command === 'ping') {
        message.channel.send("Pong!");
    }
    if(command === 'setchannel'){
        message.channel.send("Setting channel...");
        channelid = message.channel.id.toString();
        message.channel.send("Set channel.");
    }
});

client.on('messageDelete', message => {
    if(channelid){
        if(!message.partial){
            if(message.author.id != '1031575267094843504'){
                var channel = client.channels.cache.get(channelid);
                message.channel.send("Grabbed channel ID.");
                if(channel){
                    message.channel.send("Found deleted message.");
                    const embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('Deleted message.')
                        .addFields(
                            { name: 'Author', value: `${message.author.tag} (${message.author.id})`, inline: true },
                            { name: 'Channel', value: `${message.channel.name} (${message.channel.id})`, inline: true}
                        )
                        .setDescription(message.content)
                        .setTimestamp();
                    channel.send({ embeds: [embed] });
                }
            }else{
                message.channel.send("Cannot log bot messages.");
            }
        }
    }else{
        message.channel.send("No channel is set.");
    }
});
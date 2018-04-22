const Discord = require("discord.js");
const client = new Discord.Client();
const embed = require("./Files/embeds");
const CopyrightCommand = require("./Files/Commands/command-copyright");
const RoleCommand = require("./Files/Commands/command-role");
const HelpCommand = require("./Files/Commands/command-help");

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


/*
let logchannel = client.channels.get("427823157303574528");
let log = client.channels.find("name", "join-leave");
*/
const prefix = "cloudy ";

client.on("guildMemberAdd", async (member) => await embed.SendLogChannelWelcomeMessage(member) );

client.on("guildMemberRemove", async (member) => await embed.SendLogChannelLeaveMessage(member) );

client.on("message", async (msg) => {
    if (msg.author.bot && msg.channel.type !== "text") { return; }

    let args = msg.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (msg.content.startsWith(`${prefix}copyright`)) await CopyrightCommand(msg, args); 
    if (msg.content.startsWith(`${prefix}role`)) await RoleCommand(msg, args);
    if (msg.content.startsWith(`${prefix}help`)) await HelpCommand(msg, args);

}); 

client.on("messageReactionAdd", async (reaction, user) => {
    if (user.bot) { return; }
    let member = client.guilds.get("424976122527088640").member(user.id);
    if (reaction.message.id === "427868918745661450") {
        if (!member.roles.has("425023342530134018")) {
            await member.addRole("425023342530134018");
        }
        else { console.log(`Some user somehow managed to react to the accept message w/o havin' access to it. (ID: ${user.id})`); }
    }
    else { console.log("Reaction not the accept message."); }
});

client.on("raw", async event => {
    if (event.t !== "MESSAGE_REACTION_ADD") return;

    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id);

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    client.emit("messageReactionAdd", reaction, user);
});

client.on("ready", () => {
    console.log("I am ready!");
    client.user.setPresence({
        status: "online",
        game: {
            name: "your commands",
            type: "LISTENING"
        }
    });
});

client.login(process.env.TOKEN);

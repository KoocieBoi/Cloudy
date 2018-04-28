const Discord = require("discord.js");
const Client = new Discord.Client();

// Events
const ReadyEvent = require("./Files/Events/ready");
const MessageEvent = require("./Files/Events/message");
const RawEvent = require("./Files/Events/raw");
const MessageReactionAddEvent = require("./Files/Events/messageReactionAdd");
const GuildMemberAddEvent = require("./Files/Events/guildMemberAdd");
const GuildMemberRemoveEvent = require("./Files/Events/guildMemberRemove");

// AutoPing
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
let logchannel = Client.channels.get("427823157303574528");
let log = Client.channels.find("name", "join-leave");
*/

Client.on("guildMemberAdd", (Member) => GuildMemberAddEvent(Member) );

Client.on("guildMemberRemove", (Member) => GuildMemberRemoveEvent(Member) );

Client.on("message", (Message) => MessageEvent(Message, Client));

Client.on("messageReactionAdd", (Reaction, User) => MessageReactionAddEvent(Client, Reaction, User));

Client.on("raw", (Event) => RawEvent(Client, Event));

Client.on("ready", () => ReadyEvent(Client));

Client.login(process.env.TOKEN);

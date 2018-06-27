const Discord = require("discord.js");
const client = new Discord.Client();

// Events
const readyEvent = require("./Files/Events/ready");
const messageEvent = require("./Files/Events/message");
const raw = require("./Files/Events/raw");
const messageReactionAdd = require("./Files/Events/messageReactionAdd");
const guildMemberAdd = require("./Files/Events/guildMemberAdd");
const guildMemberRemove = require("./Files/Events/guildMemberRemove");

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

// Events
client.on("guildMemberAdd", (member) => guildMemberAdd(member) );
client.on("guildMemberRemove", (member) => guildMemberRemove(member) );
client.on("message", (msg) => messageEvent(msg, client));
client.on("messageReactionAdd", (reaction, user) => messageReactionAdd(client, reaction, user));
client.on("raw", (event) => raw(client, event));
client.on("ready", () => readyEvent(client));

client.login(process.env.TOKEN);

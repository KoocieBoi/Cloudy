const CopyrightCommand = require("../Commands/copyright");
const RoleCommand = require("../Commands/role");
const HelpCommand = require("../Commands/help");

module.exports = (Message) => {
    const Prefix = "cloudy ";
    if (Message.author.bot && Message.channel.type !== "text") { return; }

    let Arguments = Message.content.slice(Prefix.length).trim().split(" ");
    let cmd = Arguments.shift().toLowerCase();

    if (Message.content.startsWith(`${Prefix}copyright`)) CopyrightCommand(Message, Arguments); 
    if (Message.content.startsWith(`${Prefix}role`)) RoleCommand(Message, Arguments);
    if (Message.content.startsWith(`${Prefix}help`)) HelpCommand(Message, Arguments);
};
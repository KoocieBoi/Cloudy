const CopyrightCommand = require("../Commands/copyright");
const RoleCommand = require("../Commands/role");
const HelpCommand = require("../Commands/help");
const DogCommand = require("../Commands/dog");
const CatCommand = require("../Commands/cat");
const CatfactCommand = require("../Commands/catfact");

module.exports = (Message, Client) => {
    const Prefix = "cl!" || "<@427799231399591946> " || "<@427799231399591946>";
    if (Message.author.bot || Message.channel.type !== "text") { return; }

    let Arguments = Message.content.slice(Prefix.length).trim().split(" ");
    let Command = Arguments.shift().toLowerCase();

    if (Command === "copyright") CopyrightCommand(Message, Arguments); 
    if (Command === "role") RoleCommand(Message, Arguments);
    if (Command === "help") HelpCommand(Message, Arguments);
    if (Command === "dog") DogCommand(Message, Arguments, Client);
    if (Command === "cat") CatCommand(Message, Arguments, Client);
    if (Command === "catfact") CatfactCommand(Message, Arguments, Client);
};
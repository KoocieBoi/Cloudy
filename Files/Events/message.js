const CopyrightCommand = require("../Commands/copyright");
const RoleCommand = require("../Commands/role");
const HelpCommand = require("../Commands/help");
const DogCommand = require("../Commands/dog");
const CatCommand = require("../Commands/cat");
const CatfactCommand = require("../Commands/catfact");
const BirdCommand = require("../Commands/bird");
const FoxCommand = require("../Commands/fox");
const ShibeCommand = require("../Commands/shibe");
const Configuration = require("../configuration");

module.exports = (msg, client) => {
    if (msg.author.bot || msg.channel.type !== "text") { return; }

    let Prefix = {
        letter: Configuration.bot.letterPrefix,
        mention: Configuration.bot.mentionPrefix(),
    };
    let args, cmd;

    if (msg.content.startsWith(Prefix.letter)) {
        args = msg.content.slice(Prefix.letter.length).trim().split(" ");
        cmd = args.shift().toLowerCase();
    }
    if (msg.content.startsWith(Prefix.mention)) {
        args = msg.content.slice(Prefix.mention.length).trim().split(" ");
        cmd = args.shift().toLowerCase();
    }

    if (cmd === "copyright") CopyrightCommand(msg, args); 
    if (cmd === "role") RoleCommand(msg, args);
    if (cmd === "help") HelpCommand(msg, args);
    if (cmd === "dog") DogCommand(msg, args, client);
    if (cmd === "cat") CatCommand(msg, args, client);
    if (cmd === "catfact") CatfactCommand(msg, args, client);
    if (cmd === "bird") BirdCommand(msg, args, client);
    if (cmd === "fox") FoxCommand(msg, args, client);
    if (cmd === "shibe") ShibeCommand(msg, args, client);
};
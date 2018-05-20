const Discord = require("discord.js");
const Configuration = require("./configuration");
const CommandsFile = require("./commands.json");
const RolesFile = require("./roles.json");
const EmbedColor = Configuration.embeds.color;

exports.SendLogChannelWelcomeMessage = async (Member) => {
    let log = Member.guild.channels.get(Configuration.guild.logJLChannelID);
    const LogChannelWelcomeMessage = new Discord.RichEmbed()
        .setColor(Configuration.embeds.JoinColor)
        .setAuthor("Someone had joined us! (^ _ ^)/", Member.user.avatarURL)
        .setDescription(`Say hi to **[${Member.user.username}](https://)**.\nI hope that you'll enjoy being part of the server, ${Member}`)
        .setImage(Configuration.guild.JoinGIFLink)
        .setFooter(`User joined (${Member.user.id}#${Member.user.discriminator})`)
        .setTimestamp();
    await log.send({ embed: LogChannelWelcomeMessage });
};

exports.SendLogChannelLeaveMessage = async (Member) => {
    let log = Member.guild.channels.get(Configuration.guild.logJLChannelID);
    const LogChannelLeaveMessage = new Discord.RichEmbed()
        .setColor(Configuration.embeds.LeaveColor)
        .setAuthor("Someone had left us! ( >д<)", Member.user.avatarURL)
        .setDescription(`Sadly, **[${Member.user.username}](https://)** left us.\nI hope he'll be back soon, or not.`)
        .setImage(Configuration.guild.LeaveGIFLink)
        .setFooter(`User left (${Member.user.id}#${Member.user.discriminator})`)
        .setTimestamp();
    await log.send({ embed: LogChannelLeaveMessage });
};

exports.SendCopyrightCommandMessage = async (Message) => {
    let CopyrightMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Icon")
        .setDescription("Bot's icon was made by [**Nick Roach**](https://www.elegantthemes.com/)\n[Icon](https://www.iconfinder.com/icons/1055089)\n[License (GPLv3)](https://www.gnu.org/copyleft/gpl.html)")
        .setTimestamp();
    Message.channel.send({ embed: CopyrightMessage });
};

exports.SendCommandWrongUsage = async (Message, CommandNumber) => {
    let CommandWrongUsage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Bad command usage!")
        .setDescription(`Usage: \n${CommandsFile[CommandNumber].usage}\n\nExample: \n${CommandsFile[CommandNumber].example}`)
        .setFooter(`encountered by ${Message.author.username} on ${CommandsFile[CommandNumber].id}`)
        .setTimestamp();
    Message.channel.send({ embed: CommandWrongUsage });
};

exports.SendColourCommandListMessage = async (Message) => {
    
    function checkLevel(level) {
        switch (level) {
        case 1: return Message.member.roles.has(RolesFile.colours.levels[0]);
        case 10: return Message.member.roles.has(RolesFile.colours.levels[1]);
        default: break;
        }
    }
    function makeColourString(numArray) {
        let finalString = "";
        for (let i = 0 ; i <= RolesFile.colours.name[numArray].length - 1 ; i++) {
            finalString += `${RolesFile.colours.name[numArray][i]}  (**${RolesFile.colours.nameID[numArray][i]}**)\n`;
        }
        return finalString;
    }
    let ColoursCommandListMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Self-Assignable Roles")
        .setTimestamp();

    ColoursCommandListMessage.addField("Roles for Everyone", makeColourString(0));
    if (checkLevel(1)) {
        ColoursCommandListMessage.addField("Roles for Level 1", makeColourString(1));
    }
    else {
        ColoursCommandListMessage.addField("Roles for Level 1", "not unlocked yet!");
    }
    if (checkLevel(10)) {
        ColoursCommandListMessage.addField("Roles for Level 10", makeColourString(2));
    }
    else {
        ColoursCommandListMessage.addField("Roles for Level 10", "not unlocked yet!");
    }

    Message.channel.send({ embed: ColoursCommandListMessage });
};

exports.SendRoleCommandMessage = async (Message, role, index) => {
    let RoleInfo = {
        name: role.name[index],
        nameID: role.nameID[index],
        ID: role.ID[index],
    };
    let RoleCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription(`You've received the \`${RoleInfo.name} (${RoleInfo.nameID})\` role.`)
        .setFooter("enjoy your role!")
        .setTimestamp();
    await Message.member.addRole(RoleInfo.ID);
    await Message.channel.send({ embed: RoleCommandMessage });
};

exports.SendAlreadyHasColour = async (Message) => {
    let AlreadyHasColour = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription("You already have a colour! You need to remove your colour with the `cloudy role remove <colour>` command before getting a new colour.")
        .setTimestamp();
    await Message.channel.send({ embed: AlreadyHasColour });
};

exports.SendRoleListCommandMessage = async (Message) => {
    
    function checkLevel(level) {
        switch (level) {
        case 1: return Message.member.roles.has(RolesFile.colours.levels[0]);
        case 10: return Message.member.roles.has(RolesFile.colours.levels[1]);
        default: break;
        }
    }

    function makeColourString(minIndex, maxIndex) {
        let finalString = "";
        for (let i = minIndex; i <= maxIndex; i++) {
            finalString += `${RolesFile.colours.name[i]} • \`ID: ${RolesFile.colours.nameID[i]}\`\n`;
        }
        return finalString;
    }

    let RoleListCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Self-Assignable Roles")
        .setDescription("**Command:** `cloudy role (add | remove) ID`")
        .setTimestamp();

    RoleListCommandMessage.addField("Colours for everyone", makeColourString(0, 5), true);

    switch (checkLevel(1)) {
        case true:
            RoleListCommandMessage.addField("Colours for level 1", makeColourString(6, 11), true);
            break;
        default:
            RoleListCommandMessage.addField("Colours for level 1", "not unlocked yet!", true);
            break;
    }

    switch (checkLevel(10)) {
        case true:
            RoleListCommandMessage.addField("Colours for level 10", makeColourString(12, 16), true);
            break;
        default:
            RoleListCommandMessage.addField("Colours for level 10", "not unlocked yet!", true);
            break;
    }
    
    let RolesList = "";
    for (let i = 0; i < RolesFile.roles.name.length; i++) {
        RolesList += `${RolesFile.roles.name[i]} • \`ID: ${RolesFile.roles.nameID[i]}\`\n`
    }
    RoleListCommandMessage.addField("Roles", RolesList);

     // RoleListCommandMessage.addField("Roles", "osu! • `ID: o!`");

    Message.channel.send({ embed: RoleListCommandMessage });

};

exports.SendRoleRemoveMessage = async (Message, role, index) => {
    let RoleInfo = {
        name: role.name[index],
        nameID: role.nameID[index],
        ID: role.ID[index],
    };
    let RoleRemoveMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription(`You've removed the \`${RoleInfo.name} (${RoleInfo.nameID})\` role from yourself.`)
        .setTimestamp();
    await Message.channel.send({ embed: RoleRemoveMessage });
    await Message.member.removeRole(RoleInfo.ID);
};

exports.SendRoleRemoveNotHaveMessage = async (Message) => {
    let RoleRemoveNotHaveMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription("You do not have that role!")
        .setTimestamp();
    await Message.channel.send({ embed: RoleRemoveNotHaveMessage });
};

exports.SendRoleAlreadyHaveThat = async (Message) => {
    let RoleAlreadyHaveThat = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription("You already have that role!")
        .setTimestamp();
    await Message.channel.send({ embed: RoleAlreadyHaveThat });
};

exports.SendHelpCommandNoArgumentsProvidedMessage = async (Message) => {
    function MakeHelpStringByCategory (Category, Embed) {
        let CommandsFound = 0; // This will also be used as an index when listing the commands.
        let CommandsListFormat = "";
        CommandsFile.forEach((Command) => {
            if (Command.id === "firstItem") return;
            if (Command.category === Category) {
                CommandsFound++;
                CommandsListFormat += `${CommandsFound}. **${Command.name}** (${Command.id}): ${Command.description}\n`;
            }
        });
        Embed.addField(`${Category} (${CommandsFound} commands)`, CommandsListFormat);
    }
    let CategoryList = CommandsFile[0].categoryList;
    let HelpCommandNoArgumentsProvidedMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setFooter("cloudy help <id> for help about a command")
        .setTitle("List of commands");
    for (let i = 0; i < CategoryList.length ;i++) MakeHelpStringByCategory(CategoryList[i], HelpCommandNoArgumentsProvidedMessage);
    Message.channel.send({embed: HelpCommandNoArgumentsProvidedMessage});
};

exports.SendHelpCommandCommandMessage = async (Message, Command) => {
    const HelpCommandCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setTitle(Command.name)
        .setDescription(Command.description)
        .addField("Usage", Command.usage)
        .addField("Example", Command.example)
        .setFooter(`Looking at the usage for the command ${Command.id}`);
    Message.channel.send({embed: HelpCommandCommandMessage});
};

exports.SendHelpCommandCommandNotFoundMessage = async (Message, Command) => {
    const HelpCommandCommandNotFoundMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setTitle("Command not found.")
        .setDescription(`The \`${Command}\` command was not found`);
    Message.channel.send({embed: HelpCommandCommandNotFoundMessage});
};

exports.SendDogCommandMessage = (Message, Dog) => {
    const DogCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setImage(Dog.data.message)
        .setTitle('Woof! 🐶')
        .setFooter(`Dog image requested by ${Message.author.username}`);
    Message.channel.send({embed: DogCommandMessage});
};

exports.SendCatCommandMessage = (Message, Cat) => {
    const CatCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setImage(Cat)
        .setTitle('Meow! 🐱')
        .setFooter(`Cat image requested by ${Message.author.username}`);
    Message.channel.send({embed: CatCommandMessage});
};

exports.SendErrorWebhook = (Message, Client, EncounteredError, Command) => {
    let LoggingChannel = Client.channels.get("439735218832670721");
    LoggingChannel.fetchWebhooks()
        .then((Webhook) => {
            let Hook = Webhook.find("name", "Logging");
            if (!Hook) return console.log("Error! No webhook!");
            else {
                Hook.send("", {
                    "username": "Error",
                    "avatarURL": "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-256.png",
                    "embeds": [{
                        "color": EmbedColor,
                        "description": `An error has occured while executing the \`${Command}\` command!`,
                        "fields": [
                            {
                                "name": "Info about the user",
                                "value": `Username: ${Message.author.username}#${Message.author.discriminator}\nID: ${Message.author.id}`
                            },
                            {
                                "name": "Error",
                                "value": `\`\`\`\n${EncounteredError}\n\`\`\``
                            }
                        ],
                        "timestamp": new Date()
                    }]
                });
            }
        });
};

exports.SendCatFactCommandMessage = (Message, Fact) => {
    const CatFactCommandMessage = new Discord.RichEmbed()
        .setTitle('Cat fact 🐱')
        .setDescription(Fact)
        .setColor(EmbedColor)
        .setFooter(`Cat fact requested by ${Message.author.username}`)
        .setTimestamp();
    Message.channel.send({embed: CatFactCommandMessage});
}

exports.SendBirdCommandMessage = (Message, Bird) => {
    const BirdCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setImage(Bird)
        .setTitle('Chirp! 🐦')
        .setFooter(`Bird image requested by ${Message.author.username}`);
    Message.channel.send({embed: BirdCommandMessage});
};

exports.SendFoxCommandMessage = (Message, Fox) => {
    const FoxCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setImage(Fox)
        .setTitle('Wa-pa-pa-pa-pa-pa-pow! 🦊')
        .setFooter(`Fox image requested by ${Message.author.username}`);
    Message.channel.send({embed: FoxCommandMessage});
};

exports.SendShibeCommandMessage = (Message, Shibe) => {
    const ShibeCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setTimestamp()
        .setImage(Shibe)
        .setTitle('Wouf! 🐶')
        .setFooter(`Shibe image requested by ${Message.author.username}`);
    Message.channel.send({embed: ShibeCommandMessage});
};
const Discord = require("discord.js");
const EmbedColor = "#3498db";
const CommandsFile = require("./commands.json");
const RolesFile = require("./roles.json");

exports.SendDMWelcomeMessage = async (Member) => {
    const DMWelcomeMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Hi! (^ _ ^)/", Member.user.avatarURL)
        .setDescription(`Welcome to my land, __${Member.user.username}__. I hope you'll have a great time here. \n Be sure to read the rules and accept them to get access to the other channels.`)
        .setFooter("I will send you a server guide after you accept the rules!")
        .setTimestamp();
    await Member.send({ embed: DMWelcomeMessage });
};

exports.SendLogChannelWelcomeMessage = async (Member) => {
    let log = Member.guild.channels.get("427823157303574528");
    const LogChannelWelcomeMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Someone had joined us! (^ _ ^)/", Member.user.avatarURL)
        .setDescription(`Say hi to __${Member.user.username}__.`)
        .setFooter(`ID: ${Member.user.id} (${Member.user.discriminator})`)
        .setTimestamp();
    await log.send({ embed: LogChannelWelcomeMessage });
};

exports.SendLogChannelLeaveMessage = async (Member) => {
    let log = Member.guild.channels.get("427823157303574528");
    const LogChannelLeaveMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Someone had left us! ( >д<)", Member.user.avatarURL)
        .setDescription(`Sadly, __${Member.user.username}__ left us.`)
        .setFooter(`ID: ${Member.user.id} (${Member.user.discriminator})`)
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

exports.SendRoleCommandMessage = async (Message, roleName, roleNameID, role) => {
    let RoleCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription(`You've received the \`${roleName} (${roleNameID})\` role.`)
        .setFooter("enjoy your role!")
        .setTimestamp();
    await Message.member.addRole(role);
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

    function makeColourString(numArray) {
        let finalString = "";
        for (let i = 0 ; i <= RolesFile.colours.name[numArray].length - 1 ; i++) {
            finalString += `${RolesFile.colours.name[numArray][i]} • \`ID: ${RolesFile.colours.nameID[numArray][i]}\`\n`;
        }
        return finalString;
    }

    let RoleListCommandMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setAuthor("Self-Assignable Roles")
        .setDescription("**Command:** `cloudy role (add | remove) ID`")
        .setTimestamp();

    RoleListCommandMessage.addField("Colours for everyone", makeColourString(0), true);

    switch (checkLevel(1)) {
    case true:  RoleListCommandMessage.addField("Colours for level 1", makeColourString(1), true); break;
    default: RoleListCommandMessage.addField("Colours for level 1", "not unlocked yet!", true); break;
    }
    switch (checkLevel(10)) {
    case true: RoleListCommandMessage.addField("Colours for level 10", makeColourString(2), true); break;
    default: RoleListCommandMessage.addField("Colours for level 10", "not unlocked yet!", true); break;
    }
    
    RoleListCommandMessage.addField("Roles", "osu! • `ID: o!`");

    Message.channel.send({ embed: RoleListCommandMessage });

};

exports.SendRoleRemoveMessage = async (Message, roleName, roleNameID, role) => {
    let RoleRemoveMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription(`You've removed the \`${roleName} (${roleNameID})\` role from yourself.`)
        .setTimestamp();
    await Message.channel.send({ embed: RoleRemoveMessage });
    await Message.member.removeRole(role);
};

exports.SendRoleRemoveNotHaveMessage = async (Message) => {
    let RoleRemoveNotHaveMessage = new Discord.RichEmbed()
        .setColor(EmbedColor)
        .setDescription("You do not have that colour!")
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

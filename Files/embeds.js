const Discord = require("discord.js");
const embedcolor = "#3498db";
const command = require("./commands.json");
const colours = require("./colours.json");

exports.SendDMWelcomeMessage = async (member) => {
    const DMWelcomeMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setAuthor("Hi! (^ _ ^)/", member.user.avatarURL)
        .setDescription(`Welcome to my land, __${member.user.username}__. I hope you'll have a great time here. \n Be sure to read the rules and accept them to get access to the other channels.`)
        .setFooter("I will send you a server guide after you accept the rules!")
        .setTimestamp();
    await member.send({ embed: DMWelcomeMessage });
};

exports.SendLogChannelWelcomeMessage = async (member) => {
    let log = member.guild.channels.get("427823157303574528");
    const LogChannelWelcomeMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setAuthor("Someone had joined us! (^ _ ^)/", member.user.avatarURL)
        .setDescription(`Say hi to __${member.user.username}__.`)
        .setFooter(`ID: ${member.user.id} (${member.user.discriminator})`)
        .setTimestamp();
    await log.send({ embed: LogChannelWelcomeMessage });
};

exports.SendLogChannelLeaveMessage = async (member) => {
    let log = member.guild.channels.get("427823157303574528");
    const LogChannelLeaveMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setAuthor("Someone had left us! ( >д<)", member.user.avatarURL)
        .setDescription(`Sadly, __${member.user.username}__ left us.`)
        .setFooter(`ID: ${member.user.id} (${member.user.discriminator})`)
        .setTimestamp();
    await log.send({ embed: LogChannelLeaveMessage });
};

exports.SendCopyrightCommandMessage = async (msg) => {
    let CopyrightMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setAuthor("Icon")
        .setDescription("Bot's icon was made by [**Nick Roach**](https://www.elegantthemes.com/)\n[Icon](https://www.iconfinder.com/icons/1055089)\n[License (GPLv3)](https://www.gnu.org/copyleft/gpl.html)")
        .setTimestamp();
    msg.channel.send({ embed: CopyrightMessage });
};

exports.SendCommandWrongUsage = async (msg, CommandNumber) => {
    let CommandWrongUsage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setAuthor("Bad command usage!")
        .setDescription(`Usage: \n${command[CommandNumber].usage}\n\nExample: \n${command[CommandNumber].example}`)
        .setFooter(`encountered by ${msg.author.username} on ${command[CommandNumber].id}`)
        .setTimestamp();
    msg.channel.send({ embed: CommandWrongUsage });
};

exports.SendColourCommandListMessage = async (msg) => {
    
    function checkLevel(level) {
        switch (level) {
        case 1: return msg.member.roles.has(colours.levels[0]);
        case 10: return msg.member.roles.has(colours.levels[1]);
        default: break;
        }
    }
    function makeColourString(numArray) {
        let finalString = "";
        for (let i = 0 ; i <= colours.name[numArray].length - 1 ; i++) {
            finalString += `${colours.name[numArray][i]}  (**${colours.nameID[numArray][i]}**)\n`;
        }
        return finalString;
    }
    let ColoursCommandListMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
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

    msg.channel.send({ embed: ColoursCommandListMessage });
};

exports.SendRoleCommandMessage = async (msg, roleName, roleNameID, role) => {
    let RoleCommandMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setDescription(`You've received the \`${roleName} (${roleNameID})\` role.`)
        .setFooter("enjoy your role!")
        .setTimestamp();
    await msg.member.addRole(role);
    await msg.channel.send({ embed: RoleCommandMessage });
};

exports.SendAlreadyHasColour = async (msg) => {
    let AlreadyHasColour = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setDescription("You already have a colour! You need to remove your colour with the `cloudy role remove <colour>` command before getting a new colour.")
        .setTimestamp();
    await msg.channel.send({ embed: AlreadyHasColour });
};

exports.SendRoleListCommandMessage = async (msg) => {
    
    function checkLevel(level) {
        switch (level) {
        case 1: return msg.member.roles.has(colours.levels[0]);
        case 10: return msg.member.roles.has(colours.levels[1]);
        default: break;
        }
    }

    function makeColourString(numArray) {
        let finalString = "";
        for (let i = 0 ; i <= colours.name[numArray].length - 1 ; i++) {
            finalString += `${colours.name[numArray][i]} • \`ID: ${colours.nameID[numArray][i]}\`\n`;
        }
        return finalString;
    }

    let RoleListCommandMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
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

    msg.channel.send({ embed: RoleListCommandMessage });

};

exports.SendRoleRemoveMessage = async (msg, roleName, roleNameID, role) => {
    let RoleRemoveMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setDescription(`You've removed the \`${roleName} (${roleNameID})\` role from yourself.`)
        .setTimestamp();
    await msg.channel.send({ embed: RoleRemoveMessage });
    await msg.member.removeRole(role);
};

exports.SendRoleRemoveNotHaveMessage = async (msg) => {
    let RoleRemoveNotHaveMessage = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setDescription("You do not have that colour!")
        .setTimestamp();
    await msg.channel.send({ embed: RoleRemoveNotHaveMessage });
};

exports.SendRoleAlreadyHaveThat = async (msg) => {
    let RoleAlreadyHaveThat = new Discord.RichEmbed()
        .setColor(embedcolor)
        .setDescription("You already have that role!")
        .setTimestamp();
    await msg.channel.send({ embed: RoleAlreadyHaveThat });
};

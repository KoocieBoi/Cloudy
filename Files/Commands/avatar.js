let Embeds = require("../embeds");

module.exports = (msg, args) => {
    let user = {
        mention: msg.mentions.members.first(),
        author: msg.author
    };

    if (args[1] || args[0] !== user.mention) Embeds.SendCommandWrongUsage(msg, 12);
    else if (args[0] === user.mention) Embeds.SendAvatarCommandMessage(msg, user.mention);
    else if (args[0] === undefined) Embeds.SendAvatarCommandMessage(msg, user.author);  

};

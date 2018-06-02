let Embeds = require("../embeds");

module.exports = (msg, args) => {
    let user = {
        mention: msg.mentions.members.first(),
        author: msg.author
    };

    function returnArgsIsMention() {
        if (args[0]) {
            if (args[0] === user.mention.toString()) return true;
            else return false;
        }
        else return true;
    }

    if (args[1] || !returnArgsIsMention()) Embeds.SendCommandWrongUsage(msg, 12);
    else if (args[0] === user.mention.toString()) Embeds.SendAvatarCommandMessage(msg, user.mention);
    else if (!args[0]) Embeds.SendAvatarCommandMessage(msg, user.author);  

};

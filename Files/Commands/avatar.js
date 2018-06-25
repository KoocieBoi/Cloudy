let Embeds = require("../embeds");

module.exports = (msg, args) => {
    function returnArgsIsMention() {
        if (args[0] && msg.mentions && msg.mentions.members && args[0] === msg.mentions.members.first().toString()) return true;
        else return false;
    }

    let finalUser;
    if (returnArgsIsMention()) finalUser = msg.mentions.members.first().user;
    else finalUser = msg.author;

    if (args[1] || !returnArgsIsMention()) Embeds.SendCommandWrongUsage(msg, 12);
    else Embeds.SendAvatarCommandMessage(msg, finalUser);

};

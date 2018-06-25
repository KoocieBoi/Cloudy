let Embeds = require("../embeds");

module.exports = (msg, args) => {
    let author = msg.author;
    let mention = msg.mentions;

    function returnArgsIsMention() {
        if (args[0] && mention && args[0] === mention.members.first().toString()) return true;
        else return false;
    }

    let finalUser;
    if (returnArgsIsMention()) finalUser = mention.members.first();
    else finalUser = author;

    if (args[1] || !returnArgsIsMention()) Embeds.SendCommandWrongUsage(msg, 12);
    else Embeds.SendAvatarCommandMessage(msg, finalUser);

};

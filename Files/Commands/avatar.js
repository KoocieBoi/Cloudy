let Embeds = require("../embeds");

module.exports = (msg, args) => {
    let user = {
        mention: msg.mentions.members.first(),
        author: msg.author
    };

    function returnArgsIsMention() {
        if (args[0]) {
            if (user.mention) {
                if (args[0] === user.mention.toString()) return true;
                else return false;
            }
            else return false;
        }
        else return true;
    }

    let finalUser;
    if (returnArgsIsMention()) finalUser = user.mention.user;
    else finalUser = user.author;

    if (args[1] || !returnArgsIsMention()) Embeds.SendCommandWrongUsage(msg, 12);
    else Embeds.SendAvatarCommandMessage(msg, finalUser);

};

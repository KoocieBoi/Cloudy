const embed = require("../embeds");

module.exports = (msg, args) => {
    if (args[0] === undefined) { embed.SendCopyrightCommandMessage(msg); }
    else if (args[0] !== undefined) { embed.SendCommandWrongUsage(msg, 1); }
    else { embed.SendCommandWrongUsage(msg, 1); }
};

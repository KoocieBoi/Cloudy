const EmbedsFile = require("../embeds");

module.exports = (msg, args) => {
    if (args[0] === undefined) EmbedsFile.SendCopyrightCommandMessage(msg);
    else if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 1);
    else EmbedsFile.SendCommandWrongUsage(msg, 1);
};

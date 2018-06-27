const EmbedsFile = require("../embeds");

module.exports = (client, msg, cmd, args) => {
    if (cmd === "copyright") {
        if (args[0] === undefined) EmbedsFile.SendCopyrightCommandMessage(msg);
        else if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 1);
        else EmbedsFile.SendCommandWrongUsage(msg, 1);
    }
};

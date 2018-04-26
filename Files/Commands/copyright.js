const EmbedsFile = require("../embeds");

module.exports = (Message, Arguments) => {
    if (Arguments[0] === undefined) EmbedsFile.SendCopyrightCommandMessage(Message);
    else if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 1);
    else EmbedsFile.SendCommandWrongUsage(Message, 1);
};

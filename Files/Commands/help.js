const CommandsFile = require("../commands.json");
const EmbedsFile = require("../embeds");

module.exports = (msg, args) => {
    if (args[0] === undefined) EmbedsFile.SendHelpCommandNoArgumentsProvidedMessage(msg);
    else if (args[1] !== undefined) { EmbedsFile.SendCommandWrongUsage(msg, 2); return; }
    else {
        let FoundCommand = false;
        CommandsFile.forEach((Command, Index) => {
            if (args[0] === Command.id && args[0] !== CommandsFile[0].id) {
                FoundCommand = CommandsFile[Index];
                EmbedsFile.SendHelpCommandCommandMessage(msg, FoundCommand);
            }
        });
        if (FoundCommand === false) EmbedsFile.SendHelpCommandCommandNotFoundMessage(msg, args[0]);
    }
};
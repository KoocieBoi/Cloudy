const CommandsFile = require("../commands.json");
const EmbedsFile = require("../embeds");

module.exports = (Message, Arguments) => {
    if (Arguments[0] === undefined) EmbedsFile.SendHelpCommandNoArgumentsProvidedMessage(Message);
    else if (Arguments[1] !== undefined) { EmbedsFile.SendCommandWrongUsage(Message, 2); return; }
    else {
        let FoundCommand = false;
        CommandsFile.forEach((Command, Index) => {
            if (Arguments[0] === Command.id && Arguments[0] !== CommandsFile[0].id) {
                FoundCommand = CommandsFile[Index];
                EmbedsFile.SendHelpCommandCommandMessage(Message, FoundCommand);
            }
        });
        if (FoundCommand === false) EmbedsFile.SendHelpCommandCommandNotFoundMessage(Message, Arguments[0]);
    }
};
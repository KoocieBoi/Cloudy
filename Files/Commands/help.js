const CommandsFile = require("../commands.json");
const EmbedsFile = require("../embeds");

module.exports = (Message, Arguments) => {
    if (Arguments[0] === undefined) EmbedsFile.SendHelpCommandNoArgumentsProvidedMessage(Message);
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

// separate cmd `cloudy help <command> usage` + de facut array cu categorii si de filtrat comenzi dupa facut embed dupa facut embed pt fiecare categorie + de facut embed pt comanda usage
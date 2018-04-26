const CommandsFile = require("../commands.json");
const Discord = require("discord.js");
const EmbedColor = "#3498db";

module.exports = async (Message, Arguments) => {
    function MakeHelpStringByCategory (Category, Embed) {
        let CommandsFound = 0; // This will also be used as an index when listing the commands.
        let CommandsListFormat = "";

        CommandsFile.forEach((Command) => {
            if (Command.id === "firstItem") return;
            if (Command.category === Category) {
                CommandsFound++;
                CommandsListFormat += `${CommandsFound}. **${Command.name}** (${Command.id}): ${Command.description}\nUsage: ${Command.usage}\n\n`;
            }
        });

        Embed.addField(`${Category} (${CommandsFound} commands)`, CommandsListFormat);
    }
    if (Arguments[0] === undefined) {
        let NoArgumentsProvidedEmbed = new Discord.RichEmbed()
            .setColor(EmbedColor)
            .setTimestamp()
            .setFooter("cloudy help <command> for help about a command")
            .setTitle("List of commands");
        MakeHelpStringByCategory("Miscellaneous", NoArgumentsProvidedEmbed);
        Message.channel.send({embed: NoArgumentsProvidedEmbed});
    }
};

// separate cmd `cloudy help <command> usage` + de facut array cu categorii si de filtrat comenzi dupa facut embed dupa facut embed pt fiecare categorie + de facut embed pt comanda usage
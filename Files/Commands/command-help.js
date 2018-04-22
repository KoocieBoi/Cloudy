const help = require("../commands.json");
const Discord = require("discord.js");
const embedcolor = "#3498db";

module.exports = async (msg, args) => {
    function makeHelpStringByCategory (category, embed) {
        let commandsFound = 0;
        let string = "";
        help.forEach((element) => {
            if (element.id === "firstItem") { return; }
            if (element.category === category) {
                commandsFound++;
                string += `${commandsFound}. **${element.name}** (${element.id}): ${element.description}\nUsage: ${element.usage}\n\n`;
            }
        });
        embed.addField(`${category} (${commandsFound} commands)`, string);
    }
    if (args[0] === undefined) {
        let noArgsEmbed = new Discord.RichEmbed()
            .setColor(embedcolor)
            .setTimestamp()
            .setFooter("cloudy help <command> for help about a command")
            .setTitle("List of commands");
        makeHelpStringByCategory("Miscellaneous", noArgsEmbed);
        msg.channel.send({embed: noArgsEmbed});
    }
};

// separate cmd `cloudy help <command> usage` + de facut array cu categorii si de filtrat comenzi dupa facut embed dupa facut embed pt fiecare categorie + de facut embed pt comanda usage
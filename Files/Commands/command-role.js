const embed = require("../embeds");
const roles = require("../roles.json");

module.exports = async (msg, args) => {
    let coloursCount = () => {
        let count = 0;
        roles.colours.ID.forEach((id) => {
            if (msg.member.roles.has(id)) count++;
        }); return count;
    };
    if (args[0] === undefined || args[2] !== undefined) {
        await embed.SendCommandWrongUsage(msg, 3);
    }
    else {
        if (args[0] === "list") await embed.SendRoleListCommandMessage(msg);
        else if (args[0] === "add") {
            if (args[1] !== undefined) {
                let colourIndex = roles.colours.nameID.indexOf(args[1].toUpperCase());
                let hasosu = msg.member.roles.has(roles.osu.ID);
                if (colourIndex >= 0) {
                    if (coloursCount() === 0) {
                        let colourName = roles.colours.name[colourIndex];
                        let colourNameID = roles.colours.nameID[colourIndex];
                        let colour = roles.colours.ID[colourIndex];
                        await embed.SendRoleCommandMessage(msg, colourName, colourNameID, colour);
                    } else await embed.SendAlreadyHasColour(msg);
                }
                else if (args[1].toLowerCase() === roles.osu.nameID) {
                    if (hasosu) await embed.SendRoleAlreadyHaveThat(msg);
                    else await embed.SendRoleCommandMessage(msg, roles.osu.name, roles.osu.nameID, roles.osu.ID);
                } else await embed.SendCommandWrongUsage(msg, 3);
            } else await embed.SendCommandWrongUsage(msg, 3);
        }
        else if (args[0] === "remove") {
            if (args[1] !== undefined) {
                let colourIndex = roles.colours.nameID.indexOf(args[1].toUpperCase());
                if (colourIndex >= 0) {
                    if (msg.member.roles.has(roles.colours.ID[colourIndex])) {
                        let colourName = roles.colours.name[colourIndex];
                        let colourNameID = roles.colours.nameID[colourIndex];
                        let colour = roles.colours.ID[colourIndex];
                        embed.SendRoleRemoveMessage(msg, colourName, colourNameID, colour);
                    } else embed.SendRoleRemoveNotHaveMessage(msg);
                }
            } else await embed.SendCommandWrongUsage(msg, 3);
        } else await embed.SendCommandWrongUsage(msg, 3);
    }

};

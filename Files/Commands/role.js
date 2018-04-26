const EmbedsFile = require("../embeds");
const RolesFile = require("../roles.json");

module.exports = async (Message, Arguments) => {
    let GetColoursCount = () => {
        let ColoursCount = 0;
        RolesFile.colours.ID.forEach((ID) => {
            if (Message.member.roles.has(ID)) ColoursCount++;
        }); return ColoursCount;
    };
    if (Arguments[0] === undefined || Arguments[2] !== undefined) await EmbedsFile.SendCommandWrongUsage(Message, 3);
    else {
        if (Arguments[0].toLowerCase() === "list") await EmbedsFile.SendRoleListCommandMessage(Message);
        else if (Arguments[0].toLowerCase() === "add") {
            if (Arguments[1] !== undefined) {
                let ColourIndexOfArgument = RolesFile.colours.nameID.indexOf(Arguments[1].toUpperCase());
                let hasosu = Message.member.roles.has(RolesFile.osu.ID);
                if (ColourIndexOfArgument >= 0) {
                    if (GetColoursCount() === 0) {
                        let ColourName = RolesFile.colours.name[ColourIndexOfArgument];
                        let ColourNameID = RolesFile.colours.nameID[ColourIndexOfArgument];
                        let ColourID = RolesFile.colours.ID[ColourIndexOfArgument];
                        await EmbedsFile.SendRoleCommandMessage(Message, ColourName, ColourNameID, ColourID);
                    }
                    else await EmbedsFile.SendAlreadyHasColour(Message);
                }
                else if (Arguments[1].toLowerCase() === RolesFile.osu.nameID) {
                    if (hasosu) await EmbedsFile.SendRoleAlreadyHaveThat(Message);
                    else await EmbedsFile.SendRoleCommandMessage(Message, RolesFile.osu.name, RolesFile.osu.nameID, RolesFile.osu.ID);
                }
                else await EmbedsFile.SendCommandWrongUsage(Message, 3);
            }
            else await EmbedsFile.SendCommandWrongUsage(Message, 3);
        }
        else if (Arguments[0] === "remove") {
            if (Arguments[1] !== undefined) {
                let ColourIndexOfArgument = RolesFile.colours.nameID.indexOf(Arguments[1].toUpperCase());
                if (ColourIndexOfArgument >= 0) {
                    if (Message.member.roles.has(RolesFile.colours.ID[ColourIndexOfArgument])) {
                        let ColourName = RolesFile.colours.name[ColourIndexOfArgument];
                        let ColourNameID = RolesFile.colours.nameID[ColourIndexOfArgument];
                        let ColourID = RolesFile.colours.ID[ColourIndexOfArgument];
                        EmbedsFile.SendRoleRemoveMessage(Message, ColourName, ColourNameID, ColourID);
                    }
                    else EmbedsFile.SendRoleRemoveNotHaveMessage(Message);
                }
            }
            else await EmbedsFile.SendCommandWrongUsage(Message, 3);
        }
        else await EmbedsFile.SendCommandWrongUsage(Message, 3);
    }

};

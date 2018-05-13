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
                function checkRole(toReturn) {
                    let IndexOfRole = RolesFile.roles.nameID.indexOf(Arguments[1]);
                    let HasRole = Message.member.roles.has(RolesFile.roles.ID[IndexOfRole]);
                    if (toReturn === "Index") return IndexOfRole;
                    if (toReturn === "HasRole") return HasRole;
                }
                function checkColour(toReturn) {
                    let IndexOfRole = RolesFile.colours.nameID.indexOf(Arguments[1].toUpperCase());
                    let HasRole = Message.member.roles.has(RolesFile.colours.ID[IndexOfRole]);
                    if (toReturn === "Index") return IndexOfRole;
                    if (toReturn === "HasRole") return HasRole;
                }
                let hasosu = Message.member.roles.has(RolesFile.osu.ID);
                if (checkColour("Index") >= 0) {
                    if (GetColoursCount() === 0) await EmbedsFile.SendRoleCommandMessage(Message, RolesFile.colours, checkColour("Index"));
                    else await EmbedsFile.SendAlreadyHasColour(Message);
                }
                else if (checkRole("Index") >= 0/* Arguments[1].toLowerCase() === RolesFile.osu.nameID */) {
                    if (checkRole('HasRole')) await EmbedsFile.SendRoleAlreadyHaveThat(Message);
                    else await EmbedsFile.SendRoleCommandMessage(Message, RolesFile.roles, checkRole("Index"));
                }
                else await EmbedsFile.SendCommandWrongUsage(Message, 3);
            }
            else await EmbedsFile.SendCommandWrongUsage(Message, 3);
        }
        else if (Arguments[0] === "remove") {
            if (Arguments[1] !== undefined) {
                function checkRole(toReturn) {
                    let IndexOfRole = RolesFile.roles.nameID.indexOf(Arguments[1]);
                    let HasRole = Message.member.roles.has(RolesFile.roles.ID[IndexOfRole]);
                    if (toReturn === "Index") return IndexOfRole;
                    if (toReturn === "HasRole") return HasRole;
                }
                function checkColour(toReturn) {
                    let IndexOfRole = RolesFile.colours.nameID.indexOf(Arguments[1]);
                    let HasRole = Message.member.roles.has(RolesFile.colours.ID[IndexOfRole]);
                    if (toReturn === "Index") return IndexOfRole;
                    if (toReturn === "HasRole") return HasRole;
                }
                let ColourIndexOfArgument = RolesFile.colours.nameID.indexOf(Arguments[1].toUpperCase());
                if (checkColour("Index") >= 0) {
                    if (checkColour("HasRole")) {
                        await EmbedsFile.SendRoleRemoveMessage(Message, RolesFile.colours, checkColour("Index"));
                    }
                    else await EmbedsFile.SendRoleRemoveNotHaveMessage(Message);
                }
                else {
                    if (checkRole("Index") >= 0) {
                        if (checkRole("HasRole")) {
                            await EmbedsFile.SendRoleRemoveMessage(Message, RolesFile.roles, checkRole("Index"));
                        }
                        else await EmbedsFile.SendRoleRemoveNotHaveMessage(Message);
                    }
                    else await EmbedsFile.SendCommandWrongUsage(Message, 3);
                }
            }
            else await EmbedsFile.SendCommandWrongUsage(Message, 3);
        }
        else await EmbedsFile.SendCommandWrongUsage(Message, 3);
    }

};

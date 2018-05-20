const EmbedsFile = require("../embeds");
const RolesFile = require("../roles.json");

module.exports = async (msg, args) => {
    let GetColoursCount = () => {
        let ColoursCount = 0;
        RolesFile.colours.ID.forEach((ID) => {
            if (msg.member.roles.has(ID)) ColoursCount++;
        }); return ColoursCount;
    };
    if (args[0] === undefined || args[2] !== undefined) await EmbedsFile.SendCommandWrongUsage(msg, 3);
    else {
        if (args[1] === undefined) {
            if (args[0].toLowerCase() === "list") await EmbedsFile.SendRoleListCommandMessage(msg);
            else await EmbedsFile.SendCommandWrongUsage(msg, 3);
        }
        else {

            function check(Role_OR_Colour, toReturn) {
                if (Role_OR_Colour === 'Colour') {

                    let IndexOfRole = RolesFile.colours.nameID.indexOf(args[1].toUpperCase());
                    let HasRole = msg.member.roles.has(RolesFile.colours.ID[IndexOfRole]);

                    if (toReturn === 'Index') return IndexOfRole;
                    else if (toReturn === 'HasRole') return HasRole;
                    
                }
                else if (Role_OR_Colour === 'Role') {

                    let IndexOfRole = RolesFile.roles.nameID.indexOf(args[1].toLowerCase());
                    let HasRole = msg.member.roles.has(RolesFile.roles.ID[IndexOfRole]);

                    if (toReturn === 'Index') return IndexOfRole;
                    else if (toReturn === 'HasRole') return HasRole;

                }
            }

            if (args[0].toLowerCase() === "add") {
                    if (check("Colour", "Index") >= 0) {
                        if (GetColoursCount() === 0) await EmbedsFile.SendRoleCommandMessage(msg, RolesFile.colours, check("Colour", "Index"));
                        else await EmbedsFile.SendAlreadyHasColour(msg);
                    }
                    else if (check("Role", "Index") >= 0) {
                        if (check("Role", "HasRole")) await EmbedsFile.SendRoleAlreadyHaveThat(msg);
                        else await EmbedsFile.SendRoleCommandMessage(msg, RolesFile.roles, check("Role", "Index"));
                    }
                    else await EmbedsFile.SendCommandWrongUsage(msg, 3);
            }
            else if (args[0] === "remove") {
                    if (check("Colour", "Index") >= 0) {
                        if (check("Colour", "HasRole")) await EmbedsFile.SendRoleRemoveMessage(msg, RolesFile.colours, check("Colour", "Index"));
                        else await EmbedsFile.SendRoleRemoveNotHaveMessage(msg);
                    }
                    else if (check("Role", "Index") >= 0) {
                        if (check("Role", "HasRole")) await EmbedsFile.SendRoleRemoveMessage(msg, RolesFile.roles, check("Role", "Index"));
                        else await EmbedsFile.SendRoleRemoveNotHaveMessage(msg);
                    }
                    else await EmbedsFile.SendCommandWrongUsage(msg, 3);
            }
            else await EmbedsFile.SendCommandWrongUsage(msg, 3);
        }
    }
};

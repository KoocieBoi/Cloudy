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
        if (Arguments[1] === undefined) {
            if (Arguments[0].toLowerCase() === "list") await EmbedsFile.SendRoleListCommandMessage(Message);
            else await EmbedsFile.SendCommandWrongUsage(Message, 3);
        }
        else {

            function check(Role_OR_Colour, toReturn) {
                if (Role_OR_Colour === 'Colour') {

                    let IndexOfRole = RolesFile.colours.nameID.indexOf(Arguments[1].toUpperCase());
                    let HasRole = Message.member.roles.has(RolesFile.colours.ID[IndexOfRole]);

                    if (toReturn === 'Index') return IndexOfRole;
                    else if (toReturn === 'HasRole') return HasRole;
                    
                }
                else if (Role_OR_Colour === 'Role') {

                    let IndexOfRole = RolesFile.roles.nameID.indexOf(Arguments[1].toUpperCase());
                    let HasRole = Message.member.roles.has(RolesFile.colours.ID[IndexOfRole]);

                    if (toReturn === 'Index') return IndexOfRole;
                    else if (toReturn === 'HasRole') return HasRole;

                }
            }

            if (Arguments[0].toLowerCase() === "add") {
                    if (check("Colour", "Index" >= 0)) {
                        if (GetColoursCount() === 0) await EmbedsFile.SendRoleCommandMessage(Message, RolesFile.colours, check("Colour", "Index"));
                        else await EmbedsFile.SendAlreadyHasColour(Message);
                    }
                    else if (check("Role", "Index") >= 0) {
                        if (check("Role", "HasRole")) await EmbedsFile.SendRoleAlreadyHaveThat(Message);
                        else await EmbedsFile.SendRoleCommandMessage(Message, RolesFile.roles, check("Role", "Index"));
                    }
                    else await EmbedsFile.SendCommandWrongUsage(Message, 3);
            }
            else if (Arguments[0] === "remove") {
                    if (check("Colour", "Index") >= 0) {
                        if (check("Colour", "HasRole")) await EmbedsFile.SendRoleRemoveMessage(Message, RolesFile.colours, check("Colour", "Index"));
                        else await EmbedsFile.SendRoleRemoveNotHaveMessage(Message);
                    }
                    else if (check("Role", "Index") >= 0) {
                        if (check("Role", "HasRole")) await EmbedsFile.SendRoleRemoveMessage(Message, RolesFile.roles, check("Role", "Index"));
                        else await EmbedsFile.SendRoleRemoveNotHaveMessage(Message);
                    }
                    else await EmbedsFile.SendCommandWrongUsage(Message, 3);
            }
            else await EmbedsFile.SendCommandWrongUsage(Message, 3);
        }
    }
};

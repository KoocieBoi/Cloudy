const embed = require("../embeds");
const colours = require("../colours.json");

module.exports = async (msg, args) => {
    function checkArgs(arg) {
        return colours.nameID[arg].indexOf(args[0].toUpperCase()) >= 0;
    }
    function removeRoles(arr) {
        arr.forEach(function (elem) {
            if (msg.member.roles.has(elem)) {
                msg.member.removeRole(elem);
            }
        });
    }
    function getIndexArgs(arg) {
        return colours.nameID[arg].indexOf(args[0].toUpperCase());
    }
    function removeAllRoles() {
        removeRoles(colours.ID[0]);
        removeRoles(colours.ID[1]);
        removeRoles(colours.ID[2]);
    }
    function addRole(index) {
        msg.member.addRole(colours.ID[index][getIndexArgs(index)]);
        embed.SendColourCommandMessage(msg, index, getIndexArgs(index));
    }
    if (args[0] === undefined || args[1] !== undefined) {
        await embed.SendCommandWrongUsage(msg, 2);
    }
    else {
        // ROYPGB

        if (args[0] === "list") { embed.SendRoleListCommandMessage(msg); }
        else if (checkArgs(0) || checkArgs(1) || checkArgs(2)) {
            if (checkArgs(0)) {
                await removeAllRoles();
                await addRole(0);
            }
        }

    }

};

let Configuration = require("../configuration");

module.exports = (Client, Reaction, User) => {
    if (User.bot) { return; }
    let Member = Client.guilds.get(Configuration.guild.ID).member(User.id);
    if (Reaction.message.id === Configuration.guild.AcceptRulesMessageID) {
        if (!Member.roles.has(Configuration.guild.MemberRoleID)) {
            Member.addRole(Configuration.guild.MemberRoleID);
        }
        else console.log(`Some user somehow managed to react to the accept message w/o havin' access to it. (ID: ${User.id})`);
    }
    else console.log("Reaction not the accept message.");
};
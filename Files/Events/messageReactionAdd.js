module.exports = (Client, Reaction, User) => {
    if (User.bot) { return; }
    let Member = Client.guilds.get("424976122527088640").member(User.id);
    if (Reaction.message.id === "427868918745661450") {
        if (!Member.roles.has("425023342530134018")) {
            Member.addRole("425023342530134018");
        }
        else console.log(`Some user somehow managed to react to the accept message w/o havin' access to it. (ID: ${User.id})`);
    }
    else console.log("Reaction not the accept message.");
};
exports.bot = {
    token: process.env.TOKEN,
    id: "427799231399591946",
    letterPrefix: "cl!",
    mentionPrefix: function () { return `<@${this.id}> `; } 
};

exports.guild = {
    logJLChannelID: "427823157303574528",
};

exports.embeds = {
    color: 0x3f51b5
};

exports.commands = {

};

/* --- Notes --- */

/*
    The JL in exports.guild.logJLChannelID = Join / Leave
*/

/* --- Notes --- */
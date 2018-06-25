exports.bot = {
    token: process.env.TOKEN,
    id: "427799231399591946",
    letterPrefix: "cloudy ",
    mentionPrefix: function () { return `<@${this.id}> `; } 
};

exports.guild = {
    ID: "424976122527088640",
    AcceptRulesMessageID: "427868918745661450",
    MemberRoleID: "425023342530134018",
    logJLChannelID: "427823157303574528",
    publicLogChannelID: "460904443626651689",
    privateLogChannelID: "439735218832670721",
    JoinGIFLink: "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
    LeaveGIFLink: "https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif"
};

exports.embeds = {
    color: 0x3f51b5,
    JoinColor: "#4CAF50",
    LeaveColor: "#F44336",
};

exports.commands = {
    bird: {
        APIUrl: "http://shibe.online/api/birds?count=1"
    },
    cat: {
        APIUrl: "http://shibe.online/api/cats?count=1"
    },
    catfact: {
        APIUrl: "https://catfact.ninja/fact"
    },
    dog: {
        APIUrl: "https://dog.ceo/api/breeds/image/random"
    },
    fox: {
        APIUrl: "https://randomfox.ca/floof/"
    },
    shibe: {
        APIUrl: "http://shibe.online/api/shibes?count=1"
    }
};

/* --- Notes --- */

/*
    The JL in exports.guild.logJLChannelID = Join / Leave
*/

/* --- Notes --- */
exports = {
    bot: {
        token: process.env.TOKEN,
        id: "",
        prefix: "",
        mentionprefix: `${this.id} `
    },
    guild: {
        
    },
    embeds: { color: 0x3f51b5 },
    commands: {

    }
};

// testing
let test = {
    bot: {
        token: process.env.TOKEN,
        id: "ok",
        prefix: "",
        mentionprefix: function () { return `${this.id} `; }
    },
    guild: {
    
    },
    embeds: { color: 0x3f51b5 },
    commands: {

    }
};
console.log(test.bot.mentionprefix());
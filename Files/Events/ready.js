module.exports = (client) => {
    console.log("I am ready!");
    client.user.setPresence({
        status: "online",
        game: { name: "your commands", type: "LISTENING" }
    });
};
module.exports = (Client) => {
    console.log("I am ready!");
    Client.user.setPresence({
        status: "online",
        game: { name: "your commands", type: "LISTENING" }
    });
};
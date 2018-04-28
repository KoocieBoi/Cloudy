const EmbedsFile = require("../embeds");
const axios = require("axios");
// https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-256.png

module.exports = (Message, Arguments, Client) => {
    let LoggingChannel = Client.channels.get("439735218832670721");
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 5);
    else {
        axios.get("http://aws.random.cat/meow")
            .then((Cat) => {
                let FormatImageURL = /\\+/g;
                let CatImage = Cat.data.file.replace(FormatImageURL, "");
                EmbedsFile.SendCatCommandMessage(Message, CatImage);
            })
            .catch((EncounteredError) => {
                LoggingChannel.fetchWebhooks()
                    .then((Webhook) => {
                        let Hook = Webhook.find("name", "Logging");
                        if (!Hook) return console.log("error");
                        else {
                            Hook.send("", {
                                "username": "Error",
                                "avatarURL": "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-256.png",
                                "embeds": [{
                                    "color": parseInt("0x3498db"),
                                    "description": "An error has occured while executing the `cl_cat` command!",
                                    "fields": [
                                        {
                                            "name": "Informations",
                                            "value": `Username: ${Message.author.username}#${Message.author.discriminator}\nID: ${Message.author.id}`
                                        }
                                    ],
                                    "timestamp": new Date()
                                }]
                            });
                        }
                    });
            });
    }
}
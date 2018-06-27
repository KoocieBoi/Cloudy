const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (client, msg, cmd, args) => {
    if (cmd === "bird") {
        if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 7);
        else {
            axios.get(Configuration.commands.bird.APIUrl)
                .then((Bird) => {
                    let Image = Bird.data[0];
                    EmbedsFile.SendBirdCommandMessage(msg, Image);
                })
                .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(msg, client, EncounteredError, "cl_bird"));
        }
    }
};
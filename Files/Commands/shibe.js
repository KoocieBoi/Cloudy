const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (client, msg, cmd, args) => {
    if (cmd === "shibe") {
        if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 9);
        else {
            axios.get(Configuration.commands.shibe.APIUrl)
                .then((Shibe) => {
                    let Image = Shibe.data[0];
                    EmbedsFile.SendShibeCommandMessage(msg, Image);
                })
                .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(msg, client, EncounteredError, "cl_shibe"));
        }
    }
};
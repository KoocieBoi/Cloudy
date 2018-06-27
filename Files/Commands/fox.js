const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (client, msg, cmd, args) => {
    if (cmd === "fox") {
        if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 8);
        else {
            axios.get(Configuration.commands.fox.APIUrl)
                .then((Fox) => {
                    let FormatImageURL = /\\+/g;
                    let FoxImage = Fox.data.image.replace(FormatImageURL, "");
                    EmbedsFile.SendFoxCommandMessage(msg, FoxImage);
                })
                .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(msg, client, EncounteredError, "cl_fox"));
        }
    }
};
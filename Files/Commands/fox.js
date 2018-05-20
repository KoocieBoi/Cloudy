const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 8);
    else {
        axios.get(Configuration.commands.fox.APIUrl)
            .then((Fox) => {
                let FormatImageURL = /\\+/g;
                let FoxImage = Fox.data.image.replace(FormatImageURL, "");
                EmbedsFile.SendFoxCommandMessage(Message, FoxImage);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_fox"));
    }
};
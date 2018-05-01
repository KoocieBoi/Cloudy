const EmbedsFile = require("../embeds");
const axios = require("axios");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 8);
    else {
        axios.get("https://randomfox.ca/floof/")
            .then((Fox) => {
                let FormatImageURL = /\\+/g;
                let FoxImage = Fox.data.image.replace(FormatImageURL, "");
                EmbedsFile.SendBirdCommandMessage(Message, FoxImage);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_fox"));
    }
};
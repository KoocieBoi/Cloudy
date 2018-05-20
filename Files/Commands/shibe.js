const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 9);
    else {
        axios.get(Configuration.commands.shibe.APIUrl)
            .then((Shibe) => {
                let Image = Shibe.data[0];
                EmbedsFile.SendShibeCommandMessage(Message, Image);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_shibe"));
    }
};
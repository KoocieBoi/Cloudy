const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 5);
    else {
        axios.get(Configuration.commands.cat.APIUrl)
            .then((Cat) => {
                let Image = Cat.data[0];
                EmbedsFile.SendCatCommandMessage(Message, Image);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_cat"));
    }
};
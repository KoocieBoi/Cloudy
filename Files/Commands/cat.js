const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (msg, args, client) => {
    if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 5);
    else {
        axios.get(Configuration.commands.cat.APIUrl)
            .then((Cat) => {
                let Image = Cat.data[0];
                EmbedsFile.SendCatCommandMessage(msg, Image);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(msg, client, EncounteredError, "cl_cat"));
    }
};
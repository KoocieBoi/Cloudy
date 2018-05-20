const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");


module.exports = (msg, args, client) => {
    if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 6);
    else {
        axios.get(Configuration.commands.catfact.APIUrl)
            .then((Fact) => EmbedsFile.SendCatFactCommandMessage(msg, Fact.data.fact))
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(msg, client, EncounteredError, "cl_catfact"));
    }
};
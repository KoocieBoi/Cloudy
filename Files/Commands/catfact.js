const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");


module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 6);
    else {
        axios.get(Configuration.commands.catfact.APIUrl)
            .then((Fact) => EmbedsFile.SendCatFactCommandMessage(Message, Fact.data.fact))
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_catfact"));
    }
};
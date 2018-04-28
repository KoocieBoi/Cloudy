const EmbedsFile = require("../embeds");
const axios = require("axios");
// https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-256.png

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 6);
    else {
        axios.get("https://catfact.ninja/fact")
            .then((Fact) => EmbedsFile.SendCatFactCommandMessage(Message, Fact.data.fact))
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_catfact"));
    }
};
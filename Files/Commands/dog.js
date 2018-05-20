const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (msg, args, client) => {
    if (args[0] !== undefined) EmbedsFile.SendCommandWrongUsage(msg, 4);
    else {
        axios.get(Configuration.commands.dog.APIUrl)
            .then((Dog) => {
                EmbedsFile.SendDogCommandMessage(msg, Dog);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(msg, client, EncounteredError, "cl_dog"));
    }
};

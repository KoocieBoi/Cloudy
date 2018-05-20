const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 4);
    else {
        axios.get(Configuration.commands.dog.APIUrl)
            .then((Dog) => {
                EmbedsFile.SendDogCommandMessage(Message, Dog);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_dog"));
    }
};

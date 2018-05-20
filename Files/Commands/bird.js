const EmbedsFile = require("../embeds");
const axios = require("axios");
const Configuration = require("../configuration");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 7);
    else {
        axios.get(Configuration.commands.bird.APIUrl)
            .then((Bird) => {
                let Image = Bird.data[0];
                EmbedsFile.SendBirdCommandMessage(Message, Image);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_bird"));
    }
};
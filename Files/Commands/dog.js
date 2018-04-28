const EmbedsFile = require("../embeds");
const axios = require("axios");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 4);
    else {
        axios.get("https://dog.ceo/api/breeds/image/random")
            .then((Dog) => {
                EmbedsFile.SendDogCommandMessage(Message, Dog);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_dog"));
    }
};

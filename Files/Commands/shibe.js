const EmbedsFile = require("../embeds");
const axios = require("axios");

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 9);
    else {
        axios.get("http://shibe.online/api/shibes?count=1")
            .then((Shibe) => {
                let Image = Shibe.data[0];
                EmbedsFile.SendShibeCommandMessage(Message, Image);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_shibe"));
    }
};
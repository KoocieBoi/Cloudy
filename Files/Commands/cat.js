const EmbedsFile = require("../embeds");
const axios = require("axios");
// https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-256.png

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 5);
    else {
        axios.get("http://shibe.online/api/cats?count=1")
            .then((Cat) => {
                let Image = Cat.data[0];
                EmbedsFile.SendCatCommandMessage(Message, Image);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_cat"));
    }
};
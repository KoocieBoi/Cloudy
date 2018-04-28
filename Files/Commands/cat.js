const EmbedsFile = require("../embeds");
const axios = require("axios");
// https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-256.png

module.exports = (Message, Arguments, Client) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 5);
    else {
        axios.get("http://aws.random.cat/meow")
            .then((Cat) => {
                let FormatImageURL = /\\+/g;
                let CatImage = Cat.data.file.replace(FormatImageURL, "");
                EmbedsFile.SendCatCommandMessage(Message, CatImage);
            })
            .catch((EncounteredError) => EmbedsFile.SendErrorWebhook(Message, Client, EncounteredError, "cl_cat"));
    }
};
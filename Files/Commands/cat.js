const EmbedsFile = require("../embeds");
const axios = require("axios");

module.exports = (Message, Arguments) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 5);
    else {
        axios.get("http://aws.random.cat/meow")
            .then((Cat) => {
                let FormatImageURL = /\\+/g;
                let CatImage = Cat.data.file.replace(FormatImageURL, "");
                EmbedsFile.SendCatCommandMessage(Message, CatImage);
            });
    }
}
const EmbedsFile = require("../embeds");
const XMLParse = require("xml-parse-from-string");
const axios = require("axios");

module.exports = (Message, Arguments) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 4);
    else {
        axios.get("http://thecatapi.com/api/images/get?format=xml")
            .then((Cat) => {
                let ParsedCat = XMLParse(Cat.data);
                EmbedsFile.SendCatCommandMessage(Message, ParsedCat);
            });
    }
}
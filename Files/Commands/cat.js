const EmbedsFile = require("../embeds");
const XMLParse = require("xml2js").parseString;
const axios = require("axios");

module.exports = (Message, Arguments) => {
    if (Arguments[0] !== undefined) EmbedsFile.SendCommandWrongUsage(Message, 4);
    else {
        axios.get("http://thecatapi.com/api/images/get?format=xml")
            .then((Cat) => {
                XMLParse(Cat.data, (Error, Result) => {
                    EmbedsFile.SendCatCommandMessage(Message, Result);
                })
            });
    }
}
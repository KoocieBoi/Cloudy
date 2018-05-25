let Embeds = require("../embeds");
let weather = require("weather-js");
module.exports = (msg, args, client) => {
    if (args[0] === undefined) Embeds.SendCommandWrongUsage(msg, 10);
    else {
        let location = args.join(" ");

        weather.find({
            search: location,
            degreeType: "C"
        }, (err, result) => {
            if (err) Embeds.SendErrorWebhook(msg, client, err, "cl_weather");
            else {
                console.log(result);
                let data = result; /* JSON.stringify(result); */
                Embeds.SendWeatherCommandMessage(msg, data);
            } 
        });
    }
};
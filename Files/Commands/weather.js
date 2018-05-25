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
                let data = JSON.stringify(result, null, 2);
                
                Embeds.SendWeatherCommandMessage(msg, data);
            } 
        });
    }
};
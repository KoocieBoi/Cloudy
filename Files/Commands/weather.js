let Embeds = require("../embeds");
let weather = require("weather-js");
module.exports = (client, msg, cmd, args) => {
    if (cmd === "weather") {
        if (args[0] === undefined) Embeds.SendCommandWrongUsage(msg, 10);
        else {
            let location = args.join(" ");
        
            weather.find({
                search: location,
                degreeType: "C"
            }, (err, result) => {
                if (err) Embeds.SendErrorWebhook(msg, client, err, "cl_weather");
                if (result.length === 0) {
                    Embeds.SendWeatherCommandLocationNotFoundMessage(msg);
                    return;
                }
                else Embeds.SendWeatherCommandMessage(msg, result);
            });
        }
    }
};
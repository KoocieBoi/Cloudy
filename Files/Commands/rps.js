const Embeds = require("../embeds");

module.exports = (client, msg, cmd, args) => {
    
    function returnOptionMessage(optionVar, typeOfUser) {
        let userMessage = "";
        let optionMessage = "";
        if (typeOfUser === "user") userMessage = "**You**";
        else if (typeOfUser === "bot") userMessage = "**I**";
    
        if (optionVar === "r") optionMessage = "chose **Rock** :gem:";
        else if (optionVar === "p") optionMessage = "chose **Paper** :scroll:";
        else if (optionVar === "s") optionMessage = "chose **Scissors** :scissors:";
    
        let finalMessage = `[•](https://) ${userMessage} ${optionMessage}.`;
    
        return finalMessage;
    }

    if (cmd === "rps") {
        let options = [
            "rock", "r",
            "paper", "p",
            "scissors", "s"
        ];
        if (args[0] === undefined || args[1] !== undefined || options.indexOf(args[0]) === -1) Embeds.SendCommandWrongUsage(msg, 11);
        else {
            let optionChosen = "";
            if (options.indexOf(args[0]) <= 1) optionChosen = "r";
            else if (options.indexOf(args[0]) <= 3 && options.indexOf(args[0]) >= 2) optionChosen = "p";
            else if (options.indexOf(args[0]) <= 5 && options.indexOf(args[0]) >= 4) optionChosen = "s";

            let randomOption = Math.ceil(Math.random() * 3);
            let botOption = "";
            if (randomOption === 1) botOption = "r";
            else if (randomOption === 2) botOption = "p";
            else if (randomOption === 3) botOption = "s";
            else botOption = "r";

            let winner = "";
            if (optionChosen === botOption) winner = "both";
            else if (optionChosen === "r" && botOption === "s") winner = "user";
            else if (optionChosen === "p" && botOption === "r") winner = "user";
            else if (optionChosen === "s" && botOption === "p") winner = "user";
            else if (optionChosen === "r" && botOption === "p") winner = "bot";
            else if (optionChosen === "p" && botOption === "s") winner = "bot";
            else if (optionChosen === "s" && botOption === "r") winner = "bot";

            Embeds.sendRPSMessage(msg, returnOptionMessage(optionChosen, "user"), returnOptionMessage(botOption, "bot"), winner);
        }
    }
};

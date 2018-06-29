const Discord = require("discord.js");
const Configuration = require("./configuration");
const CommandsFile = require("./commands.json");
const RolesFile = require("./roles.json");
const EmbedColor = Configuration.embeds.color;

exports.SendLogChannelWelcomeMessage = async (member) => {
	if (member.guild.id === Configuration.guild.ID) {
		let log = member.guild.channels.get(Configuration.guild.logJLChannelID);
		const LogChannelWelcomeMessage = new Discord.RichEmbed()
			.setColor(Configuration.embeds.JoinColor)
			.setAuthor("Someone had joined us! (^ _ ^)/", member.user.avatarURL)
			.setDescription(`Say hi to **[${member.user.username}](https://)**.\nI hope that you'll enjoy being part of the server, ${member}.`)
			.setImage(Configuration.guild.JoinGIFLink)
			.setFooter(`User joined (${member.user.id}#${member.user.discriminator})`)
			.setTimestamp();
		await log.send({ embed: LogChannelWelcomeMessage });
	}
};

exports.SendLogChannelLeaveMessage = async (member) => {
	if (member.guild.id === Configuration.guild.ID) {
		let log = member.guild.channels.get(Configuration.guild.logJLChannelID);
		const LogChannelLeaveMessage = new Discord.RichEmbed()
			.setColor(Configuration.embeds.LeaveColor)
			.setAuthor("Someone had left us! ( >д<)", member.user.avatarURL)
			.setDescription(`Sadly, **[${member.user.username}](https://)** left us.\nI hope he'll be back soon, or not.`)
			.setImage(Configuration.guild.LeaveGIFLink)
			.setFooter(`User left (${member.user.id}#${member.user.discriminator})`)
			.setTimestamp();
		await log.send({ embed: LogChannelLeaveMessage });
	}
};

exports.SendCopyrightCommandMessage = async (msg) => {
	let CopyrightMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setAuthor("Icon")
		.setDescription("Bot's icon was made by [**Nick Roach**](https://www.elegantthemes.com/)\n[Icon](https://www.iconfinder.com/icons/1055089)\n[License (GPLv3)](https://www.gnu.org/copyleft/gpl.html)")
		.setTimestamp();
	msg.channel.send({ embed: CopyrightMessage });
};

exports.SendCommandWrongUsage = async (msg, CommandNumber) => {
	let CommandWrongUsage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setAuthor("Bad command usage!")
		.setDescription(`Usage: \n${CommandsFile[CommandNumber].usage}\n\nExample: \n${CommandsFile[CommandNumber].example}`)
		.setFooter(`encountered by ${msg.author.username} on ${CommandsFile[CommandNumber].id}`)
		.setTimestamp();
	msg.channel.send({ embed: CommandWrongUsage });
};

exports.SendColourCommandListMessage = async (msg) => {
    
	function checkLevel(level) {
		switch (level) {
		case 1: return msg.member.roles.has(RolesFile.colours.levels[0]);
		case 10: return msg.member.roles.has(RolesFile.colours.levels[1]);
		default: break;
		}
	}
	function makeColourString(numArray) {
		let finalString = "";
		for (let i = 0 ; i <= RolesFile.colours.name[numArray].length - 1 ; i++) {
			finalString += `${RolesFile.colours.name[numArray][i]}  (**${RolesFile.colours.nameID[numArray][i]}**)\n`;
		}
		return finalString;
	}
	let ColoursCommandListMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setAuthor("Self-Assignable Roles")
		.setTimestamp();

	ColoursCommandListMessage.addField("Roles for Everyone", makeColourString(0));
	if (checkLevel(1)) {
		ColoursCommandListMessage.addField("Roles for Level 1", makeColourString(1));
	}
	else {
		ColoursCommandListMessage.addField("Roles for Level 1", "not unlocked yet!");
	}
	if (checkLevel(10)) {
		ColoursCommandListMessage.addField("Roles for Level 10", makeColourString(2));
	}
	else {
		ColoursCommandListMessage.addField("Roles for Level 10", "not unlocked yet!");
	}

	msg.channel.send({ embed: ColoursCommandListMessage });
};

exports.SendRoleCommandMessage = async (msg, role, index) => {
	let RoleInfo = {
		name: role.name[index],
		nameID: role.nameID[index],
		ID: role.ID[index],
	};
	let RoleCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setDescription(`You've received the \`${RoleInfo.name} (${RoleInfo.nameID})\` role.`)
		.setFooter("enjoy your role!")
		.setTimestamp();
	await msg.member.addRole(RoleInfo.ID);
	await msg.channel.send({ embed: RoleCommandMessage });
};

exports.SendAlreadyHasColour = async (msg) => {
	let AlreadyHasColour = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setDescription("You already have a colour! You need to remove your colour with the `cloudy role remove <colour>` command before getting a new colour.")
		.setTimestamp();
	await msg.channel.send({ embed: AlreadyHasColour });
};

exports.SendRoleListCommandMessage = async (msg) => {
    
	function checkLevel(level) {
		switch (level) {
		case 1: return msg.member.roles.has(RolesFile.colours.levels[0]);
		case 10: return msg.member.roles.has(RolesFile.colours.levels[1]);
		default: break;
		}
	}

	function makeColourString(minIndex, maxIndex) {
		let finalString = "";
		for (let i = minIndex; i <= maxIndex; i++) {
			finalString += `${RolesFile.colours.name[i]} • \`ID: ${RolesFile.colours.nameID[i]}\`\n`;
		}
		return finalString;
	}

	let RoleListCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setAuthor("Self-Assignable Roles")
		.setDescription("**Command:** `cloudy role (add | remove) ID`")
		.setTimestamp();

	RoleListCommandMessage.addField("Colours for everyone", makeColourString(0, 5), true);

	switch (checkLevel(1)) {
	case true:
		RoleListCommandMessage.addField("Colours for level 1", makeColourString(6, 11), true);
		break;
	default:
		RoleListCommandMessage.addField("Colours for level 1", "not unlocked yet!", true);
		break;
	}

	switch (checkLevel(10)) {
	case true:
		RoleListCommandMessage.addField("Colours for level 10", makeColourString(12, 16), true);
		break;
	default:
		RoleListCommandMessage.addField("Colours for level 10", "not unlocked yet!", true);
		break;
	}
    
	let RolesList = "";
	for (let i = 0; i < RolesFile.roles.name.length; i++) {
		RolesList += `${RolesFile.roles.name[i]} • \`ID: ${RolesFile.roles.nameID[i]}\`\n`;
	}
	RoleListCommandMessage.addField("Roles", RolesList);

	// RoleListCommandMessage.addField("Roles", "osu! • `ID: o!`");

	msg.channel.send({ embed: RoleListCommandMessage });

};

exports.SendRoleRemoveMessage = async (msg, role, index) => {
	let RoleInfo = {
		name: role.name[index],
		nameID: role.nameID[index],
		ID: role.ID[index],
	};
	let RoleRemoveMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setDescription(`You've removed the \`${RoleInfo.name} (${RoleInfo.nameID})\` role from yourself.`)
		.setTimestamp();
	await msg.channel.send({ embed: RoleRemoveMessage });
	await msg.member.removeRole(RoleInfo.ID);
};

exports.SendRoleRemoveNotHaveMessage = async (msg) => {
	let RoleRemoveNotHaveMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setDescription("You do not have that role!")
		.setTimestamp();
	await msg.channel.send({ embed: RoleRemoveNotHaveMessage });
};

exports.SendRoleAlreadyHaveThat = async (msg) => {
	let RoleAlreadyHaveThat = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setDescription("You already have that role!")
		.setTimestamp();
	await msg.channel.send({ embed: RoleAlreadyHaveThat });
};

exports.SendHelpCommandNoArgumentsProvidedMessage = async (msg) => {
	function MakeHelpStringByCategory (Category, Embed) {
		let CommandsFound = 0; // This will also be used as an index when listing the commands.
		let CommandsListFormat = "";
		CommandsFile.forEach((Command) => {
			if (Command.id === "firstItem") return;
			if (Command.category === Category) {
				CommandsFound++;
				CommandsListFormat += `${CommandsFound}. **${Command.name}** (${Command.id}): ${Command.description}\n`;
			}
		});
		Embed.addField(`${Category} (${CommandsFound} commands)`, CommandsListFormat);
	}
	let CategoryList = CommandsFile[0].categoryList;
	let HelpCommandNoArgumentsProvidedMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setFooter("cloudy help <id> for help about a command")
		.setTitle("List of commands");
	for (let i = 0; i < CategoryList.length ;i++) MakeHelpStringByCategory(CategoryList[i], HelpCommandNoArgumentsProvidedMessage);
	msg.channel.send({embed: HelpCommandNoArgumentsProvidedMessage});
};

exports.SendHelpCommandCommandMessage = async (msg, Command) => {
	const HelpCommandCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setTitle(Command.name)
		.setDescription(Command.description)
		.addField("Usage", Command.usage)
		.addField("Example", Command.example)
		.setFooter(`Looking at the usage for the command ${Command.id}`);
	msg.channel.send({embed: HelpCommandCommandMessage});
};

exports.SendHelpCommandCommandNotFoundMessage = async (msg, Command) => {
	const HelpCommandCommandNotFoundMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setTitle("Command not found.")
		.setDescription(`The \`${Command}\` command was not found`);
	msg.channel.send({embed: HelpCommandCommandNotFoundMessage});
};

exports.SendDogCommandMessage = (msg, Dog) => {
	const DogCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setImage(Dog.data.message)
		.setTitle("Woof! 🐶")
		.setFooter(`Dog image requested by ${msg.author.username}`);
	msg.channel.send({embed: DogCommandMessage});
};

exports.SendCatCommandMessage = (msg, Cat) => {
	const CatCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setImage(Cat)
		.setTitle("Meow! 🐱")
		.setFooter(`Cat image requested by ${msg.author.username}`);
	msg.channel.send({embed: CatCommandMessage});
};

exports.SendErrorWebhook = (msg, client, EncounteredError, Command) => {
	let LoggingChannel = client.channels.get("439735218832670721");
	LoggingChannel.fetchWebhooks()
		.then((Webhook) => {
			let Hook = Webhook.find("name", "Logging");
			if (!Hook) return console.log("Error! No webhook!");
			else {
				Hook.send("", {
					"username": "Error",
					"avatarURL": "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/caution-256.png",
					"embeds": [{
						"color": EmbedColor,
						"description": `An error has occured while executing the \`${Command}\` command!`,
						"fields": [
							{
								"name": "Info about the user",
								"value": `Username: ${msg.author.username}#${msg.author.discriminator}\nID: ${msg.author.id}`
							},
							{
								"name": "Error",
								"value": `\`\`\`\n${EncounteredError}\n\`\`\``
							}
						],
						"timestamp": new Date()
					}]
				});
			}
		});
};

exports.SendCatFactCommandMessage = (msg, Fact) => {
	const CatFactCommandMessage = new Discord.RichEmbed()
		.setTitle("Cat fact 🐱")
		.setDescription(Fact)
		.setColor(EmbedColor)
		.setFooter(`Cat fact requested by ${msg.author.username}`)
		.setTimestamp();
	msg.channel.send({embed: CatFactCommandMessage});
};

exports.SendBirdCommandMessage = (msg, Bird) => {
	const BirdCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setImage(Bird)
		.setTitle("Chirp! 🐦")
		.setFooter(`Bird image requested by ${msg.author.username}`);
	msg.channel.send({embed: BirdCommandMessage});
};

exports.SendFoxCommandMessage = (msg, Fox) => {
	const FoxCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setImage(Fox)
		.setTitle("Wa-pa-pa-pa-pa-pa-pow! 🦊")
		.setFooter(`Fox image requested by ${msg.author.username}`);
	msg.channel.send({embed: FoxCommandMessage});
};

exports.SendShibeCommandMessage = (msg, Shibe) => {
	const ShibeCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setImage(Shibe)
		.setTitle("Wouf! 🐶")
		.setFooter(`Shibe image requested by ${msg.author.username}`);
	msg.channel.send({embed: ShibeCommandMessage});
};

exports.SendWeatherCommandMessage = (msg, data) => {
	let name = data[0].location.name;
	let temp = data[0].current.temperature;
	let feelslike = data[0].current.feelslike;
	let temperature = `[•](https://) **${temp}°C** and it's feeling like **${feelslike}°C**.`;
	let humidity = data[0].current.humidity;
	let windspeed = data[0].current.windspeed;
	let humidityandwind = `[•](https://) The air's humidity is **${humidity}**.\n[•](https://) The wind blows at the speed of **${windspeed}**.`;
	let image = data[0].current.imageUrl;
	let skytext = data[0].current.skytext.toLowerCase();
	let footer = `Viewing weather info for ${name} • It's ${skytext} today.`;

	let futureweather = "";
	data[0].forecast.forEach((element, index) => {
		/*
        let unformattedDate = element.date;
        let d = new Date(unformattedDate);
        
        let dayname = element.day;
        let day = d.getDay();
        let dayending = "";
        let days = {
            endST: [1, 21, 31],
            endND: [2, 22],
            endRD: [3, 23]
        };
        if (days.endST.indexOf(day) !== -1) dayending = "st";
        else if (days.endND.indexOf(day) !== -1) dayending = "nd";
        else if (days.endRD.indexOf(day) !== -1) dayending = "rd";
        else dayending = "th";
        let fullDay = day + dayending;

        let unformattedMonth = d.getMonth();
        let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        let month = months[unformattedMonth];

        let dateFormat = `**${dayname}**, the **${fullDay} of ${month}**`;
        */
		let dayname = element.day;
		let lowtemp = element.low;
		let maxtemp = element.high;
		let status = element.skytextday.toLowerCase();

		futureweather += `[•](https://) **${dayname}**, the temperatures will be between **${lowtemp}°C** and **${maxtemp}°C**, also, it will be **${status}**.\n`;
	});

	let WeatherCommandMessage = new Discord.RichEmbed()
		.setThumbnail(image)
		.setColor(EmbedColor)
		.addField("Temperature", temperature)
		.addField("Humidity and wind", humidityandwind)
		.addField("Forecast for the next days", futureweather)
		.setFooter(footer)
		.setTimestamp();

	msg.channel.send({ embed: WeatherCommandMessage });
};

exports.SendWeatherCommandLocationNotFoundMessage = (msg) => {
	let WeatherCommandLocationNotFoundMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setTitle("Location not found")
		.setDescription("Weather info was not found for the provided location.");
    
	msg.channel.send({ embed: WeatherCommandLocationNotFoundMessage });
};

exports.sendRPSMessage = (msg, userChoice, botChoice, winner) => {
	let botMention = `<@${Configuration.bot.id}>`;
	let userMention = msg.member;
    
	let RPSMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp();

	let footerWonMessage = "";
	let fieldWinnerList = "";
	if (winner === "both") {
		footerWonMessage = "It's a tie.";
		fieldWinnerList = `${userMention}\n${botMention}`;
	}
	else if (winner === "user") {
		footerWonMessage = "You won.";
		fieldWinnerList = userMention;
	}
	else if (winner === "bot") {
		footerWonMessage = "You lost.";
		fieldWinnerList = botMention;
	}

	RPSMessage.addField("Who chose what?", `${userChoice}\n${botChoice}`);
	RPSMessage.addField("Winner(s)", fieldWinnerList);
	RPSMessage.setFooter(`${msg.author.username} vs Cloudy • ${footerWonMessage}`, msg.author.avatarURL);

	msg.channel.send({ embed: RPSMessage });
};

exports.SendAvatarCommandMessage = (msg, finalUser) => {
	let AvatarCommandMessage = new Discord.RichEmbed()
		.setColor(EmbedColor)
		.setTimestamp()
		.setImage(finalUser.avatarURL)
		.setFooter(`viewing ${finalUser.username}'s avatar.`);
    
	msg.channel.send({ embed: AvatarCommandMessage });
};
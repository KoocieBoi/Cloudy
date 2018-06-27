const Configuration = require("../configuration");
const fs = require("fs");

module.exports = (msg, client) => {
	if (msg.author.bot || msg.channel.type !== "text") { return; }

	let Prefix = {
		letter: Configuration.bot.letterPrefix,
		mention: Configuration.bot.mentionPrefix(),
	};
	let args, cmd;

	if (msg.content.startsWith(Prefix.letter)) {
		args = msg.content.slice(Prefix.letter.length).trim().split(" ");
		cmd = args.shift().toLowerCase();
	}
	if (msg.content.startsWith(Prefix.mention)) {
		args = msg.content.slice(Prefix.mention.length).trim().split(" ");
		cmd = args.shift().toLowerCase();
	}

	// Command Handler
	fs.readdir("../Commands/", (err, files) => {
		if (err) {
			console.log(err);
			return;
		}
		if (files.length <= 0) {
			console.log("No commands could be found.");
			return;
		}
	
		files.forEach((file, index) => {
			let reqFile = require(`../Commands/${file}`);
			reqFile(client, msg, cmd, args);
		});
	});
};
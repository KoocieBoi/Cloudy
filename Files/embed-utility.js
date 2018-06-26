let Discord = require("discord.js");
let Configuration = require("./configuration");

// Old
/*
module.exports = (color, author, authorImage, authorURL, title, description, image, thumbnail, footerText, footerImage, timestamp, fields) => {
	let e = new Discord.RichEmbed();
	if (color) e.setColor(color);
	if (timestamp) e.setTimestamp();
	if (author) e.setAuthor(author, authorImage || null, authorURL || null);
	if (title) e.setTitle(title);
	if (description) e.setDescription(description);
	if (image) e.setImage(image);
	if (thumbnail) e.setThumbnail();
	if (footerText) e.setFooter(footerText, footerImage || null);
	if (fields) {
		for (let i = 0; i < fields.length; i = i + 3) {
			e.addField(fields[i], fields[i+1], fields[i+2]);
		}
	}
	return { embed: e };
};
*/

module.exports = (embedProperties) => {
	let e = new Discord.RichEmbed();
    
	// Color
	if (embedProperties.color) e.setColor(embedProperties.color);
	else e.setColor(Configuration.embeds.color);

	// Author
	if (embedProperties.author) {
		let author = embedProperties.author;
		if (author.text) { 
			e.setAuthor(
				author.text,
				(author.image) ? author.image : null,
				(author.url) ? author.url : null
			);
		}
	}

	// Header
	if (embedProperties.header) {
		let header = embedProperties.header;
		if (header.title) e.setTitle(header.title);
		if (header.description) e.setDescription(header.description);
	}

	// Footer
	if (embedProperties.footer) {
		let footer = embedProperties.footer;
		if (footer.text) {
			e.setFooter(
				footer.text,
				(footer.icon) ? footer.icon : null
			);
		}
		if (footer.time !== undefined){
			if (footer.time === true) e.setTimestamp();
			else e.setTimestamp(footer.time);
		}
	}

	// Fields
	if (embedProperties.fields) {
		let fields = embedProperties.fields;
		if (fields.length !== 0) {
			for (let i = 0; i <= fields.length; i++){
				e.addField(
					fields[i].title,
					fields[i].content,
					(fields[i].inline) ? true : false,
				);
			}
		}
	}

	// Images
	if (embedProperties.images) {
		let images = embedProperties.images;
		if (images.thumbnail) e.setThumbnail(images.thumbnail);
		if (images.big) e.setImage(images.big);
	}
	return {embed: e};
};

/*

{
    color: "",
    author: {
        text: "",
        image: "",
        url: ""
    },
    header: {
        title: "",
        description: "",
    },
    footer: {
        text: "",
        image: "",
        time: boolean
    },
    fields: [
        {
            title: "",
            content: "",
            inline: boolean
        }, {...}
    ],
    image: {
        thumbnail: "",
        big: ""
    }
}

*/


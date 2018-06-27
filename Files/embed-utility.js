let Discord = require("discord.js");
let Configuration = require("./configuration");

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
			for (let i = 0; i < fields.length; i++){
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
	return e;
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


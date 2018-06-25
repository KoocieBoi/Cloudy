let Discord = require("discord.js");

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
        for (let i = 0; i <= fields.length; i = i + 3) {
            e.addField(fields[i], fields[i+1], fields[i+2]);
        }
    }
    return { embed: e }
};


module.exports = async (Client, Event) => {
    if (Event.t !== "MESSAGE_REACTION_ADD") return;

    const { d: data } = Event;
    const user = Client.users.get(data.user_id);
    const channel = Client.channels.get(data.channel_id);

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    Client.emit("messageReactionAdd", reaction, user);
};
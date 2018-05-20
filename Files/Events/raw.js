module.exports = async (client, Event) => {
    if (Event.t !== "MESSAGE_REACTION_ADD") return;

    const { d: data } = Event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id);

    if (channel.messages.has(data.message_id)) return;

    const msg = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = msg.reactions.get(emojiKey);

    client.emit("messageReactionAdd", reaction, user);
};
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: 'Joins the voice channel of the user.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to use this command!');
        }
        try {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            message.channel.send(`Joined ${voiceChannel.name}!`);
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error joining the voice channel.');
        }
    },
};

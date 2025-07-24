const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    description: 'Displays the currently playing song.',
    execute(message, args, client) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue || !serverQueue.songs[0]) {
            return message.channel.send('There is no song currently playing!');
        }

        const song = serverQueue.songs[0];
        const nowPlayingEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Now Playing')
            .setDescription(`${song.title}`)
            .setTimestamp();

        message.channel.send({ embeds: [nowPlayingEmbed] });
    },
};

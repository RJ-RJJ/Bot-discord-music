const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Plays a song from YouTube.',
    async execute(message, args, client) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to play music!');
        }

        const serverQueue = client.queue.get(message.guild.id);

        let song = {};

        if (ytdl.validateURL(args[0])) {
            const songInfo = await ytdl.getInfo(args[0]);
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
        } else {
            const { videos } = await ytSearch(args.join(' '));
            if (!videos.length) {
                return message.channel.send('No songs were found!');
            }
            song = { title: videos[0].title, url: videos[0].url };
        }

        if (!serverQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
                player: createAudioPlayer(),
            };

            client.queue.set(message.guild.id, queueContruct);
            queueContruct.songs.push(song);

            try {
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });
                queueContruct.connection = connection;
                this.playSong(message.guild, queueContruct.songs[0], client);
            } catch (err) {
                console.log(err);
                client.queue.delete(message.guild.id);
                return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
    },

    playSong(guild, song, client) {
        const serverQueue = client.queue.get(guild.id);
        if (!song) {
            serverQueue.connection.destroy();
            client.queue.delete(guild.id);
            return;
        }

        const stream = ytdl(song.url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        serverQueue.player.play(resource);
        serverQueue.connection.subscribe(serverQueue.player);

        serverQueue.player.on(AudioPlayerStatus.Idle, () => {
            serverQueue.songs.shift();
            this.playSong(guild, serverQueue.songs[0], client);
        });

        serverQueue.textChannel.send(`Start playing: **${song.title}**`);
    },
};

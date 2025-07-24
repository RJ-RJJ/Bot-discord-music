const { prefix } = require('../config.js');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            command.execute(message, args, client);
        } catch (error) {
            const logger = require('../utils/logger');
            logger(`Error executing command ${command.name}: ${error.message}`);
            message.reply('there was an error trying to execute that command!');
        }
    },
};

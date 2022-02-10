const Helpers = {
    ...require('@lawlzer/helpers'),
    ...require('../../etc/helpers.js'),
};
const Requirements = require('../../etc/requirements.js'); 

const Discord = require('discord.js');

module.exports = {
    aliases: ['Ping', 'ling', 'ding'],
    summary: 'Pong!',
    description: 'Use this command to see if the bot is running.',
    examples: ['ping'],
    requirements: [],
    async myFunc(bot, server, user, message, args) {
        return await Helpers.sendEmbed(message.channel, { title: 'Pong!', description: `${message.author.tag} pong!`, timestamp: true });
    },
};
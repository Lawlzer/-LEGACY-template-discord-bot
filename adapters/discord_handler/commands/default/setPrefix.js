const Helpers = require('../../etc/helpers.js');
const Requirements = require('../../etc/requirements.js'); 
const Discord = require('discord.js');

module.exports = {
	aliases: ['SetPrefix'],
	summary: `This will allow you to set the commandPrefix of every command.`,
	description: 'This command will allow you to set the "commandPrefix" - the "prefix", or "start" of every command. E.g **!**help.',
	examples: ['SetPrefix !', 'SetPrefix $'],
	requirements: [Requirements.administrator],
	hidden: false,

	async myFunc(bot, server, user, message, args) {
        server.commandPrefix = args.join(' ').trim(); // Set the commandPrefix to the argument.
        await server.save(); // Save the server.
        await Helpers.sendEmbed(message.channel, { title: 'SetPrefix', description: `The commandPrefix has been set to \`${server.commandPrefix}\`.` });
	},
};

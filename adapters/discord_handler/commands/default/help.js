const Helpers = {
	...require('@lawlzer/helpers'),
	...require('../../etc/helpers.js'),
};
const Requirements = require('../../etc/requirements.js');

const Discord = require('discord.js');

module.exports = {
	aliases: ['Help'],
	summary: `Displays all commands, along with their descriptions, aliases, and examples. Use \`${global.commandPrefix}help [command]\` to get more info on a specific command.`,
	description: 'help help',
	examples: ['help', 'help help'],
	requirements: [],
	hidden: false,

	async myFunc(bot, user, message, args) {
		const allCommands = Helpers.getAllCommands();

		if (args.length > 0) {
			const command = allCommands.find((command) => command.aliases.find((alias) => alias.toLowerCase() === args[0]));

			if (!command) return Helpers.sendEmbed(message.channel, { title: 'Help', description: `Error: Command \`${args[0]}\` not found. Use \`${global.commandPrefix}help\` to see all commands.` });

			return Helpers.sendEmbed(message.channel, {
				title: `Command: ${command.aliases[0]}`,
				description: `\n\n
                **Aliases:** ${command.aliases.join(', ')}\n
                **Description:** ${command.description}\n
                **Examples:** ${global.commandPrefix}${command.examples.join(', ')}`,
			});
		}

		let text = '\n';
		allCommands.map((command) => {
			if (command.hidden) return; // Some hidden commands
			text += `
                **${command.aliases[0]}**
                Summary: ${command.summary}
                Examples: ${global.commandPrefix}${command.examples.join(`,  ${global.commandPrefix}`)}
                `;
		});
		await Helpers.sendEmbed(message.channel, { title: 'Help', description: text, timestamp: true });
	},
};

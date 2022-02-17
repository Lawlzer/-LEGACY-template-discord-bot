// Invite Link for the bot: https://discordapp.com/oauth2/authorize?client_id=923498253297791016&scope=bot
console.log('Discord bot is in index.js');

const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['CHANNEL'],
	intents: ['GUILDS', 'GUILD_MESSAGES', Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});

const Helpers = require('./etc/helpers.js');

bot.on('ready', () => {
	console.log('Discord bot started!');
	bot.user.setActivity(global.discordBotActivity);
});

bot.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	if (message.channel.type.toLowerCase() === 'dm') {
		return await Helpers.sendEmbed(message.channel, { title: 'Error', description: 'This bot must be messaged in a public channel.', error: true });
	} // No commands are allowed to be sent through DMs.

	console.log('message.channel: ', message.channel);
	console.log('message.channel.id: ', message.channel.id);
	if (message.channel.id !== '921167285551505490') {
		console.log('We are only supposed to work in the main channel!');
		return;
	}

	if (!message.content.toLowerCase().startsWith(global.commandPrefix)) return;

	const commandName = message.content.toLowerCase().trim().replace(global.commandPrefix, '').split(' ')[0];
	const commandArgs = message.content.toLowerCase().trim().replace(global.commandPrefix, '').split(' ').slice(1);

	const user = await Helpers.getUser(message.author);

	const allCommands = Helpers.getAllCommands();

	for await (const command of allCommands) {
		const isCorrectCommand = command.aliases.some((alias) => alias.toLowerCase() === commandName);
		if (!isCorrectCommand) continue;

		for (const requirement of command.requirements) {
			const requirementSuccess = await requirement(bot, user, message, commandArgs);
			if (!requirementSuccess) return; // automatically sends an error message from the requirement
		}
		return await command.myFunc(bot, user, message, commandArgs);
	}

	await Helpers.sendEmbed(message.channel, { title: 'Error', description: `Command: ${commandName} could not be found.`, timestamp: true, error: true });
	return;

	//     if (!message.member.roles.some(r => ['Administrator'].includes(r.name)))
	//         return message.reply('Sorry, you don't have permissions to use this!');

	//     let member = message.mentions.members.first();
	//     if (!member)
	//         return message.reply('Please mention a valid member of this server');
	//     if (!member.bannable)
	//         return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');

	//     let reason = args.slice(1).join(' ');
	//     if (!reason) reason = 'No reason provided';

	//     await member.ban(reason)
	//         .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
	//     message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
	// }

	// if (command === 'purge') {
	//     // This command removes all messages from all users in the channel, up to 100.

	//     // get the delete count, as an actual number.
	//     const deleteCount = parseInt(args[0], 10);

	//     // Ooooh nice, combined conditions. <3
	//     if (!deleteCount || deleteCount < 2 || deleteCount > 100)
	//         return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');

	//     // So we get our messages, and delete them. Simple enough, right?
	//     const fetched = await message.channel.fetchMessages({ limit: deleteCount });
	//     message.channel.bulkDelete(fetched)
	//         .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	// }
});

bot.login(process.env.DISCORD_TOKEN);

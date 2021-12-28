// Invite Link for the bot: https://discordapp.com/oauth2/authorize?client_id=923498253297791016&scope=bot
console.log('Discord bot is in index.js');

require('dotenv').config();
require('./etc/globals.js'); 

const fs = require('fs');

const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

const Helpers = require('./helpers/helpers.js'); 

bot.on('ready', () => {
    // console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    // bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
    console.log('Discord bot started!');
    bot.user.setActivity(global.discordBotActivity);
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return message.channel.send('Please message me in a public channel!');

    if (!message.content.toLowerCase().startsWith(global.commandPrefix)) return;

    const commandName = message.content.toLowerCase().trim().replace(global.commandPrefix, '').split(' ')[0];
    const commandArgs = message.content.toLowerCase().trim().replace(global.commandPrefix, '').split(' ').slice(1);

    const server = await Helpers.getServer(message); 
    const user = await Helpers.getUser(server, message);

    const allCommands = Helpers.getAllCommands();
    for await ( const command of allCommands) { 
        const isCorrectCommand = command.aliases.some((alias) => alias.toLowerCase() === commandName);
        if (!isCorrectCommand) continue; 
        return await command.myFunc(bot, server, user, message, commandArgs);
    }

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

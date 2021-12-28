const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});
const Server = require('../models/server.js');

const Discord = require('discord.js');

const fs = require('fs');


const getAllCommands = () => {
    return fs.readdirSync('./commands').map((file) => {
        const commands = require(`../commands/${file}`);
        return Object.keys(commands).map((key) => {
            return commands[key];
        });
    }).flat(1);
};
module.exports.getAllCommands = getAllCommands;

const getServer = async (message) => {
    const server = await Server.findOne({ id: message.guildId });
    if (server) return server;

    const newServer = await Server.create({
        id: message.guildId,
        users: [],
    });
    await newServer.save();
    return newServer;
};
module.exports.getServer = getServer;

const getUser = async (server, message) => {
    const user = server.users.find(user => user.id === message.author.id);
    if (user) return user;
    const newUser = ({
        id: message.author.id,
    });
    server.users.push(newUser);
    return newUser;
};
module.exports.getUser = getUser;

const sendEmbed = async (channel, { title, description, timestamp, error }) => {
    const myEmbed = new Discord.MessageEmbed()
        .setColor(error ? global.errorColor : global.defaultColor)
        .setTitle(title || 'ERROR: NO TITLE SET FOR EMBED')
        .setURL(global.url)
        .setDescription(description || 'ERROR: NO DESCRIPTION SET FOR EMBED')
        // .setAuthor('Lawlzer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Neko_Wikipe-tan.svg/1200px-Neko_Wikipe-tan.svg.png')
        // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        // .addFields(
        //     { name: 'Regular field title', value: 'Some value here' },
        //     { name: '\u200B', value: '\u200B' },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        // )
        // .setImage('')
        .setTimestamp()
        .setFooter(global.footerText, global.footerImage);
    await channel.send({ embeds: [myEmbed] });
};
module.exports.sendEmbed = sendEmbed; 
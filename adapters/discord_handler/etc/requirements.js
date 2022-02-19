const Helpers = {
	...require('@lawlzer/helpers'),
	...require('./helpers.js'),
};

const administrator = async (bot, server, user, message, args) => {
	const isAdmin = message.member.permissionsIn(message.channel).has('ADMINISTRATOR');
	if (!isAdmin) {
		Helpers.sendEmbed(message.channel, { title: 'Error', description: "Sorry, you don't have permission to use this! This requires administrator permission.", timestamp: true, error: true });
		return false;
	}
	return true;
};
module.exports.administrator = administrator;

const notDMs = async (bot, server, user, message, args) => {
	if (message.channel.type === 'dm') {
		Helpers.sendEmbed(message.channel, { title: 'Error', description: `Sorry, this command does not work in DMs!`, timestamp: true, error: true });
		return false;
	}
	return true;
};
module.exports.notDMs = notDMs;

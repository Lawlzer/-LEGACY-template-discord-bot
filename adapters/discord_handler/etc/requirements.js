const Helpers = { 
    ...require('@lawlzer/helpers'),
    ...require('./helpers.js'),
}

const administrator = async (bot, user, message, args) => {
    const isAdmin = message.member.permissionsIn(message.channel).has('ADMINISTRATOR');
    if (!isAdmin) {
        Helpers.sendEmbed(message.channel, { title: 'Error', description: 'Sorry, you don\'t have permission to use this! This requires administrator permission.', timestamp: true, error: true });
        return false; 
    }
    return true; 
}
module.exports.administrator = administrator; 
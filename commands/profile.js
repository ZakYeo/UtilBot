const { SlashCommandBuilder,EmbedBuilder, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription("View a user's server profile")
        .addUserOption(option =>
            option.setName('target')
              .setDescription('Select a user')
              .setRequired(true)),
	async execute(interaction) {
        const target = interaction.options.getMember("target");
        const customEmbed = new EmbedBuilder()
            .setTitle(`:sunny: ${target.user.username}#${target.user.discriminator}'s Profile :sunny:`)
            .setThumbnail(target.user.avatarURL())
            .setColor("#303136");
        const joinedTimestamp = new Date(target.joinedTimestamp).toLocaleString();
        const joinedTimestampFormatted = (joinedTimestamp.split(", ")[1]).split(":").join("/");
        const createdTimestamp = new Date(target.user.createdTimestamp).toLocaleString();
        const createdTimestampFormatted = (createdTimestamp.split(", ")[1]).split(":").join("/");
        customEmbed.addFields({name: ":star: Server Join", value: `${joinedTimestamp}`, inline: true},
        {name: ":star: Account Creation", value: `${createdTimestamp}`, inline: true},
        {name: ":gear: ID", value: "`"+target.id+"`", inline: false},
        {name: ":clipboard: Roles", value:`${target.roles.cache.map(r => '<@&'+r.id+'>').join(' ')}`, inline: false})
		await interaction.reply({ embeds: [customEmbed] });
	},
};
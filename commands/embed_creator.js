const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Create a custom embed')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Set the title of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Set the description of the embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Set the url of the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('thumbnail')
                .setDescription('Set the thumbnail of the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('image')
                .setDescription('Set the image of the embed')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('timestamp')
                .setDescription('Place a timestamp on the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('author')
                .setDescription('Set the Author Name of the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('author_icon_url')
                .setDescription('Set the icon url for the Author of the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('author_url')
                .setDescription('Set the url for the Author of the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('footer')
                .setDescription('Set the footer of the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('footer_icon')
                .setDescription('Set the icon url for the Footer of the embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('field')
                .setDescription('Add a field name')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('field_value')
                .setDescription('Set the icon url for the Footer of the embed')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('inline')
                .setDescription('Should the field be placed inline?')
                .setRequired(false)),
        
	async execute(interaction) {

        const customEmbed = new EmbedBuilder()
            .setTitle("Placeholder")
            .setDescription("Placeholder");

        customEmbed.setTitle(interaction.options.getString('title'));
        customEmbed.setDescription(interaction.options.getString("description"))
        const url = interaction.options.getString("url");
        const thumbnail = interaction.options.getString("thumbnail");
        const image = interaction.options.getString("image");
        const timestamp = interaction.options.getBoolean("timestamp");
        const author = interaction.options.getString("author");
        const author_icon_url = interaction.options.getString("author_icon_url");
        const author_url = interaction.options.getString("author_url");
        const footer = interaction.options.getString("footer");
        const footer_icon = interaction.options.getString("footer_icon");
        const field = interaction.options.getString("field");
        const field_value = interaction.options.getString("field_value");
        const should_inline = interaction.options.getBoolean("inline");
        if(url != null){
            customEmbed.setURL(url);
        }
        if(thumbnail != null){
            customEmbed.setThumbnail(thumbnail);
        }
        if(image != null){
            customEmbed.setImage(image);
        }
        if(timestamp != null && timestamp == true){
            customEmbed.setTimestamp();
        }

        //Remember that author_url and author_icon_url can only be set if author is set
        if(author != null && author_url != null  && author_icon_url != null){
            customEmbed.setAuthor({ name: author, iconURL: author_icon_url, url:author_url});
        }else if(author != null && author_url != null){
            customEmbed.setAuthor({ name: author, url:author_url});
        }else if(author != null && author_icon_url != null){
            customEmbed.setAuthor({ name: author, iconURL: author_icon_url});
        }

        //Remember that footer_icon can only be set if footer is set
        if(footer != null && footer_icon != null){
            customEmbed.setFooter({text: footer, iconURL: footer_icon});
        }else if(footer != null){
            customEmbed.setFooter({text: footer});
        }
        
        //Remember field_value and should_inline can only be set if field is set
        if(field != null && field_value != null && should_inline != null){
            customEmbed.addFields({name: field, value: field_value, inline: should_inline});
        }else if(field != null && field_value != null){
            customEmbed.addFields({name: field, value: field_value});            
        }else if(field != null && should_inline != null){
            customEmbed.addFields({name: field, inline: should_inline});
        }
        //This command only supports one field+value pair


		await interaction.reply({ embeds: [customEmbed] });
	},
};
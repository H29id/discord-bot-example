const Discord = require("discord.js");
const client = new Discord.Client({
	disableMentions: "everyone"
});

client.on("ready", () => {
	console.log(`${client.user.tag} ready!`);
	client.user.setActivity("I'm online");
});

client.on("message", (msg) => {
	if(!msg.guild) return;
	if(msg.author.bot) return;

	const ownerID = "PutYourIDHere";
	const prefix = "a!";
	let args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if(!msg.content.startsWith(prefix)) return;

	if(cmd === "command") {
		const helpEmbed = new Discord.MessageEmbed()
		.setColor("BLURPLE")
		.setTitle("Command List")
		.setDescription(`${prefix}command - List of commands
${prefix}dice - Get a random number from 1 - 6
${prefix}invite - Displays invite link on embed
${prefix}ping - Check the bot's ping
${prefix}info - Bot information`)
		.setFooter(`The prefix is ${prefix}`, client.user.displayAvatarURL());
		msg.channel.send(helpEmbed);
	};

	if(cmd === "dice") {
		msg.channel.send(Math.floor((Math.random() * 6) + 1));
	};

	if(cmd === "invite") {
		const inviteEmbed = new Discord.MessageEmbed()
		.setColor("BLURPLE")
		.setDescription(`[Click me](https://discordapp.com/oauth2/authorize/?permissions=0&scope=bot&client_id=${client.user.id})`);
		msg.channel.send(inviteEmbed);
	};

	if(cmd === "ping") {
		msg.channel.send(`Pong! **${client.ws.ping}ms**`);
	};

	if(cmd === "info") {
		msg.channel.send(`Owner: ${client.users.cache.get(ownerID).tag}
Joined on: ${client.guilds.cache.size} guilds`);
	};
});

client.login("BotToken");

//id.json : {"years":2003,"mouth":2,"day":12}
const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const bot = new Discord.Client();
const mysql = require("mysql");
const fs = require("fs");
const temp = 3000; //json

function dateFr(a01, a02, a03) { //Vendredi 23 décembre 2018
	var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
	var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
	var date = new Date(a01, a02, a03);

	var message = jours[date.getDay()] + " "; // nom du jour
	message += date.getDate() + " "; // numero du jour
	message += mois[date.getMonth()] + " "; // mois
	message += date.getFullYear();

	return message;
}

bot.on("ready", message => {
	var messagess = "Préparation de l'annonce de la date";
	bot.channels.find(channel => channel.name === "general").send(messagess).then((messageDate) => {
		setInterval(function(){
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			fs.readFile('./civilisation/id.json', 'utf-8', function(err, data) {
				if (err) throw err
		
				var arrayOfObjects = JSON.parse(data)
		
				var b03 = arrayOfObjects.day+1;
				var b02 = arrayOfObjects.mouth;
				var b01 = arrayOfObjects.years;
		
				var date = new Date(b01, b02, b03);
				console.log(date.getDate() + " " + date.getMonth() + " " + date.getFullYear());
				var myJSON = { "years": date.getFullYear(), "mouth": date.getMonth(), "day": date.getDate()};
				fs.writeFile('./civilisation/id.json', JSON.stringify(myJSON), 'utf-8', function(err) {
					if (err) throw err
					console.log('Done!')
				})
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				var messages = new RichEmbed()
				.setAuthor("Annonce Date sur le serveur " + `${bot.user.username}#${bot.user.discriminator}`, bot.user.avatarURL)
				.setDescription("Sur **Civilisation**, Nous sommes le **" + dateFr(b01,b02,b03) + "**")
				.setTimestamp()
				.setColor(3066993);
				//var messages = "Sur **Civilisation**, Nous sommes le **" + dateFr(b01,b02,b03) + "**";
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				messageDate.edit(messages); //modif
			})
		}, temp);
	});
});

bot.on('warn', console.warn);
bot.on('error', console.error);
bot.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));
bot.on('reconnecting', () => console.log('I am reconnecting now!'));
bot.on('ready', function () {
    console.log(bot.user.username + ' online!');
    bot.user.setStatus("online"); //dnd , online , idle
});
bot.login(TOKEN);
//id.json : {"years":2003,"mouth":2,"day":12}
//executer setinterval directement
const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
//const temp = 1800000; //json
const temp = 2000; //json

function dateFr(a01, a02, a03) {
	var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
	var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
	var date = new Date(a01, a02, a03);

	var message = jours[date.getDay()] + " "; 
	message += date.getDate() + " ";
	message += mois[date.getMonth()] + " ";
	message += date.getFullYear();

	return message;
}

bot.on("ready", message => {
	var localization = './Civilisation/id.json';
	var horraire = new Date;
	var heure = horraire.getHours();
	if ((heure <= 5) || (heure >= 21)) console.log(heure + "non execution"); //2h de decal srv HUMAN
	if ((heure <= 5) || (heure >= 21)) return; //2h de decal srv HUMAN
	//if ((heure <= 7) || (heure >= 23)) return; //2h de decal srv PC

	var messagess = "Préparation de l'annonce de la date";
	bot.channels.find(channel => channel.name === "date").send(messagess).then((messageDate) => {
		setInterval(function(){
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			fs.readFile(localization, 'utf-8', function(err, data) {
				if (err) throw err
		
				var arrayOfObjects = JSON.parse(data)
		
				var b03 = arrayOfObjects.day+1;
				var b02 = arrayOfObjects.mouth;
				var b01 = arrayOfObjects.years;
		
				var date = new Date(b01, b02, b03);
				console.log(date.getDate() + " " + date.getMonth() + " " + date.getFullYear());
				var myJSON = { "years": date.getFullYear(), "mouth": date.getMonth(), "day": date.getDate()};
				fs.writeFile(localization, JSON.stringify(myJSON), 'utf-8', function(err) {
					if (err) throw err
					console.log('Done!')
				})
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				var messages = new RichEmbed()
				.setAuthor("Annonce Date sur le serveur " + `${bot.user.username}#${bot.user.discriminator}`, bot.user.avatarURL)
				.setDescription(":date: Sur **Civilisation**, Nous sommes actuellement le **" + dateFr(b01,b02,b03) + "**")
				.setTimestamp()
				.setColor(3066993);
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
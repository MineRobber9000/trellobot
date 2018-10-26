const Discord = require("discord.js");
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const client = new Discord.Client();

const config = require("./config.json");

app.post(config.http_prefix+"/test",function (req,res) {
	console.log(req.body);
	res.send(JSON.stringify(req.body));
});

app.head(config.http_prefix+"/test",function (req,res) { res.send(""); });

client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
});

client.on("message", async message => {
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
  }
});

app.listen(config.http_port,function() { console.log("On port "+config.http_port); });

client.login(config.token);

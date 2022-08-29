'use strict';

const { Client, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT;

import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ disableMentions: 'everyone' });
const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX;

console.log('the prefix is: ' + prefix)

client.login(TOKEN);
client.commands = new Collection();
client.prefix = process.env.PREFIX;
client.queue = new Map();

//  Client Events
client.on('ready', () => {
  console.log(`The bot is ready ready!`);
  client.user
    .setActivity(`${prefix}help and ${prefix}play`, { type: 'LISTENING' });
});
client.on('warn', (info: any) => console.log(info));
client.on('error', console.error);

//Import commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
  .filter((file: any) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', `${file}`));
  client.commands.set(command.name, command);
}

client.on('messageCreate', async (message: any) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd: any) => {
      cmd.aliases && cmd.aliases.includes(commandName);
    });

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command.')
      .catch(console.error);
  }
});

http.createServer((req: any, res: any) => {
  res.writeHead(200);
  res.end('I am Ukrainian music bot');
}).listen(PORT);
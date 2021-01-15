'use strict';

const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const { prefix, token } = require('./config.json');

const client = new Client({ disableMentions: 'everyone' });

client.login(token);
client.commands = new Collection();
client.prefix = prefix;
client.queue = new Map();


// Client Events
client.on('ready', () => {
  console.log(`${client.user.username} ready!`);
  client.user
    .setActivity(`${prefix}help and ${prefix}play`, { type: 'LISTENING' });
});
client.on('warn', info => console.log(info));
client.on('error', console.error);


//Import all commands
const commandFiles = readdirSync(join(__dirname, 'commands'))
  .filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(join(__dirname, 'commands', `${file}`));
  client.commands.set(command.name, command);
}

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(cmd => {
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

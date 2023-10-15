'use strict';

export default {
  name: 'server',
  description: 'information about server',
  execute(message: any) {
    message.channel.send(`This server's name is ${message.guild.name}`);
  },
};

'use strict';

module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message: any) {
    message.channel.send('Pong.');
  },
};

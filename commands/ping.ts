'use strict';

export default {
  name: 'ping',
  description: 'Ping!',
  execute(message: any) {
    message.channel.send('Pong.');
  },
};

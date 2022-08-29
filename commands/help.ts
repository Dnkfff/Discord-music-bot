'use strict';

module.exports = {
  name: 'help',
  description: 'Help command',
  execute(message: any) {
    message.channel.send('To play music write: *play (track name or URL)');
  },
};

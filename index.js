bot.on('messagestr', (message) => {
  if (message.includes('/register')) {
    bot.chat('/register chalol78 chalol78');
  } else if (message.includes('/login')) {
    bot.chat('/login chalol78');
  }
});

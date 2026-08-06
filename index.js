const fs = require('fs');
const mineflayer = require('mineflayer');

// قراءة الإعدادات من ملف settings.json
const settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));

function createBot() {
  const bot = mineflayer.createBot({
    host: settings.server.ip,
    port: settings.server.port,
    username: settings["bot-account"].username,
    version: settings.server.version || false
  });

  bot.on('login', () => {
    console.log(`[BOT] Connected to ${settings.server.ip} as ${bot.username}`);
  });

  // التسجيل وتنسيق أوامر الدخول تلقائياً عند طلبها في الشات
  bot.on('messagestr', (message) => {
    console.log(`[CHAT] ${message}`);

    if (settings.utils["auto-auth"].enabled) {
      const pass = settings.utils["auto-auth"].password;
      
      if (message.includes('/register')) {
        bot.chat(`/register ${pass} ${pass}`);
      } else if (message.includes('/login')) {
        bot.chat(`/login ${pass}`);
      }
    }
  });

  bot.on('error', (err) => console.log('[ERROR]', err));

  bot.on('end', () => {
    console.log('[BOT] Disconnected. Reconnecting...');
    if (settings.utils["auto-reconnect"]) {
      setTimeout(createBot, settings.utils["auto-reconnect-delay"] || 10000);
    }
  });
}

createBot();

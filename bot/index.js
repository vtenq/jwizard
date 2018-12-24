
const Telegraf = require('telegraf')

module.exports = (token) => {
  const bot = new Telegraf(token)
  bot.on('text', ({ reply }) => reply('Yo'))

  return bot
}

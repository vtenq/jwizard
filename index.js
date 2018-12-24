const Telegraf = require('telegraf')
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const PORT = process.env.PORT || 3000
const BOT_TOKEN = process.env.BOT_TOKEN
const BOT_WEBHOOK_URL = process.env.BOT_WEBHOOK_URL || 'https://jazz-wizard.herokuapp.com'

const bot = new Telegraf(BOT_TOKEN)

bot.on('text', ({ reply }) => reply('Yo'))

// Set telegram webhook
// For local debugging - npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook(`${BOT_WEBHOOK_URL}/${BOT_TOKEN}`)

const app = new Koa()
const router = new Router()

router
  .get('/', async (ctx) => ctx.body = 'Yo, sometime this will be index.html, but no worries, it somehow works')
  .post(`/${BOT_TOKEN}`, async (ctx) => bot.handleUpdate(ctx.request.body, ctx.response))

app.use(koaBody())
app.use(router.routes())

app.listen(PORT)

console.log(`App is listening on port ${PORT}`)
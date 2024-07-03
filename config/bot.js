const TelegramBot = require("node-telegram-bot-api");
const { getWeather } = require("../utils/apifetch");
const commandsList = require("../commandsList.json");

// credentials
const token = process.env.BOT_TOKEN;

// bot creation
const bot = new TelegramBot(token, { polling: true });

// Command handlers
bot.onText(/\/gradi/, async (msg) => handleCommand("gradi", msg));
bot.onText(/\/vento/, async (msg) => handleCommand("vento", msg));
bot.onText(/\/pioggia/, async (msg) => handleCommand("pioggia", msg));
bot.onText(/\/help/, async (msg) => handleHelp(msg));

// start command handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Benvenuto! Sono il tuo assistente meteo. Ecco cosa posso fare:\n\n${commandsList
      .map((cmd) => `${cmd.text}: ${cmd.use}`)
      .join("\n")}`
  );
});

// command handler function
async function handleCommand(command, msg) {
  const chatId = msg.chat.id;
  try {
    const weather = await getWeather(command);
    bot.sendMessage(chatId, weather);
  } catch (error) {
    bot.sendMessage(
      chatId,
      `Non sono riuscito a ottenere le previsioni meteo per Trieste. Riprova più tardi.`
    );
  }
}

// help handler function
async function handleHelp(msg) {
  const chatId = msg.chat.id;
  try {
    await bot.sendMessage(
      chatId,
      `Comandi disponibili: \n\n${commandsList
        .map((cmd) => `${cmd.text}: ${cmd.use}`)
        .join("\n")}`
    );
  } catch (error) {
    await bot.sendMessage(
      chatId,
      `Purtroppo non sono riuscito a fornirti la lista dei comandi`
    );
  }
}

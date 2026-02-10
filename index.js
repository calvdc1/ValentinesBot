const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const express = require('express');
require('dotenv').config();

// --- Keep-Alive Server for Render ---
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Blind Dating Bot is Alive! 💘'));

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
// ------------------------------------

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();
const primaryCommandsPath = path.join(__dirname, 'commands');
const altCommandsPath = path.join(process.cwd(), 'commands');
const commandsPath = fs.existsSync(primaryCommandsPath) ? primaryCommandsPath : altCommandsPath;

// Check if commands directory exists
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
} else {
    console.warn(`[WARNING] Commands directory not found at ${commandsPath}`);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.DISCORD_TOKEN);

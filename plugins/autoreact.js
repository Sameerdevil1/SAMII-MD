import { bot } from '../lib/handler.js';
import { serialize } from '../lib/serialize.js';
import { loadMessage } from '../lib/sql/store.js';
import { numtoId } from '../lib/utils.js';


let autoReactStatus = false;

// Set of emojis for reactions
const emojiSet = ['😊', '😂', '❤️', '🔥', '👍', '😎', '🙌', '🎉', '💯', '🥳'];

// Command to turn AutoReact ON
bot(
  {
    pattern: 'autoreact on',
    isPublic: true,
    desc: 'Enable auto reaction to every message with random emojis.',
  },
  async (message) => {
    autoReactStatus = true;
    await message.sendReply('_AutoReact with emojis has been enabled!_');
  }
);

// Command to turn AutoReact OFF
bot(
  {
    pattern: '/autoreact off',
    isPublic: true,
    desc: 'Disable auto reaction to messages.',
  },
  async (message) => {
    autoReactStatus = false;
    await message.sendReply('_AutoReact with emojis has been disabled!_');
  }
);

// Listener for incoming messages to auto react
bot(
  {
    on: 'chat-update',
  },
  async (message) => {
    if (autoReactStatus && message.text && !message.isCommand) {
      const randomEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
      await message.react(randomEmoji);
    }
  }
);

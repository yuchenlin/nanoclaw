import os from 'os';
import path from 'path';

import { readEnvFile } from './env.js';

// Read config values from .env (falls back to process.env).
// Secrets are NOT read here — they stay on disk and are loaded only
// where needed (container-runner.ts) to avoid leaking to child processes.
const envConfig = readEnvFile(['ASSISTANT_NAME', 'ASSISTANT_HAS_OWN_NUMBER']);

export const ASSISTANT_NAME =
  process.env.ASSISTANT_NAME || envConfig.ASSISTANT_NAME || 'Andy';
export const ASSISTANT_HAS_OWN_NUMBER =
  (process.env.ASSISTANT_HAS_OWN_NUMBER ||
    envConfig.ASSISTANT_HAS_OWN_NUMBER) === 'true';
export const POLL_INTERVAL = 2000;
export const SCHEDULER_POLL_INTERVAL = 60000;

// Absolute paths needed for container mounts
const PROJECT_ROOT = process.cwd();
const HOME_DIR = process.env.HOME || os.homedir();

// Mount security: allowlist stored OUTSIDE project root, never mounted into containers
export const MOUNT_ALLOWLIST_PATH = path.join(
  HOME_DIR,
  '.config',
  'nanoclaw',
  'mount-allowlist.json',
);
export const SENDER_ALLOWLIST_PATH = path.join(
  HOME_DIR,
  '.config',
  'nanoclaw',
  'sender-allowlist.json',
);
export const STORE_DIR = path.resolve(PROJECT_ROOT, 'store');
export const GROUPS_DIR = path.resolve(PROJECT_ROOT, 'groups');
export const DATA_DIR = path.resolve(PROJECT_ROOT, 'data');

export const CONTAINER_IMAGE =
  process.env.CONTAINER_IMAGE || 'nanoclaw-agent:latest';
export const CONTAINER_TIMEOUT = parseInt(
  process.env.CONTAINER_TIMEOUT || '1800000',
  10,
);
export const CONTAINER_MAX_OUTPUT_SIZE = parseInt(
  process.env.CONTAINER_MAX_OUTPUT_SIZE || '10485760',
  10,
); // 10MB default
export const IPC_POLL_INTERVAL = 1000;
export const IDLE_TIMEOUT = parseInt(process.env.IDLE_TIMEOUT || '1800000', 10); // 30min default — how long to keep container alive after last result
export const MAX_CONCURRENT_CONTAINERS = Math.max(
  1,
  parseInt(process.env.MAX_CONCURRENT_CONTAINERS || '5', 10) || 5,
);

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const TRIGGER_PATTERN = new RegExp(
  `^@${escapeRegex(ASSISTANT_NAME)}\\b`,
  'i',
);

// Timezone for scheduled tasks (cron expressions, etc.)
// Uses system timezone by default
export const TIMEZONE =
  process.env.TZ || Intl.DateTimeFormat().resolvedOptions().timeZone;

// Fun acknowledgment messages for when the agent is thinking
export const THINKING_MESSAGES = [
  '⚙️ Got it, working on it...',
  '🧠 Let me think about that...',
  '🔄 Processing your request...',
  '⏳ One moment, solving this...',
  '🎯 On it! Give me a sec...',
  '🚀 Activating brain cells...',
  '💡 Thinking outside the box...',
  '🔍 Analyzing the situation...',
  '⚡ Lightning-fast thinking engaged...',
  '🎲 Calculating the odds...',
  '🧩 Putting the pieces together...',
  '🌀 Computing in progress...',
  '📊 Running the numbers...',
  '🎪 The show is starting...',
  '🔮 Consulting the crystal ball...',
  '🏃 Running at full speed...',
  '🎨 Painting a solution...',
  '🎸 Tuning into the problem...',
  '🚁 Helicopter view activated...',
  '🧲 Magnetizing ideas...',
  '⭐ Shining a light on this...',
  '🎭 Putting on my thinking hat...',
  '🏋️ Flexing my compute muscles...',
  '🎯 Laser-focused on this...',
  '🌊 Riding the wave of logic...',
  '🦾 Cranking up the power...',
  '💫 Sparking some creativity...',
  '🎢 Taking a quick ride through my circuits...',
  '🧗 Climbing this mountain of complexity...',
  '🎪 The machinery is spinning...',
  '🌟 Illuminating the path forward...',
  '🔔 Bells are ringing in my brain...',
  '🎯 Aiming for the bullseye...',
  '🎬 Action! Rolling on this one...',
  '🧠 Cracking the code...',
  '🚁 Surveying the landscape...',
  '⚡ Plug inserted, charging up...',
  '🎵 Harmonizing the solution...',
  '🏃‍♂️ In overdrive mode...',
  '🌈 Painting with all the colors...',
  '🎪 The circus has begun...',
  '🔥 Heating things up...',
  '❄️ Cool and calculated...',
  '🌪️ Whirlwind of activity in progress...',
  '🎯 Target locked, firing neurons...',
  '🚀 Rocket boosters engaged...',
  '🦅 Eagle eye on the problem...',
  '🐉 Dragon brain activated...',
  '🎨 Masterpiece in the making...',
  '🎼 Composing the answer...',
  '🎪 Three rings of computation...',
  '🎭 Theatrical display of logic...',
  '🌺 Blooming with solutions...',
  '🎯 Bulls-eye imminent...',
  '🔬 Conducting an experiment...',
  '🏆 Championship-level thinking...',
  '🎾 Bouncing ideas around...',
  '🎷 Playing the right notes...',
  '🍕 Cooking up a solution...',
  '🍰 This is gonna be sweet...',
  '🎰 Rolling the computational dice...',
  '🧊 Keeping it cool while I work...',
  '🌙 The moon is bright on this problem...',
  '☀️ Sunny disposition, serious processing...',
  '⛈️ Storm of synapses firing...',
  '🌸 Thoughtfully blooming...',
  '🎸 Playing the problem like a guitar...',
  '🎹 Keys are flying under my fingers...',
  '🥁 Beating out the rhythm...',
  '🎺 Trumpeting through this...',
  '🪕 Plucking the solution strings...',
  '🎻 Being classical about this...',
  '🥊 Punching through the problem...',
  '🏊 Swimming through the data...',
  '🧘 Zen mode: activated...',
  '🤸 Acrobatic calculations...',
  '🧗 Scaling the heights...',
  '🚴 Pedaling furiously to the answer...',
  '🏇 Galloping toward a solution...',
  '🦘 Bouncing with energy...',
  '🦁 Roaring through this computation...',
  '🐋 Diving deep into the problem...',
  '🦈 Circling in on the answer...',
  '🦅 Soaring through the data...',
  '🦉 Wise contemplation in progress...',
  '🦜 Repeating my thoughts until they make sense...',
  '🐢 Steady and methodical approach...',
  '🐇 Hop-skip-jumping to the answer...',
  '🐝 Busy as a bee with this one...',
  '🐛 Crawling through the logic...',
  '🕷️ Spinning a web of solutions...',
  '🐙 Many arms on this problem...',
  '🦑 Squirting out some ink-spired ideas...',
  '💭 Clouds of thought gathering...',
  '💥 Explosion of brilliance incoming...',
  '✨ Sprinkling some magic on this...',
  '🎇 Fireworks of ideas...',
  '🌟 Reaching for the stars...',
  '⚡ Electric current of thought...',
];

// Helper to get a random thinking message with optional turn number
export function getRandomThinkingMessage(turnNumber?: number): string {
  const message = THINKING_MESSAGES[
    Math.floor(Math.random() * THINKING_MESSAGES.length)
  ];
  if (turnNumber !== undefined) {
    return `${message} [turn ${turnNumber}]`;
  }
  return message;
}

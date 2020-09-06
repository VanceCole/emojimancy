import * as fs from 'fs';
import emojerators from './data/emojerators.js';
import commandjis from './data/commandjis.js';

let out = '';

out += `
# ✨ Emojimancy 🧙: 🤷 + 🤖 / 💩 = ❓

Emojimancy is a pathway to many abilities, some considered to be unnatural.

# 💩 Fudging rolls & outright rigging rolls 🤥

Always wanted to fudge your rolls a bit? Try the ⬆️ emojerator to get a plus one to all your dice!

Want to outright rig the roll? Use the 🥳 to maximize all dice, or the 💩 to roll all ones!

# 🤫 Sneakymoji 🐁

Don't want your players knowing you are wielding the awesome powers of Emojimancy against them? Just use your choice of Sneakymoji and they'll never suspect a thing.

# 🕹️ Commandjis

Commandjis are powerful macro like commands you can use! Commandji are, of course, denoted by the 🩹 slash operator.

Example: \`🩹💡\` Open token light picker

`;

const cmds = Object.keys(commandjis).map((emoji) => {
  const { note, aliases, example } = commandjis[emoji];
  const alia = aliases.map((alias) => alias).join();
  const line = `${emoji}: ${note}\nAliases: [${alia}]\nExample: ${example}`;
  return line;
});

out += cmds.join('\n\n');

out += `

# Emojerators

`;

const list = Object.keys(emojerators).map((emoji) => {
  const { note, aliases, example } = emojerators[emoji];
  const alia = aliases.map((alias) => alias).join();
  const line = `${emoji}: ${note}\nAliases: [${alia}]\nExample: ${example}`;
  return line;
});

out += list.join('\n\n');

out += `

## Credits
- @lordzeel for reporting a very strange bug which caused me to investigate the beauty of math + emoji and make this abomination
`;

fs.writeFile('README.md', out, () => {});

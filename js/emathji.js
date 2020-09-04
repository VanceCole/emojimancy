import { emojerators } from './emoji.js';
import { PATH, log } from './helpers.js';

Hooks.once('ready', () => {
  log('🤷 + 🤖 / 💩 = ❓', true);
  CONFIG.debug.emathji = true;
});

Hooks.on('preCreateChatMessage', intercept);

function test(formula, emoji, data) {
  let f = formula;
  data.aliases.forEach((alias) => {
    f = f.replace(`/${alias}/g`, emoji);
  });
  if (f.indexOf(emoji) === -1) {
    log(`${emoji} ? ❌`);
  }
  else {
    log(`${emoji} ? ✔️`);
    f = data.parse(f);
  }
  return f;
}

function emojerate(formula) {
  log(`Emojerating ${formula}`);
  let f = formula;
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of Object.entries(emojerators)) {
    f = test(f, k, v);
  }
  return f;
}

function intercept(data, options, user) {
  if (!data.type === CONST.CHAT_MESSAGE_TYPES.ROLL) return;
  const oldRoll = JSON.parse(data.roll);
  const { formula } = oldRoll;
  const newFormula = emojerate(formula);
  const nRoll = new Roll(newFormula).roll();
  nRoll.formula = `${formula} [${newFormula}]`;
  data.content = `${formula} [${newFormula}]`;
  data.roll = JSON.stringify(nRoll);
}

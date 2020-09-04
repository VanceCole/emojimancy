import Emathji from '../classes/Emathji.js';
import { PATH, log } from './helpers.js';

window.Emathji = Emathji;

/**
 * ⛺️ 📪 👃 🗺 🍚 😝 💥 🐈 🎥
 */
Hooks.once('ready', () => {
  log('🤷 + 🤖 / 💩 = ❓', true);
  CONFIG.debug.emathji = true;
});

// Intercept chat messages and check for Emathji
Hooks.on('preCreateChatMessage', chatIntercept);

/**
 * Patch core Roll to check for Emathji
 */
// eslint-disable-next-line camelcase
const og_replaceData = Roll.prototype._replaceData;
Roll.prototype._replaceData = function(formula) {
  let f = formula;
  if (Emathji.hasUnicode(formula)) f = Emathji.emojerate(formula);
  return og_replaceData.call(this, f);
};

/**
 * Callback for Hook preCreateChatMessage
 * @param {Object} data
 * @param {?}      options
 * @param {?}      user
 */
function chatIntercept(data, options, user) {
  if (data.type !== CONST.CHAT_MESSAGE_TYPES.ROLL) return;
  const oldRoll = JSON.parse(data.roll);
  console.log(data);
  Emathji.hasStealtherator(data.content);
}

Hooks.on('renderChatMessage', (log, html, data) => {
  html.remove();
});

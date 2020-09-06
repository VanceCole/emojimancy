import Emathji from '../classes/Emathji.js';
import config from '../data/config.js';
import { log } from './helpers.js';

const emathji = new Emathji();
window.Emathji = Emathji;
window.emathji = emathji;

Hooks.once('init', () => {
  // Register settings
  config.forEach((cfg) => {
    game.settings.register('emojimancy', cfg.name, cfg.data);
  });
});

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
Roll.prototype._replaceData = function _replaceData(formula) {
  let f = formula;
  log('🎲 detected, engage the 🙉🩹');
  if (emathji.hasAnyMoji(formula)) f = emathji.demojerate(formula);
  log('🙈🩹 complete ❗');
  return og_replaceData.call(this, f);
};

/**
 * Callback for Hook preCreateChatMessage
 * @param {Object} data
 * @param {?}      options
 * @param {?}      user
 */// eslint-disable-next-line no-unused-vars
function chatIntercept(data, options, user) {
  if (data.type === CONST.CHAT_MESSAGE_TYPES.ROLL) emathji.handleChatRoll(data);
  if ([CONST.CHAT_MESSAGE_TYPES.IC, CONST.CHAT_MESSAGE_TYPES.OOC].includes(data.type)) {
    emathji.handleChat(data);
  }
}

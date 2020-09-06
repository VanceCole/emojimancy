import Emathji from '../classes/Emathji.js';
import { log } from './helpers.js';

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
Roll.prototype._replaceData = function _replaceData(formula) {
  let f = formula;
  log('🎲 detected, engage the 🙉🩹');
  if (Emathji.hasAnyMoji(formula)) f = Emathji.demojerate(formula);
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
  if (data.type === CONST.CHAT_MESSAGE_TYPES.ROLL) handleChatRoll(data);
}

function handleChatRoll(data) {
  log('Intercepting ChatRoll 🚀');
  // Check if roll has any emoji, if not just skip
  const moji = Emathji.hasAnyMoji(data.content);
  if (!moji) return;

  // Get stored roll
  let roll = JSON.parse(data.roll);
  // Run any post filters
  roll = Emathji.postMojerate(roll, data.content);
  // Check if roll has any sneakymoji
  const sneaky = Emathji.hasSneakymoji(data.content);
  if (!sneaky) {
    if (data.flavor) data.flavor += `\n[${data.content}]`;
    else data.flavor = `[${Emathji.deAlias(data.content)}]`;
  }
  data.roll = JSON.stringify(roll);
  log('ChatRoll Handled 😏');
}

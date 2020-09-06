/* eslint-disable class-methods-use-this */
import Emojerators from '../data/emojerators.js';
import Commandjis from '../data/commandjis.js';
import { log, Helpers } from '../js/helpers.js';

const MOJI_TYPES = {
  EMOJERATORS: 0,
  COMMANDJIS: 1,
};

export default class Emathji {
  constructor() {
    // Load default emojerators and commandjis
    this.emojerators = Emojerators;
    this.commandjis = Commandjis;
    this.Helpers = Helpers;
  }

  /**
   * Tests if string has a given emoji and if so parses it
   * @param {String} formula  String to be checked
   * @param {String} emoji    The emoji to seek
   * @param {Object} data     The data for the emoji in question
   */
  parseEmoji(formula, emoji) {
    let f = formula;
    if (f.indexOf(emoji) !== -1) {
      log(`${emoji} ? ✔️`);
      f = this.emojerators[emoji].parse(f);
    }
    return f;
  }

  /**
   * Checks each commandji and applies any parse operations
   * @param {String} string The command string
   * @param {Object} data   Chat Data object
   */
  parseCommandji(string, data) {
    let s = this.deAlias(string, 1);
    Object.keys(this.commandjis).forEach((emoji) => {
      if (string.startsWith(emoji)) {
        const { parse } = this.commandjis[emoji];
        log(`Commandji: ${emoji} ✔️`);
        s = parse(s, data);
      }
    });
    return s;
  }

  /**
   * Checks if given chat message is a commandji
   * @param {String} content Chat message content string
   */
  isCommandji(content) {
    let is = false;
    ['🩹', ':adhesive_bandage:'].some((k) => {
      if (content.startsWith(k)) {
        log('🩹 ? ✔️');
        is = content.substring(k.length);
        return true;
      }
      return false;
    });
    return is;
  }

  /**
   * Checks if chat data is a commandji and if so passes to parser
   * @param {Object} data Chat data object
   */
  handleChat(data) {
    const string = this.isCommandji(data.content);
    if (string) this.parseCommandji(string, data);
  }

  /**
   * Callback for chat hook to check and handle roll type events
   * @param {Object} data Chat data
   */
  handleChatRoll(data) {
    log('Intercepting ChatRoll 🚀');
    // Check if roll has any emoji, if not just skip
    const moji = this.hasAnyMoji(data.content);
    if (!moji) return;
    // Get stored roll
    let roll = JSON.parse(data.roll);
    // Run any post filters
    roll = this.postMojerate(roll, data.content);
    // Check if roll has any sneakymoji
    const sneaky = this.hasSneakymoji(data.content);
    if (!sneaky) {
      if (data.flavor) data.flavor += `\n[${data.content}]`;
      else data.flavor = `[${this.deAlias(data.content)}]`;
    }
    data.roll = JSON.stringify(roll);
    log('ChatRoll Handled 😏');
  }

  /**
   * Converts any any aliases to the one true name of the emoji
   * @param {String} formula   The formula to be dealiased
   * @param {String} truename  The one true name of the emoji
   * @param {Array}  aliases   List of aliases to be tested
   * @returns {String} deAliased string
   */
  deAlias(formula, type = 0) {
    log(`deAliasing: ${formula}`);
    let f = formula;
    let list;
    if (type === MOJI_TYPES.EMOJERATORS) list = this.emojerators;
    else if (type === MOJI_TYPES.COMMANDJIS) list = this.commandjis;
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(list).forEach((emoji) => {
      const { aliases } = list[emoji];
      aliases.forEach((alias) => {
        f = f.replace(new RegExp(alias, 'g'), emoji);
      });
    });
    log(`deAliasing complete: ${f}`);
    return f;
  }

  /**
   * Parses formula strings to check for and perform emojifications
   * @param {String}   formula    A dice formula
   * @returns {String} Demojified version of formula
   */
  demojerate(formula) {
    log(`Demojerating ${formula}`);
    let f = formula;
    f = this.deAlias(f);
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(this.emojerators).forEach((emoji) => {
      f = this.parseEmoji(f, emoji);
    });
    log(`Demojeration complete: ${f}`);
    return f;
  }

  /**
   * Parses formula strings to check for and perform emojifications
   * @param {Object}   roll       roll object from foundry
   * @param {String}   formula    A dice formula
   * @returns {Object} postMojerated roll object
   */
  postMojerate(roll, formula) {
    log(`postMojerating: ${formula}`);
    const f = this.deAlias(formula);
    Object.keys(this.emojerators).forEach((emoji) => {
      // Check if given emoji has a post function
      if (typeof (this.emojerators[emoji].post) === 'function') {
        if (this.hasMoji(f, emoji)) {
          log(`Applying ${emoji} postMojeration`);
          roll = this.emojerators[emoji].post(this, roll, formula);
        }
      }
    });
    log(`postMojeration complete: ${formula}`);
    return roll;
  }

  /**
   * Checks if formula contains any stealtherators
   * @param {String} formula   The formula to be tested
   * @returns {Boolean}        Returns true if string contains at least 1 sneakymoji
   */
  hasSneakymoji(formula) {
    log(`Testing sneakymoji in ${formula}`);
    // eslint-disable-next-line no-restricted-syntax
    return Object.values(this.emojerators['🤫'].aliases).some((emoji) => this.hasMoji(formula, emoji));
  }

  /**
   * Checks if formula has a specific emoji
   * @returns {Boolean}
   */
  hasMoji(formula, emoji) {
    if (formula.indexOf(emoji) !== -1) {
      log(`${emoji} ? ✔️`);
      return true;
    }
    return false;
  }

  /**
   * Sets the results of the given target dice type (fx. d20) to the provided value
   * @param {Object}  roll   The roll object from foundry
   * @param {Integer} target The type of dice to set
   * @param {Integer} value  The value to set the result of each dice to, if true, maximizes
   */
  dieSet(roll, target, value) {
    roll.dice.forEach((die) => {
      if (target === true || die.faces === target) {
        die.rolls.forEach((r) => {
          if (value === true) r.roll = die.faces;
          else r.roll = value;
        });
      }
    });
    return this.retotal(roll);
  }

  /**
   * Adjust the dice by the given amount, within the bounds of the die type
   * @param {Object}  roll   The roll object from foundry
   * @param {Integer} target The type of dice to fudge
   * @param {Integer} amount The amount to fudge by
   */
  fudge(roll, target, amount) {
    roll.dice.forEach((die) => {
      if (target === true || die.faces === target) {
        die.rolls.forEach((r) => {
          if (r.roll + amount > die.faces) r.roll = die.faces;
          else if (r.roll + amount < 1) r.roll = 1;
          else r.roll += amount;
        });
      }
    });
    return this.retotal(roll);
  }

  /**
   * Recalculates an altered rolls totals
   * @param {Object}  roll   The roll object from foundry
   */
  retotal(roll) {
    let sum = 0;
    roll.dice.forEach((die) => {
      die.rolls.forEach((r) => {
        if (!r.discarded) sum += r.roll;
      });
    });
    roll.total = sum;
    roll.result = `${sum}`;
    return roll;
  }

  /**
   * Sets the results of the given target dice type to the minimum possible
   * @param {Object}  roll   The roll object from foundry
   */
  minimize(roll) {
    return this.dieSet(roll, true, 1);
  }

  /**
   * Sets the results of the given target dice type to the maximum possible
   * @param {Object}  roll   The roll object from foundry
   */
  maximize(roll) {
    return this.dieSet(roll, true, true);
  }

  /**
   * Quick'n'dirty check if a string is likely to contain emoji
   * so we don't waste time running full search when it doesn't
   * @param {String} text  The string to test
   * @returns {Boolean}    True if likely to have emoji
   */
  hasAnyMoji(text) {
    // eslint-disable-next-line no-control-regex
    const unicds = /[^\u0000-\u00ff]/.test(text);
    const colons = /(:.*):/gi.test(text);
    if (unicds || colons) {
      log(`hasAnyMoji? ${text} ✔️`);
      return true;
    }
    log(`hasAnyMoji? ${text} ❌`);
    return false;
  }
}

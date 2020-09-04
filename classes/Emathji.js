import { log } from '../js/helpers.js';
import { emojerators, sneakymoji } from '../data/emoji.js';

export default class Emathji {
  /**
   * Tests if string has a given emoji and if so parses it
   * @param {String} formula  String to be checked
   * @param {String} emoji    The emoji to seek
   * @param {Object} data     The data for the emoji in question
   */
  static hasEmoji(formula, emoji) {
    const { aliases, parse } = emojerators[emoji];
    let f = Emathji.deAlias(formula, emoji, aliases);
    if (f.indexOf(emoji) === -1) {
      log(`${emoji} ? ❌`);
    }
    else {
      log(`${emoji} ? ✔️`);
      f = parse(f);
    }
    return f;
  }

  /**
   * Parses formula strings to check for and perform emojifications
   * @param {String}   formula    A dice formula
   * @returns {String} Demojified version of formula
   */
  static demojerate(formula) {
    log(`Demojerating ${formula}`);
    let f = formula;
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(emojerators).forEach((emoji) => {
      f = Emathji.hasEmoji(f, emoji);
    });
    log(`Demojeration complete: ${f}`);
    return f;
  }

  /**
   * Checks if formula contains any stealtherators
   * @param {String} formula   The formula to be tested
   * @returns {Boolean}        Returns true if string contains at least 1 sneakymoji
   */
  static hasSneakymoji(formula) {
    log(`Testing sneakymoji in ${formula}`);
    // eslint-disable-next-line no-restricted-syntax
    return Object.values(sneakymoji).some((emoji) => {
      if (formula.indexOf(emoji) !== -1) {
        log(`${emoji} ? ✔️`);
        return true;
      }
      return false;
    });
  }

  /**
   * Quick'n'dirty check if a string is likely to contain emoji
   * so we don't waste time running full search when it doesn't
   * @param {String} text  The string to test
   * @returns {Boolean}    True if likely to have emoji
   */
  static hasUnicode(text) {
    // eslint-disable-next-line no-control-regex
    return /[^\u0000-\u00ff]/.test(text);
  }

  /**
   * Converts any any aliases to the one true name of the emoji
   * @param {String} formula   The formula to be dealiased
   * @param {String} truename  The one true name of the emoji
   * @param {Array}  aliases   List of aliases to be tested
   * @returns {String} deAliased string
   */
  static deAlias(formula, truename, aliases) {
    let f = formula;
    aliases.forEach((alias) => {
      f = f.replace(`/${alias}/g`, truename);
    });
    return f;
  }
}

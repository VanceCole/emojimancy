import { log } from '../js/helpers.js';
import emojerators from '../data/emoji.js';

export default class Emathji {
  /**
   * Tests if string has a given emoji and if so parses it
   * @param {String} formula  String to be checked
   * @param {String} emoji    The emoji to seek
   * @param {Object} data     The data for the emoji in question
   */
  static parseEmoji(formula, emoji) {
    let f = formula;
    const { parse } = emojerators[emoji];
    if (f.indexOf(emoji) !== -1) {
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
    f = Emathji.deAlias(f);
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(emojerators).forEach((emoji) => {
      f = Emathji.parseEmoji(f, emoji);
    });
    log(`Demojeration complete: ${f}`);
    return f;
  }

  static postMojerate(formula, value) {
    log(`postMojerating: ${value}`);
    let v = value;
    const f = Emathji.deAlias(formula);
    Object.keys(emojerators).forEach((emoji) => {
      // Check if given emoji has a post function
      if (typeof (emojerators[emoji].post) === 'function') {
        if (Emathji.hasMoji(f, emoji)) {
          log(`Applying ${emoji} postMojeration`);
          v = emojerators[emoji].post(v);
        }
      }
    });
    log(`postMojeration complete: ${v}`);
    return v;
  }

  /**
   * Checks if formula contains any stealtherators
   * @param {String} formula   The formula to be tested
   * @returns {Boolean}        Returns true if string contains at least 1 sneakymoji
   */
  static hasSneakymoji(formula) {
    log(`Testing sneakymoji in ${formula}`);
    // eslint-disable-next-line no-restricted-syntax
    return Object.values(emojerators['🤫'].aliases).some((emoji) => Emathji.hasMoji(formula, emoji));
  }

  /**
   * Checks if formula has a specific emoji
   */
  static hasMoji(formula, emoji) {
    if (formula.indexOf(emoji) !== -1) {
      log(`${emoji} ? ✔️`);
      return true;
    }
    return false;
  }

  /**
   * Quick'n'dirty check if a string is likely to contain emoji
   * so we don't waste time running full search when it doesn't
   * @param {String} text  The string to test
   * @returns {Boolean}    True if likely to have emoji
   */
  static hasAnyMoji(text) {
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

  /**
   * Converts any any aliases to the one true name of the emoji
   * @param {String} formula   The formula to be dealiased
   * @param {String} truename  The one true name of the emoji
   * @param {Array}  aliases   List of aliases to be tested
   * @returns {String} deAliased string
   */
  static deAlias(formula) {
    log(`deAliasing: ${formula}`);
    let f = formula;
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(emojerators).forEach((emoji) => {
      const { aliases } = emojerators[emoji];
      aliases.forEach((alias) => {
        f = f.replace(new RegExp(alias, 'g'), emoji);
      });
    });
    log(`deAliasing complete: ${f}`);
    return f;
  }
}

/* eslint-disable class-methods-use-this */
import Emojerators from '../data/emojerators.js';
import { log } from '../js/helpers.js';

export default class Emathji {
  constructor() {
    this.emojerators = Emojerators;
  }

  /**
   * Tests if string has a given emoji and if so parses it
   * @param {String} formula  String to be checked
   * @param {String} emoji    The emoji to seek
   * @param {Object} data     The data for the emoji in question
   */
  parseEmoji(formula, emoji) {
    let f = formula;
    const { parse } = this.emojerators[emoji];
    if (f.indexOf(emoji) !== -1) {
      log(`${emoji} ? ✔️`);
      f = parse(f);
    }
    return f;
  }

  /**
   * Converts any any aliases to the one true name of the emoji
   * @param {String} formula   The formula to be dealiased
   * @param {String} truename  The one true name of the emoji
   * @param {Array}  aliases   List of aliases to be tested
   * @returns {String} deAliased string
   */
  deAlias(formula) {
    log(`deAliasing: ${formula}`);
    let f = formula;
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(this.emojerators).forEach((emoji) => {
      const { aliases } = this.emojerators[emoji];
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
   * @param {Integer} value  The value to set the result of each dice to
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

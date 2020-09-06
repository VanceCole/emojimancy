import { log } from '../js/helpers.js';

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

  /**
   * Parses formula strings to check for and perform emojifications
   * @param {Object}   roll       roll object from foundry
   * @param {String}   formula    A dice formula
   * @returns {Object} postMojerated roll object
   */
  static postMojerate(roll, formula) {
    log(`postMojerating: ${formula}`);
    const f = Emathji.deAlias(formula);
    Object.keys(emojerators).forEach((emoji) => {
      // Check if given emoji has a post function
      if (typeof (emojerators[emoji].post) === 'function') {
        if (Emathji.hasMoji(f, emoji)) {
          log(`Applying ${emoji} postMojeration`);
          roll = emojerators[emoji].post(roll, formula);
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
  static hasSneakymoji(formula) {
    log(`Testing sneakymoji in ${formula}`);
    // eslint-disable-next-line no-restricted-syntax
    return Object.values(emojerators['🤫'].aliases).some((emoji) => Emathji.hasMoji(formula, emoji));
  }

  /**
   * Checks if formula has a specific emoji
   * @returns {Boolean}
   */
  static hasMoji(formula, emoji) {
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
  static dieSet(roll, target, value) {
    roll.dice.forEach((die) => {
      if (target === true || die.faces === target) {
        die.rolls.forEach((r) => {
          if (value === true) r.roll = die.faces;
          else r.roll = value;
        });
      }
    });
    return Emathji.retotal(roll);
  }

  /**
   * Recalculates an altered rolls totals
   * @param {Object}  roll   The roll object from foundry
   */
  static retotal(roll) {
    let sum = 0;
    roll.dice.forEach((die) => {
      die.rolls.forEach((r) => {
        if (!r.discarded) sum += r.roll;
      });
    });
    roll.total = sum;
    roll.result = `${sum}`;
  }

  /**
   * Sets the results of the given target dice type to the minimum possible
   * @param {Object}  roll   The roll object from foundry
   */
  static minimize(roll) {
    return Emathji.dieSet(roll, true, 1);
  }

  /**
   * Sets the results of the given target dice type to the maximum possible
   * @param {Object}  roll   The roll object from foundry
   */
  static maximize(roll) {
    return Emathji.dieSet(roll, true, true);
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

export const emojerators = {
  // Stealthymojis
  '🤫': {
    aliases: [
      '🤫',
      ':shush:',
      ':shushing_face:',
      '🐁',
      ':mouse:',
      '🤥',
      ':lying_face:',
    ],
    note: 'Stealthymojis: Don\'t want your players knowing you are wielding the awesome powers of Emojimancy against them? Just use your choice of Sneakymoji and they\'ll never suspect a thing.',
    example: '`1⭐1` == `1+1`',
    parse: (formula) => formula.replace(/🤫/g, ''),
  },
  // Emojerators
  '⭐': {
    aliases: ['🌟', ':star:', ':star2:'],
    note: 'Alias for `*`',
    example: '`1⭐1` == `1+1`',
    parse: (formula) => formula.replace(/⭐/g, '*'),
  },
  '🔪': {
    aliases: [':knife:', '🗡️', ':dagger:', '🪓', ':axe:', '🩹', ':adhesive_bandage'],
    note: 'Alias for `/`',
    example: '`1🔪1` == `1/1`',
    parse: (formula) => formula.replace(/🔪/g, '/'),
  },
  '➕': {
    aliases: [':plus:', '💍', ':ring:'],
    note: 'Alias for `+`',
    example: '`1➕1` == `1+1`',
    parse: (formula) => formula.replace(/➕/g, '+'),
  },
  '➖': {
    aliases: [':minus:', '−', '🚬', ':cigarette'],
    note: 'Alias for `-`',
    example: '`1➖1` == `1-1`',
    parse: (formula) => formula.replace(/➖/g, '-'),
  },
  '⬆️': {
    aliases: [':up_arrow:'],
    note: 'Alias for `+1`',
    example: '`1d6⬆️` == `1d6+1`',
    parse: (formula) => formula.replace(/⬆️/g, '+1'),
  },
  '⬇️': {
    aliases: [':down_arrow:'],
    note: 'Alias for `-1`',
    example: '`1d6⬇️` == `1d6-1`',
    parse: (formula) => formula.replace(/⬇️/g, '-1'),
  },
  // Dice modimoji
  '🙂': {
    aliases: [':slight_smile:'],
    note: 'Want to drop one of those pesky 💩 rolls? Look no further than this 🅰️rcane sigil',
    example: '`1d20🙂` == `1d20dl`',
    parse: (formula) => formula.replace(/🙂/g, 'dl'),
  },
  '🙁': {
    aliases: [':slight_frown:'],
    note: 'The opposite of the ⬆️, of course',
    example: '`1d20🙁` == `1d20dh`',
    parse: (formula) => formula.replace(/🙁/g, 'dh'),
  },
  // Fudgymoji
  '💩': {
    aliases: [':poop:'],
    note: 'Override for `1`',
    example: '`3d20💩` == `3`',
    parse: (formula) => formula.replace(/💩/g, ''),
    post: (roll) => Emathji.minimize(roll),
  },
  '🥳': {
    aliases: [':partying_face:'],
    note: 'Override for `20`',
    example: '`3d20🥳` == `60`',
    parse: (formula) => formula.replace(/🥳/g, ''),
    post: (roll) => Emathji.maximize(roll),
  },
  // Alimoji
  '🍆': {
    aliases: [':eggplant:'],
    note: 'As should be immediately obvious, the 🍆 represents the `D`.',
    example: '`1🍆6` == `1D6`',
    parse: (formula) => formula.replace(/🍆/g, 'D'),
  },
  // Numeric Emoji
  '🐶': {
    aliases: ['💯', '🦮', '🐕', '🐩', '🐕‍🦺', '🐺', ':dog:', ':wolf:', ':poodle:', ':dog2:'],
    note: 'As the goodest of ♂️ & ♀️, 🐕 are 💯',
    example: '`/r 1d🐶` == `1d100`',
    parse: (formula) => formula.replace(/🐶/g, '100'),
  },
  '🐱': {
    aliases: ['🐈', ':cat:', ':cat2:'],
    note: '🐈 are OK too, I rate them a 20',
    example: '`/r 1d🐱` == `1d20`',
    parse: (formula) => formula.replace(/🐱/g, '20'),
  },
  '🎸': {
    aliases: [':guitar:'],
    note: '🎸 go to `11`, of course.',
    example: '`/r 1d🎸` == `1d11`',
    parse: (formula) => formula.replace(/🎸/g, '11'),
  },
  '🥔': {
    aliases: [':potato:', '🥌', ':curling_stone:'],
    note: 'Lame `1`s',
    example: '`/r 🥔d20` == `1d20`',
    parse: (formula) => formula.replace(/🥔/g, '1'),
  },
  // Wild Emojimancy
  '🤷': {
    aliases: [':shrug:'],
    note: `Meh? Unleash the power of the 🤷 to be thoroughly whelmed
    - 30% Chance to ignore the rest of function
     - 30% Chance to be become + or -
     -  5% Chance to become *
     -  4% Chance to become /
     -  1% Chance to become ^
    `,
    example: '`1d20🤷5` == `1d20?`',
    parse: (formula) => {
      const parts = formula.split('🤷');
      let newFormula = '';
      for (let i = 0; i < parts.length; i++) {
        newFormula += parts[i];
        if (i === parts.length - 1) return newFormula;
        const r = Math.random() * 100;
        let op;
        if (r < 30) return newFormula;
        if (r < 60) op = '-';
        else if (r < 90) op = '+';
        else if (r < 95) op = '*';
        else if (r < 99) op = '/';
        else op = '^';
        newFormula += op;
      }
      return newFormula;
    },
  },
};

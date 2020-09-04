// import { replaceAll, replaceAliases } from './helpers.js';

export const emojerators = {
  '🙂': {
    name: 'slight_smile',
    aliases: [':slight_smile:'],
    // Alias for dl
    parse: (formula) => formula.replace(/🙂/g, 'dl'),
  },
  '🙁': {
    name: 'slight_frown',
    aliases: [':slight_frown:'],
    // Alias for dh
    parse: (formula) => formula.replace(/🙁/g, 'dh'),
  },
  '💩': {
    name: 'poop',
    aliases: [':poop:'],
    // Always 1
    parse: () => '1',
  },
  '🥳': {
    name: 'partying_face',
    aliases: [':partying_face:'],
    // Always 20
    parse: () => '20',
  },
  '🍆': {
    name: 'eggplant',
    aliases: [':eggplant:'],
    // Alias for the D
    parse: (formula) => formula.replace(/🍆/g, 'D'),
  },
  '🥔': {
    name: 'potato',
    aliases: [':potato:'],
    // Alias for 1
    parse: (formula) => formula.replace(/🥔/g, '1'),
  },
  '🎸': {
    name: 'guitar',
    aliases: [':guitar:'],
    // Alias for 11
    parse: (formula) => formula.replace(/🎸/g, '11'),
  },
  '🐱': {
    name: 'cat',
    aliases: ['🐈', ':cat:', ':cat2:'],
    // Alias for 20
    parse: (formula) => formula.replace(/🐱/g, '20'),
  },
  '🐶': {
    name: 'dog',
    aliases: ['💯', '🦮', '🐕', '🐩', '🐕‍🦺', '🐺', ':dog:', ':wolf:', ':poodle:', ':dog2:'],
    // Alias for 100
    parse: (formula) => formula.replace(/🐶/g, '100'),
  },
  '⏰': {
    name: 'clock',
    aliases: [':clock:', '⏰', ':clock2:', '🕰️'],
    parse: () => '{1d12, 1d60, 1d2}',
    post: (roll) => {},
  },
  '🤷': {
    name: 'shrug',
    aliases: [':shrug:'],
    /**
     * 30% Chance to be become + or -
     * 30% Chance to ignore the rest of function
     *  5% Chance to become *
     *  4% Chance to become /
     *  1% Chance to become ^
     */
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

export const stealtherators = [
  '🤫',
  ':shush:',
  ':shushing_face:',
  '🐁',
  ':mouse:',
];

export default {
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
    note: 'Minimize all rolls',
    example: '`3d20💩` == `3`',
    parse: (formula) => formula.replace(/💩/g, ''),
    post: (emathji, roll) => emathji.minimize(roll),
  },
  '🥳': {
    aliases: [':partying_face:'],
    note: 'Maximize all rolls',
    example: '`3d20🥳` == `60`',
    parse: (formula) => formula.replace(/🥳/g, ''),
    post: (emathji, roll) => emathji.maximize(roll),
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

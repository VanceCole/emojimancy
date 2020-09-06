export default {
  // Stealthymojis
  '🤫': {
    aliases: [
      '🤫',
      ':shush:',
      ':shushing_face:',
      '🐁',
      ':mouse:',
      '🐀',
      ':rat:',
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
  // Dice modimoji
  '🙂': {
    aliases: [':slight_smile:'],
    note: 'Want to drop one of those pesky 💩 rolls? Roll with 🅰️dvantage',
    example: '`1d20🙂` == `1d20dl`',
    parse: (formula) => formula.replace(/🙂/g, 'dl'),
  },
  '🙁': {
    aliases: [':slight_frown:'],
    note: 'Embrace some dis🅰️dvantage',
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
  '⬆️': {
    aliases: [':up_arrow:'],
    note: 'Fudge all dice +1',
    example: '`1d6⬆️` == `1d6+1`',
    parse: (formula) => formula.replace(/⬆️/g, ''),
    post: (emathji, roll) => emathji.fudge(roll, true, 1),
  },
  '⬇️': {
    aliases: [':down_arrow:'],
    note: 'Fudge all dice -1',
    example: '`1d6⬇️` == `1d6-1`',
    parse: (formula) => formula.replace(/⬇️/g, ''),
    post: (emathji, roll) => emathji.fudge(roll, true, -1),
  },
  // Alimoji
  '🍆': {
    aliases: [':eggplant:'],
    note: 'As should be immediately obvious, the 🍆 represents the `D`.',
    example: '`1🍆6` == `1D6`',
    parse: (formula) => formula.replace(/🍆/g, 'D'),
  },
  // Numeric Emoji
  '🌿': {
    aliases: [':herb:'],
    note: '🌿 are sources of 420 important nutrients',
    example: '`/r 1d🌿` == `1d420`',
    parse: (formula) => formula.replace(/🌿/g, '420'),
  },
  // Numeric Emoji
  '🐶': {
    aliases: ['💯', '🦮', '🐕', '🐩', '🐕‍🦺', '🐺', ':dog:', ':wolf:', ':poodle:', ':dog2:'],
    note: 'As the goodest of ♂️ & ♀️, 🐕 are 💯',
    example: '`/r 1d🐶` == `1d100`',
    parse: (formula) => formula.replace(/🐶/g, '100'),
  },
  '🦄': {
    aliases: [':unicorn:'],
    note: 'Almost mythical',
    example: '`/r 1d🦄` == `1d21`',
    parse: (formula) => formula.replace(/🦄/g, '21'),
  },
  '🐱': {
    aliases: ['🐈', ':cat:', ':cat2:'],
    note: '🐈 are OK too, I rate them a 20',
    example: '`/r 1d🐱` == `1d20`',
    parse: (formula) => formula.replace(/🐱/g, '20'),
  },
  '🥈': {
    aliases: [':second_place'],
    note: 'So close.',
    example: '`/r 1d🥈` == `1d19`',
    parse: (formula) => formula.replace(/🥈/g, '19'),
  },
  '🥉': {
    aliases: [':third_place'],
    note: 'Not so close.',
    example: '`/r 1d🥈` == `1d18`',
    parse: (formula) => formula.replace(/🥉/g, '18'),
  },
  '🎸': {
    aliases: [':guitar:'],
    note: '🎸 go to `11`, of course.',
    example: '`/r 1d🎸` == `1d11`',
    parse: (formula) => formula.replace(/🎸/g, '11'),
  },
  '🔟': {
    aliases: [':ten:'],
    note: '🔟',
    example: '`/r 1d🔟` == `1d10`',
    parse: (formula) => formula.replace(/🔟/g, '10'),
  },
  '9️⃣': {
    aliases: [':nine:'],
    note: '9️⃣',
    example: '`/r 1d9️⃣` == `1d9`',
    parse: (formula) => formula.replace(/9️⃣/g, '9'),
  },
  '🎱': {
    aliases: ['8️⃣', ':eight:', ':8ball:'],
    note: '🎱',
    example: '`/r 1d🎱` == `1d8`',
    parse: (formula) => formula.replace(/🪐/g, '8'),
  },
  '🍀': {
    aliases: ['7️⃣', ':seven:', ':clover:'],
    note: 'Lucky.',
    example: '`/r 1d🍀` == `1d7`',
    parse: (formula) => formula.replace(/🍀/g, '7'),
  },
  '🪐': {
    aliases: ['6️⃣', ':six:', ':ringed_planet:'],
    note: '6️⃣th rock from the sun',
    example: '`/r 1d6️⃣` == `1d6`',
    parse: (formula) => formula.replace(/6️⃣/g, '6'),
  },
  '5️⃣': {
    aliases: [':five:'],
    note: '5',
    example: '`/r 1d5️⃣` == `1d5`',
    parse: (formula) => formula.replace(/5️⃣/g, '5'),
  },
  '4️⃣': {
    aliases: [':four:'],
    note: '4',
    example: '`/r 1d4️⃣` == `1d4`',
    parse: (formula) => formula.replace(/4️⃣/g, '4'),
  },
  '🔱': {
    aliases: ['3️⃣', ':three:', ':trident:',],
    note: '3️⃣',
    example: '`/r 1d🔱` == `1d3`',
    parse: (formula) => formula.replace(/🔱/g, '3'),
  },
  '💑': {
    aliases: ['2️⃣', ':two:', '👨‍❤️‍👨', '👩‍❤️‍👨', '👩‍❤️‍👩', ':couple:'],
    note: 'A couple',
    example: '`/r 1d💑` == `1d2`',
    parse: (formula) => formula.replace(/💑/g, '2'),
  },
  '🥔': {
    aliases: ['1️⃣', ':one:', ':potato:', '🥌', ':curling_stone:'],
    note: 'Lame `1`s',
    example: '`/r 🥔d20` == `1d20`',
    parse: (formula) => formula.replace(/🥔/g, '1'),
  },
  '0️⃣': {
    aliases: [':zero:'],
    note: '0️⃣',
    example: '`/r 0️⃣d20` == `0d20`',
    parse: (formula) => formula.replace(/0️⃣/g, '0'),
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

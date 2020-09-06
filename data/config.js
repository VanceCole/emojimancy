export default [
  {
    name: 'stealthymoji-permission',
    data: {
      name: '🐁 Stealthymoji',
      hint: 'Who can use Stealthymoji?',
      scope: 'world',
      config: true,
      type: Number,
      default: 3,
      choices: {
        1: '1️⃣ Any Player',
        2: '2️⃣ Trusted Players',
        3: '3️⃣ Assistant GM',
        4: '4️⃣ GM Only',
      },
    },
  },
  {
    name: 'always-stealthy',
    data: {
      name: '🤥 Always stealthy',
      hint: 'Should GM rolls automatically use stealthymoji?',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
  },
  {
    name: 'commandji-permission',
    data: {
      name: '🩹 Commandji',
      hint: 'Who can use commandji?',
      scope: 'world',
      config: true,
      type: Number,
      default: 1,
      choices: {
        1: '1️⃣ Any Player',
        2: '2️⃣ Trusted Players',
        3: '3️⃣ Assistant GM',
        4: '4️⃣ GM Only',
      },
    },
  },
  // {
  //   name: 'emacroji-permission',
  //   data: {
  //     name: '🕹️ Emacroji',
  //     hint: 'Who can use emacroji?',
  //     scope: 'world',
  //     config: true,
  //     type: Number,
  //     default: 1,
  //     choices: {
  //       1: '1️⃣ Any Player',
  //       2: '2️⃣ Trusted Players',
  //       3: '3️⃣ Assistant GM',
  //       4: '4️⃣ GM Only',
  //     },
  //   },
  // },
  {
    name: 'debug',
    data: {
      name: '🐛 Debug mode',
      hint: 'Print debug output to console?',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },
  },
];

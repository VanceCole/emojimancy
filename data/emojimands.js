export default {
  '⏰': {
    aliases: [':clock:', '⏰', ':clock2:', '🕰️'],
    note: 'Generate a 🔀 time of day',
    example: '`/r ⏰` == `/r {1d12, 1d60, 1d2}`',
    parse: () => '{1d12, 1d60, 1d2}',
  },
};

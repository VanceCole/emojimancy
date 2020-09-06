export default {
  '⏰': {
    aliases: [':clock:', ':clock2:', '🕰️'],
    note: 'Generate a 🔀 time of day',
    example: '🩹⏰',
    parse: (string, data) => {
      const r = new Roll('{1d12, 1d60, 1d2}').roll();
      const hour = r.dice[0].total;
      let min = `${r.dice[1].total}`;
      if (min.length === 1) min = `0${min}`;
      const sfx = (r.dice[2].total === 1) ? 'a.m.' : 'p.m.';
      const time = `${hour}:${min} ${sfx}`;
      data.content = time;
      r.toMessage();
    },
  },
  '⏱️': {
    aliases: [':stopwatch:'],
    note: 'Start/Stop Stopwatch',
    example: '🩹⏱️',
    parse: (string, data) => {
      if (emathji.stopwatch === undefined) {
        emathji.stopwatch = performance.now();
        data.content = '⏱️: ✔️';
      }
      else {
        const now = performance.now();
        const time = emathji.msToTime(now - emathji.stopwatch);
        data.content = `⏱️: ${time}`;
        delete emathji.stopwatch;
      }
    },
  },
};

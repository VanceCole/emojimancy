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
  '💡': {
    aliases: [':lightbulb:', '🔦', ':flashlight:'],
    note: 'Start/Stop Stopwatch',
    example: '🩹💡',
    parse: (string, data) => {
      new Dialog({
        title: 'Token Light Picker',
        content: 'Pick the light source the selected token is holding.',
        buttons: {
          none: {
            label: 'None',
            callback: () => emathji.Helpers.tokenUpdate({ dimLight: null, brightLight: null, lightAngle: 360 }),
          },
          torch: {
            label: 'Torch',
            callback: () => emathji.Helpers.tokenUpdate({ dimLight: 40, brightLight: 20, lightAngle: 360 }),
          },
          lamp: {
            label: 'Lamp',
            callback: () => emathji.Helpers.tokenUpdate({ dimLight: 45, brightLight: 15, lightAngle: 360 }),
          },
          bullseye: {
            label: 'Bullseye Lantern',
            callback: () => emathji.Helpers.tokenUpdate({ dimLight: 120, brightLight: 60, lightAngle: 45 }),
          },
          hoodedOpen: {
            label: 'Hooded Lantern (Open)',
            callback: () => emathji.Helpers.tokenUpdate({ dimLight: 60, brightLight: 30, lightAngle: 360 }),
          },
          hoodedClosed: {
            label: 'Hooded Lantern (Closed)',
            callback: () => emathji.Helpers.tokenUpdate({ dimLight: 5, brightLight: 0, lightAngle: 360 }),
          },
        },
      }).render(true);
    },
  },
};

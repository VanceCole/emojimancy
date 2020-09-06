export const PATH = 'modules/emathji';

/**
* Prints formatted console msg if string, otherwise dumps object
* @param data {String | Object} Output to be dumped
* @param force {Boolean}        Log output even if CONFIG.debug.simplefog = false
*/
export function log(data, force = false) {
  if (CONFIG.debug.emathji || force) {
    // eslint-disable-next-line no-console
    if (typeof data === 'string') console.log(`Emathji | ${data}`);
    // eslint-disable-next-line no-console
    else console.log(data);
  }
}

export class Helpers {
  /**
   * Converts ms to human readable amt of time
   * @param {number} s Milliseconds
   */
  static msToTime(s) {
    const pad = (n, z = 2) => (`00${n}`).slice(-z);
    // eslint-disable-next-line no-bitwise
    return `${pad(s / 3.6e6 | 0)}:${pad((s % 3.6e6) / 6e4 | 0)}:${pad((s % 6e4) / 1000 | 0)}`;
  }

  /**
   * Updates all selected tokens with given data
   * @param {Object} data
   */
  static tokenUpdate(data) {
    const updates = canvas.tokens.controlled.map((token) => {
      const newData = duplicate(data);
      newData._id = token.id;
      return newData;
    });
    canvas.tokens.updateMany(updates);
  }
}

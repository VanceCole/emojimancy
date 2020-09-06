const fs = require('fs');
const gulp = require('gulp');
const emojerators = require('./data/emojerators');

gulp.task('doc', async (done) => {
  const list = Object.keys(emojerators).forEach((emoji) => emoji);
  const out = list.join();
  fs.writeFile('emojerators.md', out, done);
});

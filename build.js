import Ora from 'ora';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const spinner = new Ora({
  text: 'Generating build...',
  color: 'green',
});

const entries = [
  webpackConfig({
    filename: 'truncate.min.js',
    minify: true,
    analyze: true,
  }),
  webpackConfig({
    filename: 'truncate.js',
  }),
];

spinner.start();

webpack(entries, (error, stats) => {
  if (error || stats.hasErrors()) {
    if (error) {
      spinner.fail(error.details);
    } else {
      for (const e of stats.toJson().errors) {
        spinner.fail(e);
      }
    }
    spinner.fail('ERRORED! Shit happens... :(\n');
  }

  process.stdout.write('\n\n' + stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n\n');

  spinner.succeed('TruncateJS built with success! \\o/');
});

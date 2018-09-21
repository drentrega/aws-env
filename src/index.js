const args = require('args');

const app = require('./app');
const defaults = require('./concerns/defaults');
const examples = require('./concerns/examples');

const {
  OPTION_NAMESPACE_DESCRIPTION,
  OPTION_OUT_DESCRIPTION,
  OPTION_PREFIX_DESCRIPTION,
  OPTION_REGION_DESCRIPTION,
  OPTION_VERBOSE_DESCRIPTION,
} = require('./concerns/msgs');

args
  .option('namespace', OPTION_NAMESPACE_DESCRIPTION)
  .option('out', OPTION_OUT_DESCRIPTION)
  .option('prefix', OPTION_PREFIX_DESCRIPTION)
  .option('region', OPTION_REGION_DESCRIPTION)
  .option('verbose', OPTION_VERBOSE_DESCRIPTION)

examples.forEach(example => args.example(example.usage, example.description));

let params = args.parse(process.argv, { name: 'aws-env' });

app({ ...defaults, ...params });

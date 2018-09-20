const args = require('args');
const app = require('./app');

const {
  OPTION_REGION_DESCRIPTION,
  OPTION_NAMESPACE_DESCRIPTION,
  OPTION_WITHOUT_EXPORTER_DESCRIPTION,
} = require('./concerns/msgs');

args
  .option('region', OPTION_REGION_DESCRIPTION, 'us-east-1')
  .option('namespace', OPTION_NAMESPACE_DESCRIPTION)
  .option('without-exporter', OPTION_WITHOUT_EXPORTER_DESCRIPTION);

const params = args.parse(process.argv, { name: 'awsenv' });

app(params);

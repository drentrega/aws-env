const fs = require('fs');

const AwsSsm = require('./vendor/aws-ssm');
const { DEFAULT_ERROR_MSG } = require('./concerns/msgs');

module.exports = async (params) => {
  if (params.verbose) console.debug('DEBUG | input', JSON.stringify({ params }));

  if (!params.namespace) {
    console.error(DEFAULT_ERROR_MSG);
    process.exit(1);
  }

  if (typeof params.prefix === 'boolean') params.prefix = '';

  let response = {};
  let parameters = [];
  try {
    do {
      response = await AwsSsm.getParametersByPath(params.region, params.namespace, { NextToken: response.NextToken })
      response.Parameters.reduce((acc, param) => { acc.push(param); return acc; }, parameters);
    } while(response.NextToken)
  } catch (err) { throw err; }

  parameters = parameters
    .map((param) => {
      return {
        key: param.Name.split('/').pop(),
        value: param.Value.trim().replace(/\n/g, ''),
      };
    })
    .map((param) => `${params.prefix}${param.key}=${param.value}`)
    .sort()
    .join('\n');

  if (params.out) {
    return fs.writeFileSync(params.out, parameters)
  }

  process.stdout.write(parameters + "\n");
}

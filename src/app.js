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

  let response = null;
  try {
    response = await AwsSsm.getParametersByPath(params.region, params.namespace)
  } catch (err) {
    throw err;
  }

  const variables = response
    .Parameters
    .reduce((acc, param) => {
      acc.push({
        key: param.Name.split('/').pop(),
        value: param.Value.trim().replace(/\n/g, ''),
      });
      return acc;
    }, [])
    .map((param) => `${params.prefix}${param.key}=${param.value}`)
    .join('\n');

  if (params.out) {
    fs.writeFileSync(params.out, variables)
  }

  process.stdout.write(variables);
}

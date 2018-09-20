const AwsSsm = require('./vendor/aws-ssm');

const { AWSENV_NAMESPACE, AWS_REGION } = process.env;
const { DEFAULT_ERROR_MSG } = require('./concerns/msgs');

module.exports = async (params) => {
  if (!params.namespace && !AWSENV_NAMESPACE) {
    console.error(DEFAULT_ERROR_MSG);
    process.exit(1);
  }

  let response = null;
  try {
    response = await AwsSsm.getParametersByPath(params.region || AWS_REGION, params.namespace || AWSENV_NAMESPACE)
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
    .map((param) => `${params.withoutExporter ? '' : 'export '}${param.key}=${param.value}`);

  process.stdout.write(variables.join('\n'));
}


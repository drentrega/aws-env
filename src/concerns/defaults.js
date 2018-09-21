const {
  AWS_REGION,
  AWSENV_NAMESPACE,
  AWSENV_OUTPUT,
} = process.env;

module.exports = {
  prefix: 'export ',
  region: AWS_REGION || 'us-east-1',
  namespace: AWSENV_NAMESPACE || null,
  out: AWSENV_OUTPUT || null,
};

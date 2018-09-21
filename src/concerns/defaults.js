const { AWSENV_NAMESPACE, AWS_REGION } = process.env;

module.exports = {
  prefix: 'export ',
  region: AWS_REGION || 'us-east-1',
  namespace: AWSENV_NAMESPACE || null,
};

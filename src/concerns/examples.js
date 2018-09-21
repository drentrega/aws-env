module.exports = [
  {
    description: 'Getting variables from my-app',
    usage: 'aws-env -n /production/my-app',
  },
  {
    description: 'Specifying a region to get from',
    usage: 'aws-env -r sa-east-1 -n /production/my-app',
  },
  {
    description: 'Defining another prefix',
    usage: 'aws-env -n /production/my-app --prefix ""',
  },
  {
    description: 'Set max verbosity',
    usage: 'aws-env -n /production/my-app --verbose',
  }
];

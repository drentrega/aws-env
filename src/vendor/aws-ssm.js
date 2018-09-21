const { SSM } = require('aws-sdk');

module.exports = class AwsSsm {
  static getParametersByPath(region, path) {
    return new Promise((resolve, reject) => {
      const ssmOptions = {
        Path: path,
        Recursive: true,
        WithDecryption: true
      };

      const ssm = new SSM({ region });

      ssm.getParametersByPath(ssmOptions, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }
}

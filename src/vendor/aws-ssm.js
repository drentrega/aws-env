const { SSM } = require('aws-sdk');

module.exports = class AwsSsm {
  static getParametersByPath(region, path, options) {
    return new Promise((resolve, reject) => {
      const ssmOptions = {
        Path: path,
        Recursive: true,
        WithDecryption: true,
        ...options,
      };

      const ssm = new SSM({ region });

      ssm.getParametersByPath(ssmOptions, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }
}

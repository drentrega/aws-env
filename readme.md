# @dre/aws-env

A secure way to handle environment variables in Docker with AWS Parameter Store.

This project is just a fork, the original project you can find at [developers-vitta/awsenv](https://github.com/developers-vitta/awsenv).

## Install

```bash
$ npm i -g @dre/aws-env
```

## Usage ways

### Simple

#### First suggestion:

```bash
$ aws-env -r sa-east-1 \
  -n /staging/my-app

# this will result as:
export NODE_ENV=staging
export DB_USERNAME=root
export DB_PASSWORD=mysecretpassword

# so, you may use as:
$ $(aws-env -r sa-east-1 -n /staging/my-app)
```

#### Second suggestion:

With a combination of [dotenv](https://www.npmjs.com/package/dotenv), this is another solution at build stage:

```bash
$ aws-env -p "" \
  -r sa-east-1 \
  -n /staging/my-app

# this will result as:
NODE_ENV=staging
DB_USERNAME=root
DB_PASSWORD=mysecretpassword

# so, you may use as:
$ aws-env -p "" \
  -r sa-east-1 \
  -n /staging/my-app > /app/myapp/.env
$ cat /dre/mysapp/.env
NODE_ENV=staging
DB_USERNAME=root
DB_PASSWORD=mysecretpassword

# or with output option:
$ aws-env -p "" \
  -r sa-east-1 \
  -n /staging/my-app \
  -o /app/myapp/.env
<<<<<<< HEAD
$ cat /app/mysapp/.env
=======
$ cat /dre/mysapp/.env
>>>>>>> master
NODE_ENV=staging
DB_USERNAME=root
DB_PASSWORD=mysecretpassword
```

### Using Environment Variables

```bash
# first you set your variables
export AWS_REGION=sa-east-1
export AWSENV_NAMESPACE=/staging/my-app
export AWSENV_OUT=/app/mysapp/.env

# exec it
$ aws-env

# this will result as:
export NODE_ENV=staging
export DB_USERNAME=root
export DB_PASSWORD=mysecretpassword

# or
$ aws-env --prefix "" \
  --out /app/myapp/.env
$ cat /app/mysapp/.env
NODE_ENV=staging
DB_USERNAME=root
DB_PASSWORD=mysecretpassword
```

## Contribuiting

Fork-it first, and:

```bash
$ npm link
$ aws-env version
```

Make your magic!

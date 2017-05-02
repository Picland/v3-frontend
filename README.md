<p align="center"><a href="https://github.com/feross/standard" target="_blank"><img width="200"src="https://cdn.rawgit.com/feross/standard/master/badge.svg"></a></p>

<p align="center">
  <a href="https://travis-ci.org/muwenzi/Earth"><img src="https://travis-ci.com/muwenzi/Earth.svg?token=65SdnpsEfKTY1qP6fnyh&branch=react-ssr" alt="Build Status"></a>
  <a href="https://github.com/muwenzi/Blog-Webapp/blob/master/LICENSE.md"><img src="https://img.shields.io/pypi/l/Django.svg" alt="License"></a>
  <br>
</p>

## Introduction
Earth(version3-inside) is a photography website built by NodeJS, ReactStack and MongoDB

## Requirements

* react: ^15.4.2
* node: ^7.7.0
* mongodb: ^3.4.2

## Quick start

If you want to have a try, just clone the project to your disk

1. Init database, run this :

- Linux
```shell
wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.2.tgz
tar xfz mongodb-linux-x86_64-3.4.2.tgz
export PATH=`pwd`/mongodb-linux-x86_64-3.4.2/bin:$PATH
mkdir -p /data/db
mongod
use myblog
```

- OS X
```shell
brew update
brew install mongodb
mkdir -p /data/db
mongod
use myblog

```

- [More MongoDB Installation](https://docs.mongodb.com/master/administration/install-community/)
- Download [RoboMongo](https://robomongo.org/)

2. Start node debug server
```shell
npm run dev
```

3. Start node server
```shell
npm start
```

4. Open `http://localhost:3000`

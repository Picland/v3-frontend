<p align="center"><a href="https://github.com/feross/standard" target="_blank"><img width="200"src="https://cdn.rawgit.com/feross/standard/master/badge.svg"></a></p>

<p align="center">
  <a href="https://travis-ci.org/muwenzi/Earth"><img src="https://travis-ci.com/muwenzi/Earth.svg?token=65SdnpsEfKTY1qP6fnyh&branch=dev" alt="Build Status"></a>
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

- OS X
```shell
brew update
brew install mongodb
# set a data folder to store its files, this is default
mkdir -p /data/db
# start mongodb
mongod
# create database
mongo
use myblog
```

- Linux(CentOS)
```shell
sudo yum install -y mongodb-org
# set a data folder to store its files, this is default
mkdir -p /data/db
# start mongodb
sudo service mongod start
# create database
mongo
use myblog
```

- [More MongoDB Installation](https://docs.mongodb.com/master/administration/install-community/)
- [MongoDB Tutorial](https://www.tutorialspoint.com/mongodb/index.htm)
- Download [RoboMongo](https://robomongo.org/)

2. ENV: development
```shell
# step1 start bulid server for dev
npm run build
# step2 start app server for dev
npm run dev
# step3 open the browser
open http://localhost:3000
```

3. ENV: production
```shell
# only need to run this command
npm run prod
```

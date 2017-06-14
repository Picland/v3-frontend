<p align="center"><a href="https://github.com/muwenzi/Earth"><img width="500" src="https://cloud.githubusercontent.com/assets/12554487/26024526/906f3518-3805-11e7-8163-9d18b6ae5292.png"></a></p>

<p align="center"><a href="https://github.com/feross/standard" target="_blank"><img width="171"src="https://cdn.rawgit.com/feross/standard/master/badge.svg"></a></p>

<p align="center">
  <a href="https://travis-ci.org/muwenzi/Earth"><img src="https://travis-ci.com/muwenzi/Earth.svg?token=65SdnpsEfKTY1qP6fnyh&branch=master" alt="Build Status"></a>
  <a href="https://github.com/muwenzi/Blog-Webapp/blob/master/LICENSE.md"><img src="https://img.shields.io/pypi/l/Django.svg" alt="License"></a>
  <br>
</p>

## Introduction

Earth(version3-inside) is a photography website built by NodeJS, ReactStack and MongoDB

## Requirements

* react: `^15.5.0`
* node: `>=6.9.5`
* mongodb: `^3.4.2`

## Init Database

If you want to have a try, just clone the project to your disk

Init database, run this :

- OS X
```shell
brew update
brew install mongodb
# set a data folder to store its files
mkdir -p /data/db
# start mongodb
mongod
```

- Linux(CentOS)
```shell
# add config file
vi /etc/yum.repos.d/mongodb.repo
```

copy this, paste to `mongodb.repo` save and quit
```bash
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
```

then install by yum
```shell
sudo yum install -y mongodb-org
# set a data folder to store its files
mkdir -p /data/db
# start mongodb
sudo service mongod start
# or
mongod
```

- [More MongoDB Installation](https://docs.mongodb.com/master/administration/install-community/)
- [MongoDB Tutorial 1](https://www.tutorialspoint.com/mongodb/index.htm)
- [MongoDB Tutorial 2](http://www.runoob.com/mongodb/mongodb-tutorial.html)
- Download [RoboMongo](https://robomongo.org/)

## Quick start

1. ENV: development (feature and dev branch)
```shell
# step0 init project first time
npm run boot
# step1 start bulid server for dev
npm run build
# step2 start app server for dev
npm run dev
# step3 open the browser
open http://localhost:3000
```

2. ENV: sandbox (release branch)
```shell
# step0 init project first time
npm run boot
# step1 only need to run this command
npm run sandbox
```

3. ENV: production (master branch)
```shell
# step0 init project first time
npm run boot
# step1 only need to run this command
npm run prod
```

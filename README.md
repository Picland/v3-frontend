<p align="center"><a href="https://github.com/muwenzi/Earth"><img width="500" src="https://cloud.githubusercontent.com/assets/12554487/26024526/906f3518-3805-11e7-8163-9d18b6ae5292.png"></a></p>

<p align="center"><a href="https://github.com/feross/standard" target="_blank"><img width="171"src="https://cdn.rawgit.com/feross/standard/master/badge.svg"></a></p>

<p align="center">
  <a href="https://travis-ci.org/muwenzi/Earth"><img src="https://travis-ci.com/muwenzi/Earth.svg?token=65SdnpsEfKTY1qP6fnyh&branch=master" alt="Build Status"></a>
  <a href="https://github.com/muwenzi/Blog-Webapp/blob/master/LICENSE.md"><img src="https://img.shields.io/pypi/l/Django.svg" alt="License"></a>
  <br>
</p>

## Introduction

Earth-Front is built by ReactStack and NodeJS.

## Main Requirements

* react: `^16.0.0`
* node: `^8.0.0`

## Quick start

1. ENV: development (feature and dev branch)
```shell
# step1 start webpack server for dev
npm run webpack
# step2 start app server for dev
npm run dev
# step3 open the browser
open http://localhost:3000
```
2. ENV: sandbox (feature and dev branch)

```shell
# for devs to pre-deploy and debug locally
# step1 only need to run this command
npm run sandbox:debug
# step2 open the browser
open http://localhost:8890
```

3. ENV: sandbox (release branch)
```shell
# step1 only need to run this command
npm run sandbox
```

4. ENV: production (master branch)
```shell
# step1 only need to run this command
npm run prod
```

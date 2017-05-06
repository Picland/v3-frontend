#!/usr/bin/env bash

kill -9 $(lsof -t -i:3000);
node bin/server.js

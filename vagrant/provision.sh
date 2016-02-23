#!/bin/sh

## This file gets executed the first time you do a `vagrant up`, if you want it to
## run again you'll need run `vagrant provision`

## Bash isn't ideal for provisioning but Ansible/Chef/Puppet
## are not within the scope of this article

## Install all the things
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get --assume-yes remove node
apt-get install --assume-yes vim ntp bzip2 nodejs npm build-essential
npm install -g pm2
npm install -g n
n 4.2.6

## make www-data use /bin/bash for shell
chsh -s /bin/bash www-data

cd /var/www/acme
npm install
pm2 start src/app.js --watch

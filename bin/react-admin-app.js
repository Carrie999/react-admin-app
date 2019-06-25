#!/usr/bin/env node
/**
 * Copyright (c) 2019-present
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
const meow = require('meow')
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync, spawnSync } = require('child_process');
const log = console.log;

const cli = meow(`
  Usage
    $ react-admin-app [projectName]
`);

let projectName = 'react-admin'
if (cli.input[0]) {
  projectName = cli.input[0]
}

try {
  fs.accessSync(`./${projectName}`)
} catch(err) {
  fs.mkdirSync(`./${projectName}`);
}

const cwdOriginal = path.join(path.resolve(path.resolve(__dirname, '..')), 'template')
const cwd = path.join(process.cwd(), projectName)

let data = fs.readFileSync(path.join(cwdOriginal ,'package.json'),"utf-8");
data = JSON.parse(data)
data.name = projectName
fs.writeFileSync(path.join(cwdOriginal ,'package.json'), JSON.stringify(data, null, 4), 'utf-8', function(err, data) {
  if(err){
    console.log("error");
  }
})

copyDir(cwdOriginal, cwd)

// function copyDir(src, dist) {
//   spawnSync('cp', ['-r', src, dist]);	
// }
function copyDir(src, dist, callback) {
  fs.access(dist, function(err){
    if(err){
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' +path;
            var _dist = dist + '/' +path;
            fs.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

function myInExecSync(cmd) {
  execSync(cmd, {
    cwd: cwd,
    stdio: 'ignore'
  });
}

function myOutExecSync(cmd) {
  execSync(cmd, {
    cwd: cwd,
    stdio: [0,1,2]
  });
}

try {
  myInExecSync('git --version');
  myInExecSync('git init');
  myInExecSync('git add -A');
  myInExecSync('git commit -m "Initial commit from react-admin-app"');

  console.log('Installing packages. This might take a couple of minutes.')
  console.log('Installing react, react-dom, and ...')

  myOutExecSync('npm install');
  myOutExecSync('npm list --depth=0');

  log('')
  log('We suggest that you begin by typing:')
  log('')
  log(chalk.green('cd ') + projectName + chalk.green(' && yarn start'));
  log('')
  log('Happy hacking!')
} catch (e) {
  log(e)
}





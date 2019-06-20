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

const { execSync, spawnSync } = require('child_process');

const cli = meow(`
  Usage
    $ react-admin-app [projectName]
`);

let projectName = 'my-react-admin'
if (cli.input[0]) {
  projectName = cli.input[0]
}


// fs.mkdirSync(`./${projectName}`);
const cwdOld = path.join(path.resolve(path.resolve(__dirname, '..')), 'template/')
const cwd = path.join(path.resolve(path.resolve(__dirname, '..')), projectName)

let data = fs.readFileSync(path.join(cwdOld ,'package.json'),"utf-8");
data = JSON.parse(data)
data.name = projectName
fs.writeFileSync(path.join(cwdOld ,'package.json'), JSON.stringify(data, null, 4), 'utf-8', function(err, data) {
  if(err){
    console.log("error");
  }
})

copyDir(cwdOld, cwd)

function copyDir(src, dist) {
  spawnSync('cp', ['-r', src, dist]);	
}

try {
  execSync('git --version', { stdio: 'ignore' });
  execSync('git add -A', { stdio: 'ignore' });
  execSync('git commit -m "Initial commit from react-admin-app"', {
     stdio: 'ignore',
  });
  execSync('yarn', {
	stdio: 'ignore',
  });
  console.log('Happy hacking!')
  console.log(`cd ${projectName} && yarn start`)
} catch (e) {
	console.log(e)
}

// exec(`yarn build && git add . && git commit -m ${chunk}`, {cwd}, function(err, stdout, stderr){
  
    //   exec('git push origin dev', {cwd: '/Users/orion/Desktop/industrialVision'}, function(err, stdout, stderr){
	//    console.log( stdout )
	//    console.log( stderr )
	// });
// });





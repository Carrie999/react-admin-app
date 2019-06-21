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




try {
  fs.accessSync(`./${projectName}`)
} catch(err) {
  fs.mkdirSync(`./${projectName}`);
}

const cwdOriginal = path.join(path.resolve(path.resolve(__dirname, '..')), 'template/')
const cwd = path.join(process.cwd(), projectName)

let data = fs.readFileSync(path.join(cwdOriginal ,'package.json'),"utf-8");
data = JSON.parse(data)
data.name = projectName
fs.writeFileSync(path.join(cwdOriginal ,'package.json'), JSON.stringify(data, null, 4), 'utf-8', function(err, data) {
  if(err){
    console.log("error");
  }
})

// copyDir(cwdOriginal, cwd)

// function copyDir(src, dist) {
//   spawnSync('cp', ['-r', src, dist]);	
// }
function myExecSync(cmd) {
  var output = execSync(cmd, {
    cwd: cwd,
    stdio:[0,1,2]
  });

  console.log(output);
}

// , {cwd, stdio: 'ignore'}
try {
  execSync('git --version');
  execSync('git init');
  execSync('git add -A');
  execSync('git commit -m "Initial commit from react-admin-app"');
  // console.log('Installing packages. This might take a couple of minutes.')
  // console.log('Installing react, react-dom, and ...')
 //  execSync('npm install', {cwd},function(err, stdout, stderr){
 //  	console.log( stdout )
	// console.log( stderr )
 //  });
 //  console.log('Happy hacking!')
 //  console.log(`cd ${projectName} && yarn start`)
} catch (e) {
  console.log(e)
}

// exec(`yarn build && git add . && git commit -m ${chunk}`, {cwd}, function(err, stdout, stderr){
//       exec('git push origin dev', {cwd: '/Users/orion/Desktop/industrialVision'}, function(err, stdout, stderr){
// 	   console.log( stdout )
// 	   console.log( stderr )
// 	});
// });





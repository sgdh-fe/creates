#!/usr/bin/env node
const { join } = require('path')
const fse = require('fs-extra')
const [
  directory,
  author = require('git-user-name')(),
  version = '0.1.0'
] = process.argv.slice(2)

if (!directory) {
  return console.error('\n请输入要创建的项目\n')
}

async function init() {
  let src = join(__dirname, 'packages', 'featured')
  let dest = join(process.cwd(), directory)
  let exists = await fse.pathExists(dest)
  if (exists) {
    return console.error(`\n"${directory}" 项目已经存在\n`)
  }
  await fse.copy(src, dest)
  let pkg = await fse.readJson(join(dest, 'package.json'))
  await fse.outputFile(
    join(dest, 'package.json'),
    JSON.stringify(
      Object.assign(pkg, {
        name: directory,
        author: author,
        version: version
      }),
      null,
      2
    )
  )
  console.log(`\n"${directory}" 创建成功`)
  console.log(`\n快速开始:`)
  console.log(`\n 1. cd ${directory}`)
  console.log(`\n 2. yarn`)
  console.log(`\n 3. yarn start`)
  console.log(`\n 4. yarn run build\n`)
}

init()

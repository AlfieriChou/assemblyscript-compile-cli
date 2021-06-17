const shell = require('shelljs')
const assert = require('assert')
const readDirFileNames = require('read-dir-filenames')
const path = require('path')
const fs = require('fs')

const rootPath = process.cwd()
const args = []
if (process.argv.length > 2) {
  args.push(...process.argv.slice(2))
}

const {
  MODEL_PATH,
  COMPILE_PATH = `${rootPath}/compiles`,
} = process.env

assert(MODEL_PATH, 'MODEL_PATH is required')

const ascBinPath = `${rootPath}/node_modules/.bin/asc`

if (!fs.existsSync(ascBinPath)) {
  shell.echo(`Error: please install assemblyscript!`)
  shell.exit(1)
}

const models = readDirFileNames(MODEL_PATH)

models.reduce(async (promise, asPath, index) => {
  await promise
  const filename = path.parse(asPath).name
  const runCommandRet = shell.exec(`
    ${ascBinPath} ${asPath} -b ${COMPILE_PATH}/${filename}.wasm -t ${COMPILE_PATH}/${filename}.wat ${args.join(' ')}
  `)
  if (runCommandRet.code !== 0) {
    shell.echo(`Error: ${filename} compile failed!`)
  }
  if (index + 1 === models.length) {
    shell.exit(1)
  }
}, Promise.resolve())

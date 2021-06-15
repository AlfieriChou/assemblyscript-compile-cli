const shell = require('shelljs')
const assert = require('assert')
const readDirFileNames = require('read-dir-filenames')
const path = require('path')

const rootPath = process.cwd()

const {
  MODEL_PATH,
  COMPILE_PATH = `${rootPath}/compiles`,
} = process.env

assert(MODEL_PATH, 'MODEL_PATH is required')

const models = readDirFileNames(MODEL_PATH)

models.reduce(async (promise, asPath, index) => {
  await promise
  const filename = path.parse(asPath).name
  const runCommandRet = shell.exec(`${rootPath}/node_modules/.bin/asc ${asPath} -o ${COMPILE_PATH}/${filename}.wasm`)
  if (runCommandRet.code !== 0) {
    shell.echo(`Error: ${filename} compile failed!`)
  }
  if (index === models.length) {
    shell.exit(1)
  }
}, Promise.resolve())

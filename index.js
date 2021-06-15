const shell = require('shelljs')
const assert = require('assert')
const readDirFileNames = require('read-dir-filenames')
const path = require('path')

const {
  MODEL_PATH,
  COMPILE_PATH = `${process.cwd()}/compiles`,
} = process.env

assert(MODEL_PATH, 'MODEL_PATH is required')

const models = readDirFileNames(MODEL_PATH)

models.reduce(async (promise, asPath) => {
  await promise
  const filename = path.parse(asPath).name
  const runCommandRet = shell.exec(`asc ${asPath} -o ${COMPILE_PATH}/${filename}.wasm`)
  if (runCommandRet.code !== 0) {
    shell.echo(`Error: ${filename} compile failed!`)
  }
}, Promise.resolve())

shell.exit(1)

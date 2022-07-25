#!/usr/bin/env node

const program = require('commander')
const app = require('./dist/app.js')

program.version('1.0.1')
program
  .requiredOption('-b, --book <book_number>', 'Book number')
  .option('-p, --page <page_number>', 'Page number', '1')
  .option('-o, --output <filepath>', 'Output filepath', 'fukkan_comments.csv')
  .parse(process.argv)

const options = program.opts()

const bookNo = options.book
const pageNo = options.page
const filepath = options.output

app.createFukkanCommentsCsv(bookNo, pageNo, filepath)

import { FukkanComment, CsvRow } from './@types/index'
import path from 'path'
import { writeToPath } from '@fast-csv/format'

class Exporter {
  fukkanComments: FukkanComment[]
  outputCsvPath: string

  constructor(
    fukkanComments: FukkanComment[],
    filename: string = 'fukkan_comments.csv'
  ) {
    this.fukkanComments = fukkanComments
    this.outputCsvPath = `output/${filename}`
  }

  toCsv() {
    const headers: CsvRow = ['userId', 'userName', 'commentDetail', 'postedOn']
    const rows = [] as CsvRow[]
    rows.push(headers)

    this.fukkanComments.forEach((comment: FukkanComment) => {
      rows.push([
        comment.userId,
        comment.userName,
        comment.commentDetail,
        comment.postedOn,
      ])
    })

    writeToPath(path.resolve(__dirname, this.outputCsvPath), rows)
      .on('error', (err) => console.error(err))
      .on('finish', () => console.log('[LOG] CSV出力が完了しました。'))
  }
}

export default Exporter

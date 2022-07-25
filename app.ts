import FetchFukkanComments from './FetchFukkanComments'
import Exporter from './Exporter'

export const createFukkanCommentsCsv = async (
  bookNo: number,
  pageNo: number,
  fileName: string
) => {
  const comments = await new FetchFukkanComments(bookNo, pageNo).exec()
  const exporter = new Exporter(comments, fileName)
  exporter.toCsv()
}

import FetchFukkanComments from './FetchFukkanComments'
import Exporter from './Exporter'

const createFukkanCommentsCsv = async () => {
  const comments = await new FetchFukkanComments(65317, 2).main()
  const exporter = new Exporter(comments, 'my_fukkan_comments.csv')
  exporter.toCsv()
}

createFukkanCommentsCsv()

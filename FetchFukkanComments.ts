import { chromium } from 'playwright'

type FukkanComment = {
  userName: string
  commentDetail: string
}

class FetchFukkanComments {
  bookNo: number
  pageNo: number

  constructor(bookNo: number, pageNo: number = 1) {
    this.bookNo = bookNo
    this.pageNo = pageNo
  }

  async main() {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    const baseUrl = 'https://www.fukkan.com/fk/VoteComment'
    // TODO: パラメータはオブジェクトで取り扱うようにする
    const params = `?no=${this.bookNo}&page=${this.pageNo}&s=date`

    await page.goto(`${baseUrl}${params}`)

    const comments: any = await page.locator('ul.comment_list li')
    const numberOfComments = await comments.count()

    const fukkanComments: FukkanComment[] = []

    for (let i = 0; i < numberOfComments; i++) {
      const userName: string = await comments
        .nth(i)
        .locator('.comment_user p')
        .innerText()
      const commentDetail: string = await comments
        .nth(i)
        .locator('.comment_detail')
        .innerText()

      // TODO: commentDetail から年月日の抽出を行う
      // TODO: user には一意の id が存在する
      fukkanComments.push({
        userName,
        commentDetail,
      })
    }

    console.log(fukkanComments)

    await browser.close()
  }
}

export default FetchFukkanComments

import { chromium } from 'playwright'

class FetchFukkanComments {
  bookNo: number

  constructor(bookNo: number) {
    this.bookNo = bookNo
  }

  async main() {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    const baseUrl = 'https://www.fukkan.com/fk/VoteComment'
    // TODO: パラメータはオブジェクトで取り扱うようにする
    // FIXME: pageパラメータの追加（コンストラクタにも）
    const params = `?no=${this.bookNo}&s=date`

    await page.goto(`${baseUrl}${params}`)

    const comments: any = await page.locator('ul.comment_list li')
    const numberOfComments = await comments.count()

    type FukkanComment = {
      userName: string
      commentDetail: string
    }
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

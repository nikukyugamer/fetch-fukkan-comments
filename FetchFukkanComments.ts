import { chromium } from 'playwright'

type FukkanComment = {
  userId: string
  userName: string
  commentDetail: string
  postedOn: string
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
    const params = `?no=${this.bookNo}&page=${this.pageNo}&s=date`

    await page.goto(`${baseUrl}${params}`)

    const comments: any = await page.locator('ul.comment_list li')
    const fukkanComments = await this.setFukkanComments(comments)

    console.log(fukkanComments)

    await browser.close()
  }

  async setFukkanComments(comments: any): Promise<FukkanComment[]> {
    const numberOfComments = await comments.count()
    const fukkanComments: FukkanComment[] = []

    for (let i = 0; i < numberOfComments; i++) {
      const userIdPath: string = await comments
        .nth(i)
        .locator('.comment_user a')
        .getAttribute('href')
      const userId: string = this.convertUserIdPathToUserId(userIdPath)
      const userName: string = await comments
        .nth(i)
        .locator('.comment_user p')
        .innerText()
      const commentDetail: string = await comments
        .nth(i)
        .locator('.comment_detail')
        .innerText()
      const postedOn: string = this.extractPostedOn(commentDetail)

      fukkanComments.push({
        userId,
        userName,
        commentDetail,
        postedOn,
      })
    }

    return fukkanComments
  }

  // userIdPath: '/fk/user/?no=f98350f6a61e8245b'
  convertUserIdPathToUserId(userIdPath: string): string {
    const params = Object.fromEntries(new URLSearchParams(userIdPath))

    return Object.values(params)[0] || ''
  }

  // commentDetail: 'ああああああ (2020/05/24)'
  extractPostedOn(commentDetail: string): string {
    const regex = /\((\d{4}\/\d{2}\/\d{2})\)$/
    const result = commentDetail.match(regex) || []

    return result[1] || ''
  }
}

export default FetchFukkanComments

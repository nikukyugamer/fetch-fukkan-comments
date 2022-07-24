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
    const params = `?no=${this.bookNo}&s=date`

    await page.goto(`${baseUrl}${params}`)
    await page.screenshot({ path: 'tmp/screenshot.png' })
    await browser.close()
  }
}

export default FetchFukkanComments

/* this code is from https://github.com/geckosio/phaser-on-nodejs/blob/master/src/fakeXMLHttpRequest.ts */
import path from 'path'
import fs from 'fs'

class FakeXMLHttpRequest {
  public url: string
  public status = 200
  public response: any
  public responseText: string

  public open(_type: string, url: string) {
    this.url = path.resolve(__dirname, url)
  }

  public send() {
    // use base64 for images and utf8 for json files
    const encoding = /\.json$/gm.test(this.url) ? 'utf8' : 'base64'

    fs.readFile(this.url, { encoding }, (err, data) => {
      if (err) throw err
      this.response = data
      this.responseText = data
      const event = { target: { status: this.status } }
      this.onload(this, event)
    })
  }
  public onload(xhr: any, event: any) {}
  public onerror(err: NodeJS.ErrnoException | null) {}
  public onprogress() {}
}

export default FakeXMLHttpRequest
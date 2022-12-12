import { JSDOM } from 'jsdom'
import Canvas from 'canvas'
import FakeXMLHttpRequest from './FakeXMLHttpRequest'

declare global {
    var excalibur_ver: string;
}

global.excalibur_ver = "0.27.0";

//webpack uses global self than this, so we need to set it for jsdom to work
(global as any).self = global;

const options = {
  pretendToBeVisual: true,
  userAgent: "excalibur/jsdom",
};
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body><p>Hello Swords!</p><body></html>`,options)

const document = dom.window.document
const window = dom.window
console.log(dom.window.document.querySelector("p")!.textContent);

global.document = document

global.window =  window as any

//@ts-ignore jsdom doesn't have this method
global.window.matchMedia = () => {
  return {
  matches : false,
  addListener : function() {},
  removeListener: function() {}
  };
  };

global.DOMMatrix = Canvas.DOMMatrix
global.Window = dom.window.constructor as any

global.navigator = { userAgent: 'excalibur/jsdom' } as any

//Cudos to jsdom issue #2154
global.Image = window.Image
Object.defineProperty((global as any).Image.prototype, 'decode', {
  get() {
    return () => Promise.resolve()
  },
});

global.XMLHttpRequest = FakeXMLHttpRequest as any

/* TODO
to make it work on Loader.ts of excaliburjs at `Loader draw function`
i've comment out the ctx.drawImage
so need to find a way to make it work without commenting it

also add a timeout make it work
        setTimeout(() => {
        if (!this.logoPosition) {
            ctx.drawImage(this._image, 0, 0, this.logoWidth, this.logoHeight, logoX, logoY - imageHeight - 20, width, imageHeight);
        }
        else {
            ctx.drawImage(this._image, 0, 0, this.logoWidth, this.logoHeight, logoX, logoY, width, imageHeight);
        }
        }, 1000);
so probably is an issue that image is not yet loaded

also this works
        if (!this.logoPosition) {
            this._image.onload = () => ctx.drawImage(this._image, 0, 0, this.logoWidth, this.logoHeight, logoX, logoY - imageHeight - 20, width, imageHeight);
        }
        else {
            this._image.onload = () => ctx.drawImage(this._image, 0, 0, this.logoWidth, this.logoHeight, logoX, logoY, width, imageHeight);
        }


*/
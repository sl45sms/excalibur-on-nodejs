import { JSDOM } from 'jsdom'
import Canvas from 'canvas'
import FakeXMLHttpRequest from './FakeXMLHttpRequest'

declare global {
    var excalibur_ver: string;
}

global.excalibur_ver = "0.27.0";

(global as any).self = global;


const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body><p>Hello Swords!</p><body></html>`)

const emptyFn = () => {}
const document = dom.window.document
const window = dom.window
console.log(dom.window.document.querySelector("p")!.textContent);

global.document = document
global.window =  window as any
//@ts-ignore polifyll for matchMedia
global.window.matchMedia =  () => {
  return {
  matches : false,
  addListener : function() {},
  removeListener: function() {}
  };
  };

//@ts-ignore use canvas for dommatrix
global.DOMMatrix = Canvas.DOMMatrix
  
global.Window = dom.window.constructor as any

global.window.Element = undefined as any
global.matchMedia = emptyFn as any

global.navigator = { userAgent: 'excalibur' } as any

global.Image = window.Image
global.XMLHttpRequest = FakeXMLHttpRequest as any

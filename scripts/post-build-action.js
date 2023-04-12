const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function updateStylesLinkHash() {
  const pathToIndexHTML = path.resolve(__dirname, "../browser/dist/browser/index.html");
  
  fs.readFile(pathToIndexHTML, "utf8", (error, html) => {
    if (error) throw error;

    const dom = new JSDOM(html);
    let styles = "";

    dom.window.document.head.querySelectorAll("link")
      .forEach((link, index) => {
        if (index === 0) styles = link.href;
        if (index === 2) link.href = styles;
       });

    fs.writeFile(pathToIndexHTML, dom.window.document.documentElement.outerHTML, (error) => {
      if (error) throw error;
    })   
  })
}

updateStylesLinkHash();
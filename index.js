let { colors, preOption } = require("./lib/color");
class ElementCssReplaced {
  constructor() {
    console.warn("options is default")
    this.options = {primary:"primary"};
    this.colors = colors;
  }
  replaceSource(source) {
    if (!source) {
      return "";
    }
    let keys = Object.keys({
      ...this.options,
      ...preOption,
    });
    let _source = source;
    keys.forEach((key) => {
      _source = this.getNewSource(
        _source,
        this.colors[key],
        /primary[1-9]0/.test(key) ? `var(--${key})` : `var(--${this.options[key]})`
      );
    });
    return _source;
  }
  getNewSource(source, reg, value) {
    return source.replace(reg, value);
  }
  apply(compiler) {
    compiler.hooks.emit.tap(
      "\n Element Theme Css Replaced \n",
      (compilation) => {
        let htmlSource = compilation.assets["index.html"].source();
        let _htmlSource = htmlSource.replace(/<html>/g,`<html lang="en">`);
        compilation.assets["index.html"] = {
          source:function(){
            return _htmlSource
          },
          size:function(){
            return _htmlSource.length
          }
        }
        compilation.chunks.forEach((chunk) => {
          chunk.files.forEach((filename) => {
            let source = compilation.assets[filename].source();
            let _source = this.replaceSource(source);
            compilation.assets[filename] = {
              source: function () {
                return _source;
              },
              size: function () {
                return _source.length;
              },
            };
          });
        });
      }
    );
  }
}
module.exports = ElementCssReplaced;

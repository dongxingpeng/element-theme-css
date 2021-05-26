class ElementCssReplaced {
  constructor(options) {
    if(!options){
      console.warn("options is default,options={primary:'primary'}.\n you can set options={primary:''}")
    }
    this.options = options || {primary:"primary"};
    this.colors = {
      primary: /#409EFF/gi,
      textPrimary: /#303133/gi,
      textRegular: /#606266/gi,
      textSecondary: /#909399/gi,
      textPlaceholder: /#C0C4CC/gi,
      borderColorBase: /#DCDFE6/gi,
      borderColorLight: /#E4E7ED/gi,
      borderColorLighter: /#EBEEF5/gi,
      borderColorExtraLight: /#F2F6FC/gi,
      colorWhite: /#FFFFFF/gi,
      colorBlack: /#000000/gi,
      backgroundColorBase: /#F5F7FA/gi,
      primary10: /#53a8ff | #3a8ee6/gi,
      primary20: /#66b1ff/gi,
      primary30: /#79bbff/gi,
      primary40: /#8cc5ff/gi,
      primary50: /#a0cfff/gi,
      primary60: /#b3d8ff/gi,
      primary70: /#c6e2ff/gi,
      primary80: /#d9ecff/gi,
      primary90: /#ecf5ff/gi,
    };
  }
  replaceSource(source) {
    if (!source) {
      return "";
    }
    let keys = Object.keys({
      ...this.options,
      primary10:"",
      primary20: "",
      primary30:"",
      primary40: "",
      primary50:"",
      primary60:"",
      primary70:"",
      primary80:"",
      primary90: "",
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
        let _htmlSource = htmlSource.replace(/<body>/g,`<body style="--${this.options.primary}:'#409EFF'">`);
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

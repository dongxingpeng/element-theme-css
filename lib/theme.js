import primary from "../utils";
const tinycolor = require("./tinycolor");
function setTheme(data) {
  let color = tinycolor(data);
  if (!color.isValid()) {
    console.error(new Error("Please use the correct color ,For Example:#000000,#000,black..."));
    return;
  }
  primary.reduce(function (pre, pri) {
    document.querySelector(":root").style.setProperty(`--${pri}`, color.setAlpha(pre));
    return (pre - 0.1).toFixed(1);
  },1);
}
export { setTheme };

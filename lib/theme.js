import primary from "../utils";
const tinycolor = require("./tinycolor")
function setTheme(data) {
  let color = tinycolor(data);
  if (!color.isValid()) {
    console.error(new Error("Please use the correct color ,For Example:#000000,#000,black..."));
    return;
  }
  if (document) {
    document.querySelector(":root").style.setProperty("--primary", color || "");
  }
  let alpha = 1;
  primary.forEach((pri) => {
    alpha = (alpha - 0.1).toFixed(1);
    if (document) {
      document.querySelector(":root").style.setProperty(`--${pri}`, color.setAlpha(alpha));
    }
  });
}
export {setTheme};

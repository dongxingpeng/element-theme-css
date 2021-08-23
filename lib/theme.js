import primary from "../utils";
function setTheme(color) {
  if (!/^#[a-fA-F0-9]{3,6}/.test(color)) {
    console.error(new Error("The color is Hex,For Example:#000000"));
  }
  let property0 = "--primary";
  if (document) {
    document.querySelector(":root").style.setProperty(property0, color || "");
  }
  let alpha = 1;
  primary.forEach((pri) => {
    alpha = (alpha - 0.1).toFixed(1);
    if (document) {
      document.querySelector(":root").style.setProperty(`--${pri}`, rgbTo(color, alpha));
    }
  });
}
function rgbTo(color, alpha) {
  let cor = color.toLocaleLowerCase().slice(1).split("");
  if (/^[0-9A-Fa-f]{6}$/.test(cor.join("")) || /^[0-9A-Fa-f]{3}$/.test(cor.join(""))) {
    cor.length === 3 &&
      !(function () {
        for (i = -3; i < 0; i++) {
          cor.splice(i, 0, "" + cor.slice(i)[0]);
        }
      })();
    return `rgba(${parseInt(cor.slice(0, 2).join(""), 16)},${parseInt(cor.slice(2, 4).join(""), 16)},${parseInt(cor.slice(4, 6).join(""), 16)},${alpha})`;
  } else {
    return color;
  }
}
export { setTheme, rgbTo };

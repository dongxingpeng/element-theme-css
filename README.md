## Element CSS Theme Replace
--说明:本插件基于Element2.x版本默认的主题更改

--原理:通过把默认的主题色替换成CSS中的变量来进行主题切换

## 使用说明
```
<!-- webpack插件引入 -->
<!-- primary代表的是变量名，可以自定义,默认primary -->
new ElementCssReplaced({
  primary:"primary"
});
<!-- 另外，在lib文件下提供setTheme方法，来进行更换主题 -->
<!-- 引入 -->
import {setTheme} from "element-theme-css/lib";
<!-- 设置颜色 -->
setTheme("#000000");
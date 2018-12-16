# unpack-wxapkg

unpack-wxapkg是用来对微信小程序（或者微信小游戏）的.wxapkg包进行解析的工具，由于开发时使用的node环境是v8.10.0，建议在该版本或更高版本node下使用。

## 安装：
由于全局安装使用是最方便的，所以下文的示例均以全局命令作为参考
```bash
npm i unpack-wxapkg -g
```
## 默认解析：
当没有在unpack-wxapkg命令后面传递参数，默认会以当前命令调用目录为根目录,向下级目录遍历所有.wxapkg文件，然后解析。
```bash
unpack-wxapkg
```
## 指定文件解析：
unpack-wxapkg <要解析的.wxapkg文件> [解析后的文件目录]
```bash
unpack-wxapkg yours.wxapkg dest/yours
```
## 指定目录解析：
unpack-wxapkg -s <要解析文件所在目录> -d [解析后文件存放目录]
```bash
unpack-wxapkg -s wxapkgSrc -d dest/yours
```
## 缩写：
unpack-wxapkg命令可以使用缩写uw命令
```bash
# 默认解析
uw
# 指定文件解析
uw yours.wxapkg dest/yours
# 指定目录解析
uw -s wxapkgSrc -d dest/yours
```
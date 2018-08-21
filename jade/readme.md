### Jade 特点
1. 超强的可读性
2. 灵活易用的缩进
3. 块扩展
4. 代码默认经过编码处理，以增强安全性
5. 编译及运行时的上下文错误报告
6. 命令行编译支持
7. HTML5模式
8. 可选的内存缓存
9. 联合动态的静态标记类
10. 利用过滤器解析树的处理

### 编译
1. 手动 jade xxx.jade -P
2. 自动 jade xxx.jade -P -w
3. 外部导入变量 jade xxx.jade -P -w -O imooc.json

### 反编译
1. npm install html2jade -g
2. html2jade http://www.imoov.com > imooc.jade

### 缺点
1. 可移植性低
2. 调试困难
3. 性能不是非常出色

### 选择的因素
1. 初始阶段(开发效率)
2. 稳定阶段(性能和协作成本)

### IMOOC
1. https://www.imooc.com/learn/259

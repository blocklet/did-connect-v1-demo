### 关联 Issue

> 如果解决了某一个 issue, 请用 fixes/closes/resolves 关键词来关联该 issue; 如果只是相关（未完全解决），使用 relates 关键字关联

### 主要改动

1. 修复了 xxx
2. 改进了 xxx
3. 调整了 xxx

### 界面截图

> 如果改动的是和 UI 相关的需要截图

### 测试计划

> 如果本次变更没有自动化测试覆盖，你整理的测试用例集是什么？需要编写成 todo list 放到下面

### 检查清单

- [ ] 这次变更包含 breaking change，我为 breaking change 编写了 migration script【如果不是 breaking change 可以勾选】
- [ ] 本次变更新增了文件需要被包含在 npm 包的文件，且对应 package.json 的 files 字段包括了这些新增的文件
- [ ] 本次变更增加了依赖，并且依赖都包含在相应的 package.json dependencies 中
- [ ] 本次变更的地方已经有测试覆盖，并且我调整了变更部分的测试覆盖
- [ ] 本次变更新增的代码逻辑也增加了测试覆盖
- [ ] 本次变更的兼容性测试覆盖了 Chrome
- [ ] 本次变更的兼容性测试覆盖了 Safari
- [ ] 本次变更的兼容性测试覆盖了 PC 端
- [ ] 本次变更的兼容性测试覆盖了移动端【手机浏览器、钱包内置浏览器】
- [ ] 本次变更我已经把 ArcBlock 的依赖升级到了最新：https://www.notion.so/arcblock/JS-afb6960ba36546fa8ddc638fc47e5f51

# 35个 Claude Code 实用技巧！每条都有具体命令或可直接复制的 prompt

> 来源：[springmeng](https://mp.weixin.qq.com/s/YJO2Qb8Xp3W1XwxSd-jbWg)

---

## 一、项目初始化：建立持久上下文

![Startup Checklist Flow](https://mmbiz.qpic.cn/mmbiz_png/TkWsojtosvSBanvblWian5eicYHDrIbIjdic8uT6WxMn5Grt96eS1qMypyWXYb9pnPSrmhkP8b7oXFKGN9lNjxH2Z3HCkVKLqx4uMgCzomic3r0/640?from=appmsg&wxfrom=5&tp=webp&wx_lazy=1#imgIndex=0)

### ① /init

```
/init
```

扫描整个代码库，自动生成 CLAUDE.md，记录项目结构、技术栈、编码规范。之后每次新会话自动读取，不用反复介绍项目背景。

### ② /memory — 写进持久规则

```
/memory
```

进入 memory 编辑界面，加上跨会话持久化的规则，比如：

> 始终使用 TypeScript strict 模式。所有公共函数必须加 JSDoc 注释。修改 /src/core 下的任何文件后必须跑测试。

这些规则每次会话自动生效。

### ③ Plan Mode（Shift + Tab）— 先规划再动手

切到 Plan 模式（按 Shift + Tab），Claude Code 只分析不写代码，给出架构方案。你确认没问题，再按 Shift + Tab 切回实现模式。这一个习惯能防止的 bug，比后面所有技巧加起来都多。

### ④ 模式约束 — 在 CLAUDE.md 里锁定风格

比如把下面这段加进 CLAUDE.md：

> 新建文件时遵循以下模式：
> - API 路由：参考 src/api/example-route.ts
> - 数据库查询：参考 src/repositories/example-repo.ts 的 repository 模式
> - React 组件：参考 src/components/ExampleComponent.tsx

之后每次新建文件，Claude Code 自动对齐项目风格。

---

## 二、会话管理：上下文是稀缺资源

![AI Command Palette](https://mmbiz.qpic.cn/sz_mmbiz_png/TkWsojtosvTUyRukfKiblpfQHcoXZ1WM5GmdVObGwYo8QFWmbZiaXAOzeDn7LCW83Qrk0pljvFetEutpVKeDic53CnozDr2nINcJo0xQLxKSyg/640?from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=1)

### ⑤ /compact — 压缩上下文

```
/compact
```

聊了 30-45 分钟后输一次。把整个对话压缩成精炼摘要，保留关键决策和当前状态，Claude Code 重新聚焦。不做这步，输出质量会悄悄下滑。

### ⑥ /clear — 清场开新任务

```
/clear
```

开始新任务时彻底清空上下文。把数据库重构的上下文带到前端开发里，只会产出混乱代码。原则：一个功能一次对话。

### ⑦ /cost — 查花费

```
/cost
```

显示当前 session 的 token 用量。每小时看一次，设个心理预算。

### ⑧ 多模型切换

Opus 做规划和架构决策，Sonnet 做具体实现。在 Claude Code 设置里切换模型，或在对话开始时指定。Opus 思考深但贵，Sonnet 快且便宜。用思考者规划，用建设者施工。

### ⑨ ! 前缀——终端直出

```
!git status
!npm test
!ls src/
```

消息前加 `!` 直接跑终端命令，不用开新窗口。跑测试、查 git 状态、切目录，全在一个界面里完成。

### ⑩ 并行 Session

大功能开两个终端窗口，一个跑后端实现，一个跑前端实现，各自保持干净上下文，最后把两块连起来。比在一个会话里来回切换稳。

---

## 三、代码质量：让输出稳定好用

![Code Quality Practices](https://mmbiz.qpic.cn/mmbiz_png/TkWsojtosvTLE8YeGvwK3IvBurXpP2BicC6n7nMFBVl6n9mUfXXFoxXnWibnkibPfqyUsGibuTrd3268Vkc90GTpMDia4ya7WUHrlXYauBF1ZrQA/640?from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=2)

### ⑪ 参考文件法

别用文字描述风格，直接指文件：

> 看 src/auth/login.ts 里鉴权的实现方式，按完全相同的模式实现密码重置功能。

比口头描述准确十倍，在团队项目里保持风格一致时尤其好用。

### ⑫ 截图调试

UI 出问题，截图 Ctrl+V 粘进去，说：

> 按钮和输入框没对齐，卡片间距不一致，两个都修一下。

比写一段文字描述快且准。

### ⑬ 先测试后实现

> 写一个计算折扣价格的函数的测试用例，覆盖：正常折扣、零折扣、100% 折扣、负价格、字符串输入这几种情况。然后实现这个函数，让所有测试通过。

测试先行定义了行为，实现自然就是对的。

### ⑭ 增量构建

把大功能拆成步骤，每步之间测试：

> 第一步：只建数据库 schema，其他什么都不做。

确认 OK 再：

> 第二步：建使用这个 schema 的 API 端点。

五个小步骤加测试，比一个大 prompt 的质量高很多。

### ⑮ Diff Review

每次改完说：

> 展示你修改过的所有文件的 diff，每处改动用一句话解释。

抓住 Claude Code 顺手改了你没让它改的文件。

---

## 四、探索陌生代码库

### ⑯ 代码库提问

在不熟悉的模块动手前，先问：

> 读 src/services/ 目录，解释数据从 API 路由到数据库的完整流向。用了哪些模式？修改这块代码前我需要了解什么？

先理解架构再动手，避免引入和现有设计冲突的实现。

---

## 五、架构与重构

![Architecture & Refactoring](https://mmbiz.qpic.cn/mmbiz_png/TkWsojtosvSbJJr8s2ONTicL9UycEC3sHAWWv2F63xh2o8BhN0zaX9AC8icoxcEd6xicTaick1SKJMvYFiaTaYrS16rhN1rib93fESFwBgk9A4ibEc/640?from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=3)

### ⑰ 架构审计

新项目开工前：

> 分析我的项目需求：\[列出需求\]。提出两种不同的架构方案。每种方案给出：组件图、优点、缺点、复杂度估算、可能出什么问题。最后推荐一种并说明理由。

### ⑱ 重构规划

> 读 src/services/user-service.ts。这个文件已经膨胀到 800 行，职责太多。提出一个拆分重构方案：新文件结构、什么代码移到哪里、确认不会破坏现有的外部引用。**先不要开始重构，只给我方案。**

那个"先不要开始重构"非常重要，防止它在你还没确认方案时就开始乱改。

### ⑲ 数据库迁移生成

> 我需要修改用户表 schema：添加一个 role 字段（枚举值：admin、editor、viewer，默认 viewer），并把 name 字段重命名为 display_name。生成迁移文件，更新 repository 层、所有引用旧 schema 的 API 路由，以及 TypeScript 类型定义。在动手修改之前，先列出所有需要改动的文件。

多层联动改动正是 Claude Code 的强项。

---

## 六、API 设计与安全

### ⑳ API 设计 Review

> 审查我的 API 设计：\[粘贴路由定义\]。检查：命名是否一致、有没有缺少错误响应、哪些接口应该支持分页、哪些路由缺少鉴权、有没有违反 REST 规范的地方。给出具体的改进建议。

### ㉑ 安全扫描

> 扫描这个代码库的安全漏洞：SQL 注入、XSS、配置文件或代码里暴露的 secrets、缺少输入校验、不安全的直接对象引用、缺少限流。每个问题给出：严重程度、精确位置、为什么危险、怎么修。

### ㉒ 性能分析

> 分析这个代码库的性能问题：N+1 数据库查询、根据查询模式缺少的索引、React 组件不必要的重渲染、可以懒加载的大包、应该做缓存的 API 接口。按影响程度排优先级。

---

## 七、工程自动化

![Automation Workflow](https://mmbiz.qpic.cn/sz_mmbiz_png/TkWsojtosvRBsbG86216ZTSfzibTI97slqBSSVlo2jKI1mtQM0YR5ciapSfhMGnJSowoOuzh8Hjxwm5hXF5ZiboW05gJpfOuiaEdn2qTsArseNY/640?from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=4)

### ㉓ Git Hook

> 创建一个 pre-commit hook：对暂存文件跑 lint、跑类型检查、检测生产代码里的 console.log、任何检查不通过就阻止提交。安装到 .husky/pre-commit。

### ㉔ CI 流水线

> 创建一个 GitHub Actions 工作流：在每次 PR 时触发，安装依赖、跑完整测试套件、跑 lint、构建项目，在 PR 里评论结果。对 node_modules 使用缓存。

### ㉕ 环境搭建脚本

> 创建一个新开发者跑一次就能搭好整个开发环境的脚本：安装依赖、从 .env.example 创建 .env、搭建本地数据库、跑迁移、灌测试数据、跑测试套件验证全部正常。

### ㉖ Release Notes 生成

> 读上次 tag 以来的 git log。生成更新日志，按以下分类：新功能、bug 修复、性能提升、Breaking Changes。每条用用户能看懂的语言写，不用技术行话。格式化为 markdown changelog 条目。

---

## 八、文档与测试数据

### ㉗ 功能文档生成

功能做完后立刻运行：

> 读你在这个功能里创建或修改的每个文件，生成完整文档：每个函数的作用、它们之间怎么连接、预期的输入输出是什么、有哪些非显而易见的设计决策。

刚做完马上生成，比几天后靠记忆写准确。

### ㉘ 测试数据构造

> 为开发数据库创建完整的测试数据文件。包括：5 个用户（1 个 admin、2 个 editor、2 个 viewer）、20 个有真实感的示例项目、实体间的关联关系、边界情况（已归档项目、已删除用户、没有成员的项目）。数据要真实，不要用"测试123"这种假数据。

---

## 九、依赖管理

### ㉙ 添加新依赖前检查

> 我想添加 \[包名\] 来处理 \[具体场景\]。帮我检查：这个包还在维护吗？有没有已知的安全问题？对 bundle 体积的影响有多大？有没有更轻量的替代方案能覆盖我的具体需求？

### ㉚ 依赖冲突解决

> 我遇到了这个依赖冲突：\[粘贴报错\]。分析冲突原因，找出哪些包要求了有冲突的共享依赖版本。建议改动最少的解决方案，并说明 tradeoff。

---

## 十、Debug 与问题排查

![Debug Techniques](https://mmbiz.qpic.cn/mmbiz_png/TkWsojtosvT6ZfD4qYCRkO0Eq4ic3Ydox00GJD90x9UJYhyyEbRQqrqvibTEflianw0WDKBPuicpnl1g4ysZPia83icJ3iaOrGjLUJUJHNPwWogNzU/640?from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=5)

### ㉛ 完整错误粘贴

出错时粘贴完整堆栈，然后说：

> 我遇到了这个报错：\[粘贴完整错误信息和堆栈跟踪\]。在给出修复建议之前，先逐步分析根本原因。

"逐步分析"这个约束能防止它直接跳到错误结论。

### ㉜ Git Checkpoint

每次大改动前：

```bash
git add . && git commit -m "checkpoint: 改动前备份"
```

出问题秒级回滚，不用花半小时调试之前能跑的代码。

### ㉝ Bug 复现流程

> 用户报告了这个 bug：\[粘贴 bug 报告\]。创建最小复现步骤：精确的操作步骤、预期行为、实际行为。然后写一个能捕获这个 bug 的失败测试。最后修改代码让测试通过。

从复现到修复一条线走完。

### ㉞ Blame 调查

> 这个函数从昨天开始出问题了。读这个文件过去一周的 git log，找出哪个 commit 可能引入了问题，解释改了什么。然后给出修复建议。

---

## 十一、恢复模式

### ㉟ Recovery Mode

当 Claude Code 给了坏的实现，来回改了很多轮还不行时，停下来说：

> 停。从 git 读这个文件的原始可用版本：\[粘贴 git show 命令的输出\]。现在看看我们一直想实现的目标：\[简单重述目标\]。换一个思路重新开始。之前的方案明显行不通。

有时候从干净状态重新开始，比修补一堆错误快得多。知道什么时候该止损，本身就是使用 AI 辅助开发的重要能力。

---

## 总结

35 个技巧，每一条都有具体命令或可直接复制的 prompt。

**重点：**
- `/init` + `CLAUDE.md` 搭底座
- Plan Mode 先设计后动手
- `/compact` 保持上下文干净
- 增量构建加测试确保质量
- Git Checkpoint 兜底
- Recovery Mode 止损

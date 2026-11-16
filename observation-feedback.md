# Observation 页面反馈

页面：`observation-mvp.html`
状态：第 1–8、12–17、19–20 条已在 branch `observation-redesign` 实现（未 commit）；第 9、10 条由第 13–15 条取代；第 11 条（Scout spacecraft）暂时搁置

---

## 1. 整体布局：单屏、不滚动

- 整个页面固定在一屏内，玩家互动时**不需要上下滚动**。
- 所有元素根据屏幕大小自适应缩放和排布，但始终全部显示在同一屏里。

## 2. 开场动画：先交代故事背景

- 现在一打开就是 "Welcome, Space Detective"，缺少背景。在它之前加一段简短的开场动画，让玩家知道发生了什么。
- 要回答的问题：**这颗移动的天体是怎么被发现的？** 现在 New Detection 直接给出三张照片，没有交代来源。
- 故事流程：
  1. 玩家（某个角色，见下方"待定"）透过望远镜观察夜空
  2. 发现一个移动的天体
  3. 经过一系列计算，发现它离地球越来越近，甚至可能很快撞上地球
  4. 由此引出游戏的动机：要设计并发射一艘飞船去撞击小行星，改变它的轨道，拯救地球
- 开场动画结束、背景交代完之后，才进入 Detection / Data Collection 环节。

## 3. 第一人称视角

- 整个游戏采用第一人称叙事：画面就是"我"眼前看到的东西，包括走过场景、透过望远镜往外看、操作界面等。
- 原因：
  - **包容性：** 不出现角色形象，就不用决定性别、代词、年龄或种族，任何玩家都能代入。
  - **代入感：** 玩家感觉是自己在做这份工作。

## 4. 右侧数据面板（Mission Clock + Asteroid fact file）延后出现

- 指右侧的 `aside.panel.side`：Mission Clock 和 "Our asteroid fact file" 数据卡。
- 现在一开始就显示。改为开场背景交代完、进入数据收集阶段后，再弹出 / 滑出这个面板。

## 5. "Take more pictures" 之后

- 背景交代完之后，进入更多信息收集。点 "Take more pictures" 会更新到达时间、撞击概率、可能到达时间、time spent 等信息。
- **time spent** 具体指什么还不确定，先保留，不改。
  - 查代码：是 Risk Evaluation 页面三个数字之一（Chance of impact 76% / Possible arrival 7.8–8.2 yrs / **Time spent 6 months**），表示点 "Take more pictures" 用掉了 6 个月任务时间。

## 6. Data Collection 阶段：布局问题

- 左边的 hexagon 树（`div.tree-board`）会随屏幕缩小，屏幕不大时只能看到一半。
- 右边的详情卡（`div.node-detail`）却一直很大，挡住了左边本该看到的内容。
- 改法：**hexagon 树放大，作为主体**；右边常驻的详情卡取消，改为**点击某个 hexagon 时弹出卡片**。现在右边的说明文字会变，但玩家根本不会注意到，弹出更显眼。

## 7. Data Collection 阶段：进入时弹出说明

- "Select a hexagon to explore a job. Lines show which clues unlock new jobs." 这行提示太不显眼。
- 刚进入 Data Collection 时弹出一个窗口，说明这一步要做什么，玩家点 **"Got it"** 确认后再开始选 hexagon，确保玩家知道自己要干嘛。

## 8. Hexagon 的含义不清楚

- 只看 hexagon 上的文字（如 "Heat-sensing telescope"），不知道这项工作是做什么用的。说明只写在右边卡片里，容易被忽略（第 6 条的弹出卡片可以解决）。
- 卡片里的 "6 months" 一开始以为是剩余时间、觉得不对，后来才理解是这项工作需要的时长，要配合下方的时间 slider 推进进度。说明这层逻辑对玩家不直观，需要讲清楚。

## 9. 不能开始某项工作时，弹窗说明原因

- 例子：Heat-sensing telescope 和 Watch it spin 可以同时进行；但再选 Light color study 时无法开始，因为共享的望远镜预约已被别的工作占用。
- 卡片里其实写了原因，但玩家没耐心看。
- 改法：点 "Start this job" 却不能开始时，**直接弹窗**说明：望远镜预约正在被哪一项工作使用。

## 10. 新增：总时间估算面板

- 在旁边加一个面板 / 按钮，显示当前选中的这些工作总共要花多少时间（estimated time）。
- 计算逻辑：
  - 每选一个 hexagon，就把它的时长算进去。
  - **可以同时进行的工作取最长的**，不是相加。例：Heat-sensing telescope 6 个月 + Watch it spin 4 个月 → 总共 6 个月。
- 资源释放：Watch it spin 4 个月就结束，望远镜那时应该被释放出来，可以接着做 Light color study。
- **试玩时发现的问题：** 把时间推进到第 4 个月后，Light color study 仍然不能选（但有其他 hexagon 被点亮了）。需要确认望远镜释放的逻辑。
  - 查代码后的原因：现在的设计里，共享预约的是 **Heat-sensing telescope 和 Light color study**，二选一、**永久**互斥（选了一个，另一个就显示 "SLOT USED"）。Watch it spin 是独立团队，不占这个预约。所以等多久都解锁不了，跟玩家以为的"用完就释放"不一样。需要决定：保留二选一，还是改成用完释放、排队使用。

## 11. Send a scout spacecraft：逻辑有问题（暂时搁置，这一轮不改）

- 觉得 "Send a scout spacecraft" 这里的逻辑不太对，具体哪里不对还没说完。
- 现状（代码）：需要 24 个月，结果是表面信息 "boulder-rich"。

## 12. 总原则：逻辑要简化（目标 9–12 岁）

- 现在的设备占用 / 时间逻辑太复杂，9–12 岁的孩子不太可能自己发现其中的规则，容易失去动力（demotivated）。
- 以下第 13–15 条是简化方案，取代第 9、10 条的细节。

## 13. 显示本轮 Data Collection 的预计耗时

- 在醒目位置（如顶部）显示：**本轮选中的工作预计需要多少时间**。
- 算法：同时进行的工作，取**最长**那一项的时长（不是相加）。例：Heat-sensing telescope 6 个月 + Watch it spin 4 个月 → 预计 6 个月。

## 14. 按设备 / 仪器给工作分类

- hexagon 不再只按线索关系排，改为**按使用的设备分组**：每台设备下面列出它能做的几项工作。
- 设备用**真实名称**（建议见下方"设备分组建议"）。
- 同一台设备一次只能做一项：选了其中一项，同设备的其他项**变暗**。
- 变暗的项旁边放一个 **"?"**，点开说明：这台设备正被占用，所以现在不能用。
- **已定：做完就释放。** 设备上的工作完成后，同设备的其他工作重新开放，可以在下一轮选。例：IRTF 做完 Heat-sensing 后，Light color study 重新可选。（取代现在代码里的永久二选一。）

### 设备分组建议（基于真实设施，待确认）

| 设备（真实名称） | 能做的工作 | 依据 |
|---|---|---|
| **NASA Infrared Telescope Facility (IRTF)**，夏威夷 Mauna Kea | Heat-sensing（测宽度）、Light color study（测成分） | 现实中 IRTF 既做近地小行星热红外测尺寸，也用 SpeX 光谱仪测成分，两项正好共用一台望远镜 |
| **光学望远镜**（如 Lowell Discovery Telescope） | Watch it spin（亮度变化 → 自转） | 光变曲线用普通光学望远镜观测 |
| **Goldstone Solar System Radar**（NASA 深空网络，加州） | Radar scan（形状 + 轨道） | 真实的 NASA 行星雷达，专门拍近地小行星形状、精修轨道；需要小行星靠近时才能用 |
| **JPL 科学团队 / 计算机模型**（不占设备） | Compare light and heat（反照率）、Estimate its mass（质量） | 这两项是用已有数据计算，不需要望远镜 |
| **侦察飞船**（参考 OSIRIS-REx / Hera） | Send a scout spacecraft（表面） | 需要发射飞船近距离拍摄 |

## 15. 时间轴：用 "Start working" 按钮代替 slider

- 现在靠拖动底部 slider 推进时间，不好用。
- 新流程：
  1. 玩家选好这一轮要做的工作，点 **"Start working"**。
  2. 时间轴上标出每项工作的结束节点。例：Heat-sensing 6 个月、Watch it spin 4 个月 → 时间轴总长 6 个月，第 4 个月处有一个节点。
  3. 点下后，时间**直接跳到第一个节点**（最先完成的工作，这里是第 4 个月）。Watch it spin 出结果，它的设备空出来。
  4. 此时玩家可以选新一轮工作。没做完的工作继续进行（Heat-sensing 还剩 2 个月）。
  5. 时间轴刷新：例如新选的工作要 8 个月，新时间轴总长 8 个月，**第 2 个月处有一个节点**（Heat-sensing 剩下的 2 个月）。
  6. 如此循环：每次跳到下一个节点，玩家可以加选工作，时间轴随之刷新。

## 16. 小行星数据：侧边精简清单 + 完整档案

- **侧边常驻（精简版）：** 右侧的 asteroid fact file 简化成类似 task list 的清单，告诉玩家还有哪些数据要收集、哪些还未知，已收集的打勾。
- **完整档案（点开查看）：** 加一个图标按钮（像文件夹 / 日志），点进去看目前收集到的全部数据，内容更完整，并用**图表**和**表格**呈现，记录清楚。

## 17. 音效和配乐（试玩后反馈）

- Intro 部分加背景音乐。
- 在实验室里点按钮时有音效；例如 "Take more pictures" 配相机快门声。

## 18. JPL Science Team 两项工作能同时进行？

- 现在 Compare light and heat 和 Estimate its mass 可以同时选、同时开始，不确定是否合理。
- 说明：这是按设计来的。两项都是用已有数据做计算，不占望远镜，所以标成 "MANY AT ONCE"。两项都需要先完成 Heat-sensing。

## 19. Asteroid Profile（Mission handoff）页面重做

- 现在内容挤在卡片左上角，下面一大块空白。改为在卡片中**居中**。
- 进入 spacecraft design 之前，加一个小 summary / report：用简单的方式展示刚收集到的关键数据（不必全部），带一点互动，营造**成就感 / milestone 感**。
- "My fact file is ready!" 要更醒目，形成动力。

## 20. 进入 Spacecraft Design 的过渡动画

- 点 "Continue to spacecraft design" 后，播放 3–5 秒的过渡动画，营造"我要去 spacecraft design 空间了"的感觉。
- 配一小段音乐。

---

## 已定：玩家角色

**值夜班的行星防御观测员**（Planetary Defense Observer；面向孩子可称 night-shift sky watcher）

- 贴近真实：现实中近地小行星多由巡天项目（如 Catalina Sky Survey）的夜班观测员发现，方法就是比对同一片天空的多张照片找移动的点，与页面玩法一致。
- 串起全程："行星防御"连接观测 → 风险评估 → 建飞船撞击，对应 NASA Planetary Defense Coordination Office 和 DART 任务。
- 适合孩子：身份是"第一次值夜班的新观测员"，容易代入；开场动画可以从走进观测室、坐到望远镜前、发现异常开始。

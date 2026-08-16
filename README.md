# Ship Standard

开发效率不来自「写得更快」，而来自**同一套可检查的验收标准**：功能绿了不算上线，分类、证据、包装、灰度、观察、回滚都就位才算上线。

这个仓库把那套标准拆成**纬度（dimension）**。每个纬度一份文档、一组可勾选门禁、一张「禁止做什么」清单。后续只加新纬度，不重写整本手册。

当前稳定纬度：

| 纬度 | 一句话 | 文档 |
|------|--------|------|
| [launch](./dimensions/launch.md) | 功能做完 ≠ 真正上线 | 8 个阶段 + 打印用门禁 |
| [resilience](./dimensions/resilience.md) | 先取证再归类，一种问题一种动作 | 长跑自动化容错 |
| [diagnose](./dimensions/diagnose.md) | 一个会话只追一个根因 | 分层定位 + 正式路径验收 |
| [quality-kernel](./dimensions/quality-kernel.md) | 产品力取主柱最小值 | 不变量；用户没装到 = 没修 |
| [acceptance-path](./dimensions/acceptance-path.md) | 主路径没勾完不算收尾 | 真实拓扑、双端同号、7 步冒烟 |
| [pre-ship](./dimensions/pre-ship.md) | 上架包装服从内核 | 内测 ≠ 商用；生产守卫 |
| [compound](./dimensions/compound.md) | 产品力靠复利，不靠堆功能 | 先看见 → 改得动 → 写成合同 |
| [probe](./dimensions/probe.md) | 先红后绿，完成由门禁说了算 | 七步环 + 基线 + 架构探针 |
| [doc-system](./dimensions/doc-system.md) | 现行合同短，过期进归档 | 权威表、生成 STATUS、禁止「最新」 |

机器可读目录：[catalog.json](./catalog.json)。

---

## 怎么用

1. 新功能开发完成时，先打开 [launch](./dimensions/launch.md) 的门禁，没勾完的那一项就是还不能上线的原因。
2. 长跑、接码、表单、导入这类会空转的系统，再对照 [resilience](./dimensions/resilience.md)。
3. 收尾修「连上了但不能用」时，用 [diagnose](./dimensions/diagnose.md)；连续打补丁时用 [quality-kernel](./dimensions/quality-kernel.md)；发版勾选用 [acceptance-path](./dimensions/acceptance-path.md)；商店/官网用 [pre-ship](./dimensions/pre-ship.md)。
4. 想让产品力每个季度都变强，用 [compound](./dimensions/compound.md) 定顺序，用 [probe](./dimensions/probe.md) 落七步环。
5. 长项目文档开始互相打架时，用 [doc-system](./dimensions/doc-system.md)；总纲在 [build-standard SCHEME](https://github.com/miounet11/build-standard/blob/main/SCHEME.md)。
6. 某次排障里抽出可复用的做法，按 [dimensions/_template.md](./dimensions/_template.md) 加一个新纬度，并登记到 `catalog.json`。
7. 具体产品的对照表放进 [examples/](./examples/)，不要把密钥、内网地址、库存域名写进纬度正文。

---

## 设计约束

- **可测试。** 验收句用现在时，能写成测试。「系统会更稳」不算。
- **一种问题一种动作。** 禁止把不同失败合成同一种「重试」。
- **停机只认明确信号。** 不认「最近全失败」。
- **密钥不进安装包、不进本仓库。**
- **纬度正交。** 新纬度补缺口，不复制 launch / resilience 已有段落。

---

## 计划中的纬度

这些是提高开发效率的下一步，欢迎按模板补：

| id | 意图 |
|----|------|
| `observe` | 日志必须能分清 skip / cooldown / shed / watchdog / deferred |
| `secrets` | 密钥表、配置 URL、轮换与泄露作废 |
| `rollback` | 回滚条件预先写死，触发则切回上一包 |
| `host` | CPU / 内存 / 线程窗口，基础设施与业务分类分开 |
| `compat` | 最低系统版本、权限向导、WebView/运行时必备组件 |

---

## 许可

高质量软件总纲：[build-standard SCHEME](https://github.com/miounet11/build-standard/blob/main/SCHEME.md)。

---

## 许可

[MIT](./LICENSE)。标准本身公开，方便团队复制和继续加纬度。

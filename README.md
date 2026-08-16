# Ship Standard

**这个仓库只回答一个问题：这版能不能上线。**

功能绿了不算上线。分类、证据、包装、灰度、观察、回滚、停机信号全部就位，并且连续跑过一个业务周期，才算上线。

标准拆成**纬度（dimension）**：一份文档 = 一句话 + 可勾选门禁 + 禁止清单。门禁有**稳定 id**，可以在 PR、发布脚本、豁免单里引用。

| 纬度 | 状态 | 适用 | 一句话 | 现行门禁 |
|------|------|------|--------|----------|
| [launch](./dimensions/launch.md) | stable | all | 功能做完 ≠ 真正上线 | `LAUNCH-1..11` |
| [resilience](./dimensions/resilience.md) | stable | opt-in | 长跑：一种问题一种动作 | `RESIL-3..8` |
| [diagnose](./dimensions/diagnose.md) | stable | all | 一个会话只追一个根因 | `DIAG-1..5` |
| [quality-kernel](./dimensions/quality-kernel.md) | stable | opt-in | 产品力取主柱最小值 | `KERNEL-1` `KERNEL-2` `KERNEL-4..7` |
| [acceptance-path](./dimensions/acceptance-path.md) | stable | opt-in | 主路径没勾完不算收尾 | `PATH-1` `PATH-3..7` |
| [pre-ship](./dimensions/pre-ship.md) | stable | opt-in | 上架包装服从内核 | `PRESHIP-1..7` |
| [compound](./dimensions/compound.md) | draft | opt-in | 产品力靠复利，不靠堆功能 | `COMPOUND-1..6` |
| [probe](./dimensions/probe.md) | stable | all | 完成由门禁证据说了算 | `PROBE-1..6` |
| [doc-system](./dimensions/doc-system.md) | stable | all | 现行合同短，过期进归档 | `DOC-1..6` |

- 机器可读门禁：[gates.json](./gates.json)
- 生成的汇总：[STATUS.md](./STATUS.md)
- 版本与兼容承诺：[CHANGELOG.md](./CHANGELOG.md)

---

## 边界：三仓不重叠

同一件事只有一个权威。

| 问题 | 权威 |
|------|------|
| 高质量软件总纲、十条铁律、成熟度分级 | [build-standard/SCHEME.md](https://github.com/miounet11/build-standard/blob/main/SCHEME.md) |
| **怎么创建**：七步怎么执行、人与 Agent 分工、仓库记忆、最小变绿 | [build-standard](https://github.com/miounet11/build-standard) `practices/` |
| **能不能上线**：门禁 id、主柱、主路径、灰度、回滚 | **本仓** `dimensions/` |
| **创造有没有落成定律**：不删优势、分段、洞察落盘 | [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering) |
| 豁免单、产品仓空合同模板、落地脚本 | build-standard `templates/` |

本仓不写「怎么写代码」。build-standard 不写门禁判定。creativity-is-engineering 不写「这版能不能发给用户」。

---

## 怎么用

1. 发版前打开 [launch](./dimensions/launch.md) 门禁；没勾完的那一项就是不能上线的原因。
2. 按产品类型追加 opt-in 纬度：长跑用 [resilience](./dimensions/resilience.md)，双端用 [acceptance-path](./dimensions/acceptance-path.md)，上架用 [pre-ship](./dimensions/pre-ship.md)。
3. 「连上了但不能用」用 [diagnose](./dimensions/diagnose.md)；连续打补丁用 [quality-kernel](./dimensions/quality-kernel.md)。
4. 想每季度更强，用 [compound](./dimensions/compound.md) 定顺序、[probe](./dimensions/probe.md) 验收红绿证据。
5. 文档开始互相打架，用 [doc-system](./dimensions/doc-system.md)。
6. **引用门禁请用 id**（例如「本次 `PATH-3` 未过，降 beta」），不要引段落标题。
7. 过不了但必须发：写豁免单（有到期日、有 owner），不要静默绕过。豁免模板在 build-standard。

---

## 自检

标准自己先过自己的门禁：

```bash
npm run verify   # 生成 STATUS + 校验 id、CHANGELOG、例子引用、死链、疑似密钥
```

CI 在每个 PR 上跑同一条命令，并在 `STATUS.md` 过期时失败。

---

## 设计约束

- **可测试。** 门禁用现在时，能写成检查。「系统会更稳」不算。
- **id 稳定。** 公布的 id 永不复用、永不改判定；收紧判定 = 新 id。
- **一种问题一种动作。** 禁止把不同失败合成一次「重试」。
- **停机只认明确信号。** 不认「最近全失败」。
- **密钥不进安装包、不进本仓库。** 第三条配置路径不得靠公布主机地址。
- **纬度正交。** 新纬度补缺口，不复制已有段落，也不复制另外两仓。

---

## 已覆盖，不再单开纬度

这些意图已经有现行 id，不要再开同名纬度。

| 意图 | 现行 id |
|------|---------|
| 日志能分清 skip / cooldown / shed / watchdog / deferred | `RESIL-8` |
| 密钥不进包；配置 URL / 粘贴 / 离线第三条路 | `LAUNCH-5` `LAUNCH-11` |
| 回滚条件预先写死 | `LAUNCH-10` |
| 主机负载进看门狗 | `RESIL-7` `LAUNCH-9` |
| 兼容矩阵与权限向导 | `PRESHIP-3` |

---

## 许可

[MIT](./LICENSE)。标准公开，方便团队复制并继续加纬度。

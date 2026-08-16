# 纬度

每个文件是一个独立纬度。读 [_template.md](./_template.md) 再开新文件。

| 文件 | 状态 | 适用 | 一句话 |
|------|------|------|--------|
| [launch.md](./launch.md) | stable | all | 功能做完到真正上线 |
| [resilience.md](./resilience.md) | stable | opt-in | 长跑：先取证再归类 |
| [diagnose.md](./diagnose.md) | stable | all | 收尾修 bug：分层、单根因、正式路径 |
| [quality-kernel.md](./quality-kernel.md) | stable | opt-in | 主柱取 min；不变量；停止消防队 |
| [acceptance-path.md](./acceptance-path.md) | stable | opt-in | 主路径 7 步、真实拓扑、同版本 |
| [pre-ship.md](./pre-ship.md) | stable | opt-in | 上架面服从内核；生产守卫 |
| [compound.md](./compound.md) | draft | opt-in | 复利顺序：看见 → 改得动 → 合同 |
| [probe.md](./probe.md) | stable | all | 发版看得见红绿证据 |
| [doc-system.md](./doc-system.md) | stable | all | 权威表、生成 STATUS、病例归档 |

登记以 [catalog.json](../catalog.json) 为准；门禁 id 以 [gates.json](../gates.json) 为准。

开新纬度先加 id，再写文档，再跑 `npm run verify`。清单项缺 id、或 id 未登记、或现行清单勾了已废止 id，都会红。

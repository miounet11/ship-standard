# 例子：标准自己过自己的门禁

对照 [doc-system](../dimensions/doc-system.md)。判定对象是本仓，不是某个产品仓。

| 要求 | 门禁 |
|------|------|
| README 权威表存在；上线 / 创建 / 定律各链一份 | `DOC-1` |
| `STATUS.md` 为生成物，version 与 catalog / package 一致 | `DOC-2` |
| 打开的缺口写在 CHANGELOG / 风险说明，不另开第三份手写状态 | `DOC-3` |
| 产品病例进 `examples/`，不占纬度正文当现行手册 | `DOC-4` |
| 没有文件名或标题声称「当前唯一版本」 | `DOC-5` |

`npm run verify` 还锁定：`CHANGELOG.md` 必须有 `## version`；现行 block 必须被例子用 `` `ID` `` 引用；已废止 id 不得出现在 `- [ ]` 清单里。

一问一仓：能不能上线是本仓；怎么创建是 [build-standard](https://github.com/miounet11/build-standard)；洞察有没有落成定律是 [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering)；六面修交接本是 [ability-harness](https://github.com/miounet11/ability-harness)；迭代漏审是 [review-harness](https://github.com/miounet11/review-harness)。

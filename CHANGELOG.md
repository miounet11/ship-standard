# Changelog

标准本身也要能被安全采用：门禁 id 一旦公布就不改含义，只新增或标 deprecated。

## 0.5.0

- 新增 [gates.json](./gates.json)：60 条门禁有稳定 id、severity、stage。产品仓可在豁免、PR 模板、发布脚本里引用 id。
- 所有纬度的门禁清单加上 id；`checks/check.mjs` 强制 id 与 gates.json 双向一致。
- 新增 `checks/` 自检与 CI：这个标准仓自己先过自己的门禁。
- 新增生成的 [STATUS.md](./STATUS.md)。
- 明确边界：创建侧归 [build-standard](https://github.com/miounet11/build-standard)，本仓只管验收与上线。
- 修掉 README 重复的「许可」标题（正是 doc-system 要挡的漂移）。

## 0.4.0

- 新增纬度 `doc-system`：权威表、生成 STATUS、病例归档、禁止「最新」。

## 0.3.0

- 新增纬度 `compound`、`probe`（来自长期浏览器产品的复利做法）。

## 0.2.0

- 新增纬度 `diagnose`、`quality-kernel`、`acceptance-path`、`pre-ship`（来自远控收尾）。

## 0.1.0

- 首发纬度 `launch`、`resilience`。

## 兼容承诺

- 门禁 id 永不复用，永不改判定含义。
- 收紧判定 = 新 id + 旧 id 标 `deprecated`。
- `warn` 升 `block` 属于 minor 变更，会在本文件写明升级条件。

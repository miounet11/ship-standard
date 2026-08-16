# Changelog

标准本身也要能被安全采用：门禁 id 一旦公布就不改含义，只新增或标 deprecated。

## 0.7.0

切掉本仓内部重复判定，并把自检锁到和 creativity-is-engineering 同一套合同纪律。

- 废止 `RESIL-1` → `LAUNCH-2`、`RESIL-2` → `LAUNCH-1`。分类语料和主路径四步只在 launch 伞下判一次。
- `quality-kernel`、`acceptance-path`、`compound` 改为 opt-in，并标 draft。`PATH-2` / `KERNEL-3` 仍带产品形状，下个 minor 再泛化。
- `verify` 锁定：`CHANGELOG` 必须有 `## version`；例子里的 `` `ID` `` 必须已登记；现行 block 必须被例子引用，或标 `"evidence": "none"`；已废止 id 不得出现在 `- [ ]` 清单。
- README 补上与 [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering) 的边界。
- 删掉「计划中的纬度」表。`observe` / `secrets` / `rollback` / `host` / `compat` 已分别被 `RESIL-8`、`LAUNCH-5`、`LAUNCH-10`、`RESIL-7`+`LAUNCH-9`、`PRESHIP-3` 覆盖。
- `launch.md` 阶段 8 不再复述 resilience；改为阶段 → id 对照。`LAUNCH-5` 第三条路径在正文澄清为离线粘贴或镜像，不要求公布主机地址。id 本身不改、不可豁免。
- 例子改为只引用门禁 id。

未改：`LAUNCH-5` / `PRESHIP-4` 仍不可豁免；`PROBE-1` 仍验收七步证据，执行手册仍在 build-standard。

## 0.6.0

- 无合同变更。`catalog.json` / `gates.json` / `package.json` 与 0.5.0 对齐为同一 version 号。本条补记，避免再出现「三份 JSON 已升、CHANGELOG 没有对应节」的漂移。

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

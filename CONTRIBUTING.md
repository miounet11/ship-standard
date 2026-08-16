# 如何给这个标准加纬度

目标：让下一次发版少一次事故，而不是把手册写长。

本仓库自己也走 [probe](./dimensions/probe.md)：先让 `npm run verify` 红，再补文档变绿。七步执行看 [build-standard](https://github.com/miounet11/build-standard)。

## 加一个新纬度

1. 先在 [gates.json](./gates.json) 里加门禁：新 `id` 前缀 + `dimension` + `severity` + `stage` + `text`。
2. 复制 [dimensions/_template.md](./dimensions/_template.md) 为 `dimensions/<id>.md`。
3. 门禁清单每一项都要写成 `` - [ ] `ID` 文本 ``。缺 id 会被 `npm run verify` 拦住。
4. 在 [catalog.json](./catalog.json) 和 [README.md](./README.md) 各加一行；`catalog.json`、`gates.json`、`package.json` 的 `version` 必须一致。
5. 在 [CHANGELOG.md](./CHANGELOG.md) 记一条 `## <version>`。
6. 每个新的 block id 必须出现在 `examples/` 的 `` `ID` `` 里，或在 `gates.json` 标 `"evidence": "none"`。
7. 在 `gates.json` 的 `applies` 写清 `all` 或 `opt-in`。
8. 跑 `npm run verify`。绿了才提。

先确认意图不是已有 id。`observe` / `secrets` / `rollback` / `host` / `compat` 已经分别是 `RESIL-8` / `LAUNCH-5` / `LAUNCH-10` / `RESIL-7` / `PRESHIP-3`。

## 改已有纬度

- 收紧一条门禁的判定：**加新 id**，旧 id 标 `deprecated` + `supersededBy`。不要原地改含义。
- 已废止 id 写在纬度的「已废止」段落（普通列表，**不要**写成 `- [ ]` 复选框）。
- `warn` 升 `block`：写明升级条件（例如「夜间连续两次绿」）。
- 不要删「禁止」段落——那是这份标准挡事故的部分。
- 案例可以过期；原则不为迁就某次实现变软。
- 不要把 build-standard 的执行手册或 creativity-is-engineering 的护城河抄进现行清单。
- 不要把 `LAUNCH-5` / `PRESHIP-4` 移出 `nonWaivable`。

## 不要提交

- 密钥、token、安装包、`.env`
- 真实邮箱、账号、库存域名、内网 IP、口令
- 可复现的攻击步骤或利用代码
- 标题声称「当前唯一版本」的文档（`DOC-5` 会失败）

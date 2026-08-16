# 如何给这个标准加纬度

目标：让下一次开发少走空转，而不是把手册写成小说。

非平凡改动本身也应对本仓库走 [probe](./dimensions/probe.md) 的七步：先红灯（缺纬度、缺门禁），再补文档。

## 加一个新纬度

1. 复制 [dimensions/_template.md](./dimensions/_template.md) 为 `dimensions/<id>.md`。
2. `id` 用小写短横线，例如 `observe`、`probe`。
3. 正文必须有：一句话、何时用、门禁清单、禁止项、至少一条可写成测试的验收句。
4. 在 [catalog.json](./catalog.json) 的 `dimensions` 数组里加一条，`status` 用 `draft` 或 `stable`。
5. 在 [README.md](./README.md) 的表格里加一行。
6. 产品对照、具体报错原文、内部路径放进 `examples/`，不要写进纬度正文。

## 改已有纬度

- 改门禁或禁止项时，同步改对应的验收句。
- 不要删掉「禁止」——那是这个仓库能提高效率的部分。
- 案例可以过期；原则不要为迁就某次实现而变软。

## 不要提交

- 密钥、配置 URL 里的 token、安装包、`.env`
- 真实邮箱、SSO、库存域名、内网 IP、SSH 口令
- 可复现攻击步骤或利用代码

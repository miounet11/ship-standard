# 文档系统：现行合同短，过期文件进归档

高质量软件的文档不是越多越好。长项目里，多份「最新」会让下一会话读错并写错。创建侧制度见 [build-standard](https://github.com/miounet11/build-standard) 的 `practices/authority.md` / `status.md` / `archive.md`。洞察落成定律见 [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering)。

本纬度只验收：**发版时文档有没有在帮门禁，而不是在帮倒忙。**

---

## 一句话

**每类问题只认一份现行文件；STATUS 只生成；病例不占现行目录；标题禁止「最新」。**

---

## 门禁

- [ ] `DOC-1` 权威表（`product/README.md` 或等价）存在，每类问题只链一份
- [ ] `DOC-2` `STATUS.md` 为生成物，version 与包配置一致
- [ ] `DOC-3` 打开的 S1 写在风险册里，不写在第三份手写状态里
- [ ] `DOC-4` 本轮新病例已挂不变量编号，或已进 `docs/archive/`
- [ ] `DOC-5` 仓库内没有文件名 / 标题声称「当前唯一版本」的现行文档
- [ ] `DOC-6` 身份文件（AGENTS / clavue）不另写进度百分比

---

## 禁止

- 两份总纲同时「以本文为准」
- 手改进度百分比
- 用病例堆代替现行规格
- 验收清单空着仍标正式发布

---

## 验收句

1. 不打开作者聊天，也能根据权威表找到下一步和现在坏在哪。
2. STATUS 上的 version 与安装包 / OTA 对得上，或明确写「通道未知」。
3. 正式发布时现行目录里没有带旧版本号的「当前操作手册」。

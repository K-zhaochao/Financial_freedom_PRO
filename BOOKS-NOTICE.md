# 参考书 PDF 收录声明

本仓库的 `dist/books/` 目录收录了 17 册理财与投资类书籍的 PDF，用于课程写作时的原文核对，并已接入网站的「参考书架」供**在线试读**。

## 版权归属

- 这些书籍的著作权归**原作者与出版方**所有，本仓库不主张任何权利。
- 收录目的仅为**个人学习、研究与非商业性阅读**，不得用于商业用途、二次分发或任何形式的售卖。
- 课程正文是对书中方法的转述与重新组织，并非原书替代品；引用只保留必要的关键短语。

## 侵权联系与删除

如权利人认为收录内容侵犯其权益，请通过以下任一方式联系，我们将在核实后**立即删除**相关文件并说明处理结果：

- GitHub Issues：<https://github.com/K-zhaochao/Financial_freedom_PRO/issues>
- 电子邮箱：<!-- 把下面的占位符替换成你的邮箱，网站会自动显示 -->（待填写）

提交时请说明：书名、权利证明或权利人身份、要求处理的范围（单个文件或全部）。我们不会要求额外的举证成本。

## 如何撤下

维护者可以随时一键撤下站内 PDF：

```powershell
# 删除 dist/books 与清单文件
node _research/tools/sync-books.mjs --remove

# 从仓库中移除（如已提交）
git rm -r --cached dist/books dist/books-index.js
```

撤下后站点会自动隐藏所有「在线阅读」按钮（列表里显示「未收录电子版」），课程内容不受影响——课程中标注的章节与导读仍然有效，读者可自行寻找纸质书或电子版。

## 收录范围与技术说明

- 文件命名使用书目 key（如 `dist/books/index.pdf`），映射关系由 `_research/tools/sync-books.mjs` 生成到 `dist/books-index.js`。
- 只收录核心参考时（约 50 MB，9 册）：`node _research/tools/sync-books.mjs --set=core`。
- 查看当前收录状态：`node _research/tools/sync-books.mjs --check`。
- 仓库同时部署到 GitHub 与静态托管平台，PDF 随站点一起发布；若平台限制单次推送体积，可改用 `--set=core` 只发布核心书目，或按平台文档启用 Git LFS。
- 首次收录约 143 MB，会让仓库克隆变重；后续若要彻底从 Git 历史中移除，需要重写历史（`git filter-repo`）并强推。

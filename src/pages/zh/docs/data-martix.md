---
path: "/zh/data-matrix"
date: 2020-02-01T21:07:25.962Z
title: "数据阵列"
author: bradwoo8621
---

<p class="sub-title">为动态产制海量数据测试用例而生。</p>

数据阵列为了处理复杂场景而设计，目标是重用Flow，并且在一个Flow上测试各种不同的数据场景。

# 测试覆盖率
这里讨论的测试覆盖率并不是仅仅指标准流程，而更重要的是指整系统所有流程的测试覆盖率。总所周知，测试覆盖率是测试工作的主要指标之一，或者某种程度上说，它是衡量测试工作完成度的最好的指标。但是考虑到100%的测试覆盖率是不现实的，所以尽最大努力接近才是最重要的目标。

# 散逸性
为了提高测试覆盖率，我们不得不准备很多不同数据场景的测试用例。但是非常不幸，在页面测试中，数据始终散落在网页的各个部分，很难被抽取和组织，于是测试人员不得不将已有的测试用例文件不断的复制粘贴，并修改新文件中关于数据的部分。  
在[教程](/tutorial/)中，我们介绍了[Flow参数化](/tutorial/flow-settings#parameterization)，所以现在已经可以将参数抽取和进行有效的组织了。那么下一步，我们将非常荣幸的介绍如何利用已经抽取的参数来处理更多的数据测试用例。

# 循序渐进
## 安装新播放器
首先需要安装新的阵列播放器，他在标准播放器的基础上，进一步提供了处理数据阵列的能力。  

> 如需帮助回忆如何在CI服务器上设置标准播放器, 请由[CI](/ci/)进入。

现在我们开始使用新播放器替代标准播放器`last-hit-replayer`

```bash
yarn add last-hit-matrix
```

> 新播放器`last-hit-matrix`的使用方式与标注播放器`last-hit-replayer`完全一致。  
> 当它被安装在当前目录时，可以使用`npx` or `yarn run`执行；当它被全局安装时，可以使用直接`last-hit-matrix`命令。  

## 准备数据
到现在为止，与标准播放器的使用方式完全一致。在没有阵列数据被扫描到时候，阵列播放器的行为与标准播放器保持完全一致。  
那么现在我们开始着手准备真正的阵列数据。

### 创建数据阵列存储目录
- 找到您的工作空间
- 在工作空间根目录下创建`workspace-folder/.matrix`目录

### 创建数据阵列文件
回忆Yandex搜索Flow(`my-first-flow@my-first-story`)，假设搜索关键字的值已经被抽取成为参数，命名为`keyword`。  

> 译者注：Yandex搜索Flow可以访问[快速开始](/zh/quick-start/)

- 创建阵列文件`workspace-folder/.matrix/my-first-story/my-first-flow.json`，
- 准备2个数据场景，当然参数`keyword`的值不同，
- 设置`X`和`Y`为不同场景的关键字。

```json
[
	{
		"key": "X",
		"params": {
			"keyword": "good"
		}
	},
	{
		"key": "Y",
		"params": {
			"keyword": "excellent"
		}
	}
]
```

**完成！**
现在重新执行一下播放器，看一下会发生什么？

### 数据依赖
很多情况下，Flow之间会有数据依赖，数据阵列播放器也针对此场景进行了支持。假设
- 有一个`my-second-flow`依赖于`my-first-flow`，
- `my-first-flow`的参数`keyword`同时也被设置为输出参数，
- `my-second-flow`也设置了一个输入参数，名为`keyword`。

按下面的步骤， 
- 创建阵列文件`workspace-folder/.matrix/my-first-story/my-second-flow.json`，
- 同样准备2个数据场景，当然参数`keyword`的值不同，
  > 译者注：由于参数是自`my-first-flow`接收的，因此阵列文件中并没有定义参数值，
- 设置`A`和`B`为不同场景的关键字，
  - `my-second-flow?A`依赖于`my-first-flow?X`，
  - `my-second-flow?B`依赖于`my-first-flow?Y`。

```json
[
	{
		"key": "A",
		"depends": {
			"my-first-flow@my-first-story": "X"
		}
	},
	{
		"key": "B",
		"depends": {
			"my-first-flow@my-first-story": "Y"
		}
	}
]
```

现在重新执行一下播放器，看一下会发生什么？

> 多依赖同样支持。

## 工作空间扩展
如果用到工作空间扩展，需要注意做一个小升级。  
回忆[工作空间扩展#定义入口](/workspace-extension#define-extension-entry-point)，如下定义了一个工作空间扩展：

```typescript
import { AbstractWorkspaceExtensionEntryPoint } from 'last-hit-workspace-extension';

class WorkspaceExtensionEntryPoint extends AbstractWorkspaceExtensionEntryPoint {
	getHandlerLocation(): string {
		return __dirname;
	}
}
```

仅需修改为

```typescript
import { AbstractMatrixWorkspaceExtensionEntryPoint } from 'last-hit-matrix-workspace-extension';

class WorkspaceExtensionEntryPoint extends AbstractMatrixWorkspaceExtensionEntryPoint {
	getHandlerLocation(): string {
		return __dirname;
	}
}
```

唯一的修改是改变了超类。当然`last-hit-matrix-workspace-extension`需要被首先安装到工作空间扩展中。

# 最佳实践
请不要吝啬您的成功经验，在这里[分享您的最佳实践](https://github.com/last-hit-aab/last-hit-pages)。

# 依赖包
- [last-hit-matrix](https://www。npmjs。com/package/last-hit-matrix)
- [last-hit-matrix-workspace-extension](https://www。npmjs。com/package/last-hit-matrix-workspace-extension)

# 使用许可
未来数据阵列将会以商用许可的形式发布。但现在我们提前发布了金丝雀版本，您现在可以免费使用。  

> 我们保留收回所有版本(包括金丝雀版本)免费使用许可的权利。
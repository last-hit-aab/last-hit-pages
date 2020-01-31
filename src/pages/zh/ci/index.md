---
path: "/zh/ci"
date: 2019-12-23T20:09:19.962Z
title: "持续集成"
author: bradwoo8621
---

<p class="sub-title">大家都喜欢持续集成，我们也是。</p>

# 在任意目录
## 安装

```bash
npm install -g last-hit-replayer
```

或者

```bash
yarn global add last-hit-replayer
```

推荐使用Yarn。了解更多信息，请参考[yarnpkg.com](https://yarnpkg.com/)

> [Node.js](https://nodejs.org/en/download/)，必须12.11+以上。

## 回放

### 回放整个工作空间

```bash
last-hit-replayer --workspace=directory/to/your/workspace
```

### 指定回放Story

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name
```

### 指定回放Flow

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name
```

> 如果没有指定Story名称，则Flow名称将被忽略。

# 在您的项目
## 安装

```bash
npm install last-hit-replayer
```

或者

```bash
yarn add last-hit-replayer
```

推荐使用Yarn。了解更多信息，请参考[yarnpkg.com](https://yarnpkg.com/)

## 添加启动脚本

在`package.json`中

```json{numberLines: 1}
"script": {
  "start": "last-hit-replayer"
}
```

## 回放

### 回放整个工作空间

```bash
yarn start --workspace=directory/to/your/workspace
```

### 回放指定Story

```bash
yarn start --workspace=directory/to/your/workspace --story=your-story-name
```

### 回放指定Flow

```bash
yarn start --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name
```

> 如果没有指定Story名称，则Flow名称将被忽略。

# 并行回放
持续集成可以通过命令行参数`--parallel`使用并行回放。

以下是合法的`--parallel`参数值：
- `整数`, 指定使用子进程个数。
- `非整数`, 基于CPU核数指定使用子进程个数。

例：  
- 启动8个子进程，无论当前有多少CPU核。

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --parallel=8
```

例：  
- 如果当前CPU为16核，那么`16 * 0.8 = 12.8` -> 13个子进程将被启动。
- 如果当前CPU为8核，那么`8 * 0.8 = 6.4` -> 6个子进程将被启动。

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --parallel=0.8
```

例：  
- 如果当前CPU为16核，那么`16 * 1.2 = 19` -> 19个子进程将被启动。
- 如果当前CPU为8核，那么`8 * 1.2 = 10` -> 10个子进程将被启动。

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --parallel=1.2
```

> 没有指定`--parallel`，则在单进程模式下运行。

# 命令行参数
所有的命令行参数都会以前缀`--settings`开始，例如`--settings-sleepAfterChange`。

## Change Step后等待时间
某些情况下，真正的内存数据模型变化会被延迟执行。可以全局设定`--settings-sleepAfterChange`参数。  

例：  
```html{numberLines: 1}
<input type="input" onChange="onChange" />
```

```javascript{numberLines: 1}
let changeTimeout;
const onChange = () => {
	if (changeTimeout) {
		clearTimeout(changeTimeout);
	}
	setTimeout(() => {
		// sync dom value into in memory model
	}, 200);
}
```

> 以上设置中，每个Change Step后将会等待200毫秒。

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --settings-sleepAfterChange=200
```

## 慢Ajax时间
可以通过设置慢Ajax时间针对响应较慢的Ajax访问进行统计，默认为`500毫秒`.

例：  

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --settings-slowAjaxTime=300
```

> 以上设置中，Ajax访问如果超过300毫秒，将会作为慢Ajax被统计。

# 环境参数
环境设置可以通过工具进行设置。

## 命令行参数
所有的命令行参数都可以在环境参数中被设置。如果命令行中具有同样参数，则以命令行为优先。

以下是一个工作空间的环境设置示例，

```json{numberLines: 1}
{
	"name": "last-hit-demo",
	"envs": [
		{
			"name": "demo-env",
			"slowAjaxTime": 400
		}
	]
}
```

使用如下命令行启动时，

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --env=demo-env
```

则任何超过400毫秒的Ajax访问会作为慢Ajax被统计。

以下为通过命令行覆盖环境设置的示例，

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --env=demo-env --settings-slowAjaxTime=300
```

则任何超过300毫秒的Ajax访问会作为慢Ajax被统计。

## URL替换
某些时候，测试用例在一个环境录制，需要在另一个环境回放。则URL可以通过环境设置进行替换。

以下是一个工作空间的环境设置示例，

```json{numberLines: 1}
{
	"name": "last-hit-demo",
	"envs": [
		{
			"name": "demo-dev",
			"urlReplaceRegexp": "^https?:\\/\\/localhost:3000(.*)$",
			"urlReplaceTo": "http://demo-dev.domain.com$1"
		}
	]
}
```

则Step的URL将根据指定的正则表达式和替换值进行替换。  
如果需要多个替换规则，使用`&&`间隔，  

```json{numberLines: 1}
{
	"name": "last-hit-demo",
	"envs": [
		{
			"name": "demo-dev",
			"urlReplaceRegexp": "^https?:\\/\\/localhost:3000(.*)$&&^https?:\\/\\/localhost:3002(.*)$",
			"urlReplaceTo": "http://demo-dev.domain.com$1&&http://demo-dev2.domain.com$1"
		}
	]
}
```

> 请保证正则表达式和替换值的个数一致。

# 结果搜集
回放之后，所有的结果都将被在工作空间目录和回放执行目录输出，您可以按照您的要求重新进行组织。  
我们推荐将关键指标数据使用邮件通知方式告知您的团队，通常持续集成服务都会提供此特性。  
另一个选项是选用我们提供的[中央管理服务](/zh/admin-server/)对您的数据进行搜集和分析。

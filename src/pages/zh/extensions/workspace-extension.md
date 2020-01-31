---
path: "/zh/workspace-extension"
date: 2019-12-23T20:09:19.962Z
title: "工作空间扩展"
author: bradwoo8621
---

<p class="sub-title">本页为Last-Hit工作空间扩展详细说明。</p>

# 概念
某些时候因为某些原因，仅仅依靠录制的数据无法进行正确的回放，例如重复校验、数据检查、不同的环境使用不同的账号等。  
工作空间扩展正是为了解决此类场景而设计，为扩展Flow和Step在某些复杂场景下的适应能力，提供强大而动态的扩展方式。

# Extension Points
总共有7个扩展点，
- `Environment Prepare`：环境准备
- `Story Prepare`：Story准备
- `Flow Should Start`：Flow即将开始
- `Step Should Start`：Step即将开始
- `Step On Error`：Step发生错误
- `Step Accomplished`：Step结束
- `Flow Accomplished`：Flow结束

> **以下名称仍然使用英文以便与代码进行对应。**  

# 准备
## 创建工作空间扩展包
- 找到您需要扩展的工作空间目录
- 在工作空间根目录下创建扩展目录`workspace-folder/.scripts`
- 初始化为一个NPM包

	```bash
	npm init
	```
	> 在package.json中设置包名称与您的工作空间名称相同，本例使用`a-demo`。

工作空间扩展包的结构与标准NPM包完全相同。

## 添加TypeScript支持
Typescript是可选的。  

- 安装TypeScript
	```bash
	npm install typescript
	```
- 创建TypeScript配置文件`tsconfig.json`
	```json{numberLines: 1}
	{
		"compilerOptions": {
			"target": "es5",
			"module": "commonjs",
			"moduleResolution": "node",
			"sourceMap": true,
			"emitDecoratorMetadata": true,
			"experimentalDecorators": true,
			"removeComments": false,
			"noImplicitAny": false,
			"suppressImplicitAnyIndexErrors": true,
			"resolveJsonModule": true,
			"esModuleInterop": true,
			"strict": true,
			"outDir": "dist"
		},
		"exclude": ["node_modules"]
	}
	```
- 更新`package.json`
	```json{numberLines: 1}
	{
		"main": "dist/index.js",
		"scripts": {
			"compile": "tsc"
		},
	}
	```

	> 我们推荐Typescript，并且本文档中所有示例均使用Typescript进行书写。

## 添加断言（Assertion）包
我们使用`expect.js`作为断言包，您可以使用您最喜欢的。

```bash
npm install expect.js @types/expect.js
```

## 添加依赖包
必要的依赖只有一个。

```bash
npm install last-hit-workspace-extension
```

# 使用扩展点
我们建议使用约定名称进行扩展，您也可以按照接口定义创建您自己的。

## 定义入口
这是工作空间扩展的入口，需要首先定义扩展文件的位置。

创建文件`workspace-folder/.scripts/index.ts`。  
按照接口定义实现，并返回扩展文件位置。

```typescript{numberLines: 1}
import { AbstractWorkspaceExtensionEntryPoint } from 'last-hit-workspace-extension';

class WorkspaceExtensionEntryPoint extends AbstractWorkspaceExtensionEntryPoint {
	getHandlerLocation(): string {
		return __dirname;
	}
}

export default new WorkspaceExtensionEntryPoint();
```

## Environment Prepare
此扩展点可以更新环境设置。

创建文件`workspace-folder/.scripts/env-pepare.ts`。  
更改`sleepAfterChange`为30毫秒，`slowAjaxTime`为300毫秒。  

```typescript{numberLines: 1}
import { WorkspaceExtensions } from 'last-hit-types';

export default async (
	event: WorkspaceExtensions.EnvironmentPrepareEvent,
	helpers: WorkspaceExtensions.HandlerTestHelper
): Promise<WorkspaceExtensions.PreparedEnvironment> => {
	const { env } = event;

	env.sleepAfterChange = 30;
	env.slowAjaxTime = 300;
	return env;
};
```

> 此时浏览器未打开。

## Story Prepare
此扩展点准备Story参数。

创建文件`workspace-folder/.scripts/my-first-story/story-prepare.ts`。  

```typescript{numberLines: 1}
import { WorkspaceExtensions } from 'last-hit-types';

export default async (
	event: WorkspaceExtensions.StoryPrepareEvent,
	helpers: WorkspaceExtensions.HandlerTestHelper
): Promise<WorkspaceExtensions.PreparedStory> => {
	console.log(`log from extension, get story prepare of story[${event.story.name}]`);
	return event.story;
};
```

> `my-first-story`是Story的名称。

> 浏览器此时未打开。

> 此扩展点为预留扩展点，目前不能修改任何定义值。

## Flow Should Start
此扩展点可修改Flow参数值。

创建文件`workspace-folder/.scripts/my-first-story/my-first-flow/flow-should-start.ts`。  

```typescript{numberLines: 1}
import { WorkspaceExtensions } from 'last-hit-types';

export default async (
	event: WorkspaceExtensions.FlowShouldStartEvent,
	helpers: WorkspaceExtensions.HandlerHelpers
): Promise<WorkspaceExtensions.PreparedFlow> => {
	const { story, flow } = event;
	const { params } = flow;
	(params || []).forEach(param => {
		console.log(param.name, param.type, param.value);
	});
	(flow as WorkspaceExtensions.PreparedFlow)._ = {
		input: {
			key: 'value'
		}
	};
	return flow;
};
```

- 从`flow.params`中获取预定义的参数和值
- 预定义的参数值可能是`undefined`
- 每一个参数都会有三个属性：  
  - `name`：参数名称  
  - `type`：`in`，`out`和`both` （输入，输出和两者）  
    `both`代表这个参数在输入和输出都会被使用  
  - `value`：参数的默认值，通常如果没有设置过的情况下为空字符串
- 如果不需要做任何动作则直接将参数中的flow对象返回
- 如果没有给出参数值，回放器会使用预定义参数的值
- 将您需要返回的参数放在`flow._.input`, 他是一个对象
  - `key`：参数名称
  - `value`：参数值
  - 这里不需要类型
  - 如果返回值，则预定义参数会被全部忽略

在以上示例代码中，无论预定义参数为何，都只有一个参数`key: 'value'`被返回。  
返回的参数与值可以在没有预定义的情况下使用。

> `my-first-story`为Story名称。  
> `my-first-flow`为Flow名称。

> 浏览器此时未打开。

## Step Should Start
此扩展点可以更新Step属性。

创建文件`workspace-folder/.scripts/my-first-story/my-first-flow/f6067c5d-f94d-4275-8263-1f33737b1b42/step-should-start.ts`.  

```typescript{numberLines: 1}
import { WorkspaceExtensions } from 'last-hit-types';

export default async (
	event: WorkspaceExtensions.StepShouldStartEvent,
	helpers: WorkspaceExtensions.HandlerHelpers
): Promise<WorkspaceExtensions.PreparedStep> => {
	const { story, flow, step } = event;
	const { browser: browserHelper } = helpers;
	console.log(
		`log from extension, get step should start of story[${story.name}], flow[${flow.name}], step[index=${step.stepIndex}, stepUuid=${step.stepUuid}]`
	);
	const value = await browserHelper.getElementAttrValue(
		'#some-id',
		'name',
		'47792ef4-3a1e-4d27-9707-abc6fb77bb8b'
	);
	console.log('value from browser operation', value);
	return step;
};
```

- 从`flow.params`获取Flow参数, 此时只能获取输入参数
- 可以更改step的属性值，并且返回给回放器
- `47792ef4-3a1e-4d27-9707-abc6fb77bb8b`是全局唯一的页面UUID. 可以从Step的`uuid`上获取

在这个示例中，尝试获取页面中id为`some-id`的DOM节点的name属性值。

> **不要**改动固定属性的值，例如`uuid`、`type`、`stepUuid`、`stepIndex`等。

> `my-first-story`是Story名称。  
> `my-first-flow`是Flow名称。  
> `f6067c5d-f94d-4275-8263-1f33737b1b42`是全局唯一的Step UUID，可以从Step的`stepUuid`属性上获取。

> 如果Step是Start Step（开始Step，第一步），浏览器此时未打开。  
> 如果是其他Step，浏览器此时已打开。

## Step On Error
此扩展点主动捕捉到Step回放中的错误，可以选择修复（忽略错误）或者忽略（仍然报错）。

创建文件`workspace-folder/.scripts/my-first-story/my-first-flow/f6067c5d-f94d-4275-8263-1f33737b1b42/step-on-error.ts`。  

```typescript{numberLines: 1}
import { WorkspaceExtensions } from 'last-hit-types';

export default async (
	event: WorkspaceExtensions.StepOnErrorEvent,
	helpers: WorkspaceExtensions.HandlerHelpers
): Promise<WorkspaceExtensions.FixedStep> => {
	const { story, flow, step, error } = event;
	const { browser: browserHelper } = helpers;
	console.error(error);
	return { ...step, _: { fixed: true } };
};
```

回放器在遇到Step回放出错时，默认行为是报错并停止回放。在这里示例中，错误被扩展点主动捕捉（主动捕捉无需代码，为引擎行为）并选择修复。因此回放器在获取到修复信号之后，继续进行回放。如果不需要修复错误，则将参数Step直接返回即可。

> `my-first-story`是Story名称。  
> `my-first-flow`是Flow名称。  
> `f6067c5d-f94d-4275-8263-1f33737b1b42`是全局唯一的Step UUID，可以从Step的`stepUuid`属性上获取。

> 在Start Step（开始Step，第一步）出现错误，不会触发本扩展点逻辑。

> 浏览器此时已打开。

## Step Accomplished
此扩展点通常进行断言。

创建文件`workspace-folder/.scripts/my-first-story/my-first-flow/f6067c5d-f94d-4275-8263-1f33737b1b42/step-accomplished.ts`。  

```typescript{numberLines: 1}
import { WorkspaceExtensions } from 'last-hit-types';
import expect from 'expect.js';

export default async (
	event: WorkspaceExtensions.StepAccomplishedEvent,
	helpers: WorkspaceExtensions.HandlerHelpers
): Promise<WorkspaceExtensions.AccomplishedStep> => {
	const { story, flow, step } = event;
	const { browser: browserHelper, test: testHelper } = helpers;
	console.log(
		`log from extension, get step accomplished of story[${story.name}], flow[${flow.name}], step[index=${step.stepIndex}, stepUuid=${step.stepUuid}]`
	);
	await testHelper.test(
		'check name of element[#some-id] is [some-attr-value]',
		async (): Promise<void> => {
			const value = await browserHelper.getElementAttrValue(
				'#some-id',
				'name',
				'47792ef4-3a1e-4d27-9707-abc6fb77bb8b'
			);
			expect(value).to.be('some-attr-value');
		}
	);
	await testHelper.test(
		'check value of element[#some-id]',
		async (): Promise<void> => {
			await testHelper.test(
				'should be 你好',
				async (): Promise<void> => {
					const value = await browserHelper.getElementPropValue(
						'#some-id',
						'value',
						'47792ef4-3a1e-4d27-9707-abc6fb77bb8b'
					);
					expect(value).to.be('some-prop-value');
				}
			);
		}
	);
	return { ...step, _: { passed: true } };
};
```

- 使用您最熟悉的第三方书写断言
- 如果断言失败，请抛出错误（通常断言库包含此功能）
- `Test Helper`会主动捕获断言异常
- 任何断言成功或者失败都会被回放器搜集
- 断言异常不会再触发`Step On Error`扩展点

> `my-first-story`是Story名称。  
> `my-first-flow`是Flow名称。  
> `f6067c5d-f94d-4275-8263-1f33737b1b42`是全局唯一的Step UUID，可以从Step的`stepUuid`属性上获取。

> 浏览器此时已打开。

## Flow Accomplished
此扩展点可以构造Flow输出参数。

创建文件`workspace-folder/.scripts/my-first-story/my-first-flow/flow-accomplished.ts`。  

```typescript{numberLines: 1}
import { WorkspaceExtensions } from 'last-hit-types';

export default async (
	event: WorkspaceExtensions.FlowAccomplishedEvent,
	helpers: WorkspaceExtensions.HandlerHelpers
): Promise<WorkspaceExtensions.AccomplishedFlow> => {
	const { story, flow } = event;
	
	(flow as WorkspaceExtensions.AccomplishedFlow)._ = {
		output: {
			key: 'value'
		}
	};
	return flow;
};
```

- 从`flow.params`获取预定义和输入参数实例
- 每一个参数都有三个属性：
  - `name`: 参数名称
  - `type`: `in`, `out` and `both`（输入，输出和两者）  
    `both`代表这个参数在输入和输出都会被使用  
  - `value`：参数的默认值，通常如果没有设置过的情况下为空字符串  
- 如果没有输出参数需要定义，直接返回参数中的Flow对象即可
- 如果没有指定输出参数值，则回放器使用预定义的输出参数值
- 将您需要返回的参数放在`flow._.output`，他是一个对象
  - `key`: 参数名称
  - `value`: 参数值
  - 这里不需要类型
  - 如果返回值，则预定义参数会被全部忽略

> `my-first-story`是Story名称。  
> `my-first-flow`是Flow名称。  

> 输出的参数值在IDE会将会被忽略。

> 浏览器此时已打开。

# 编译工作空间扩展包
编译工作空间扩展包的方法与编译标准Typescript包完全一致。

```bash
yarn run compile
```

> 时刻保证您的工作空间扩展包处于已编译状态。IDE和CI都不会主动编译您的工作空间扩展包。  
> ES5或者任何NodeJS支持的语法都可以正常工作。

# 在工作空间扩展中维持数据
您可以在工作空间扩展中维持缓存数据，数据可以在Step间共享访问。

> **不要**试图在Story或者Flow之间共享数据。工作空间扩展会使用扩展重载技术保证数据无法采用此类共享方式，以便杜绝数据互相影响。如果需要在Flow之间传递数据，请使用Flow输入输出参数。

# 断言结果搜集
断言异常将被自动搜集。如果您主动捕获断言异常，并且没有抛出其他异常，`Test Helper`将会忽略断言失败并认为该断言成功执行。

# Helpers
## 浏览器Helper
```typescript{numberLines: 1}
const { browser: browserHelper } = helpers;
```

> 如果扩展点当时浏览器尚未打开，则浏览器Helper不会被作为参数预置。

浏览器Helper提供的API如下：

```typescript{numberLines: 1}
export interface IWorkspaceExtensionBrowserHelper {
	getElementAttrValue(
		csspath: string,
		attrName: string,
		pageUuid?: string
	): Promise<string | null>;
	getElementPropValue(
		csspath: string,
		propName: string,
		pageUuid?: string
	): Promise<string | null>;
	isInIDE(): boolean;
}
```

> 如果`pageUuid`没有指定，则从第一个页面中查找。

## 测试Helper
```typescript{numberLines: 1}
const { test: testHelper } = helpers;
```

测试Helper仅提供一个方法如下：

```typescript{numberLines: 1}
interface IWorkspaceExtensionTestHelper {
	test(title: string, fn: () => void | Promise<void>): Promise<this>;
}
```

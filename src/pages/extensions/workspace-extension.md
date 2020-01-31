---
path: "/workspace-extension"
date: 2019-12-19T20:09:19.962Z
title: "Workspace Extension"
author: last-hit-aab
---

<p class="sub-title">This page is a step by step guide of the Last-Hit workspace extension.</p>

# Concept
Sometimes the captured data cannot be replayed for some reason, such as duplicate checks, date checks, different account in different environments etc.  
Workspace extension is designed for resolving these scenarios, provides strong and dynamic capability to extend around each flows and steps for those complex situations.

# Extension Points
There are 7 extension points,
- `Environment Prepare`
- `Story Prepare`
- `Flow Should Start`
- `Step Should Start`
- `Step On Error`
- `Step Accomplished`
- `Flow Accomplished`

# Prepare
## Create Extension Package
- Find your workspace
- Create folder names `workspace-folder/.scripts`, under workspace root folder
- Initialize it as a NPM package

	```bash
	npm init
	```
	> Set package name as `a-demo`, just same as your workspace name.

It's done, exactly same as initialize a NPM package.

## Add TypeScript
Typescript is optional.  

- Install TypeScript
	```bash
	npm install typescript
	```
- Create TypeScript configuration
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
- Update `package.json`
	```json{numberLines: 1}
	{
		"main": "dist/index.js",
		"scripts": {
			"compile": "tsc"
		},
	}
	```

	> We recommend TypeScript, and snippets in this guide are all written by TypeScript.

## Add Assertion Package
We use `expect.js` as assertion library, choose your favorite.

```bash
npm install expect.js @types/expect.js
```

## Add Dependency
Only one dependency is necessary.

```bash
npm install last-hit-workspace-extension
```

# Using the Extension Points
We use conventions to name extension files, you can build your own imports and exports.

## Define extension entry point
It's the entrypoint of extension package, extension files location needs to be defined in this file.

Create file `workspace-folder/.scripts/index.ts`.  
Simply appoint the handler location, the parent folder of all handlers.

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
Update environment settings here.

Create file `workspace-folder/.scripts/env-pepare.ts`.  
Change the `sleepAfterChange` to 30ms and `slowAjaxTime` to 300ms.  

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

> Browser is not opened now.

## Story Prepare
Prepare story level variables.

Create file `workspace-folder/.scripts/my-first-story/story-prepare.ts`.  

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

> `my-first-story` is story name.

> Browser is not opened now.

> Currently, only API is ready, but nothing can be changed here.  

## Flow Should Start
Update flow parameters here.

Create file `workspace-folder/.scripts/my-first-story/my-first-flow/flow-should-start.ts`.  

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

- Get predefined parameters from `flow.params`
- Predefined parameters can be `undefined`
- Each parameter has 3 properties: 
  - `name`: name of parameter
  - `type`: `in`, `out` and `both`  
    `both` means this parameter will be used both on input and output
  - `value`: default value of parameter, normally is empty string when not given
- Simply returns given flow object if do nothing
- If no special parameter value given, replayer use predefined parameters definition
- Attach your special parameter values on `flow._.input`, it's an object
  - `key`: parameter name
  - `value`: parameter value
  - Type is not needed
  - The predefined parameters definition should be ignored when `flow._.input` is declared and returned by this extension point

In this case, only one parameter `key: 'value'` will be passed to replayer, no matter what defined in flow.  
Even no predefined paramterer, input parameters still can be defined and passed to replayer here.

> `my-first-story` is story name.  
> `my-first-flow` is flow name.

> Browser is not opened now.

## Step Should Start
Update step parameters here.

Create file `workspace-folder/.scripts/my-first-story/my-first-flow/f6067c5d-f94d-4275-8263-1f33737b1b42/step-should-start.ts`.  

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

- Get flow parameters from `flow.params`, only input parameters are provided.
- Change step property value and return to replayer
- `47792ef4-3a1e-4d27-9707-abc6fb77bb8b` is the page uuid, global unique. On step json, value of `uuid` property.

In this case, try to get the value of name attribute from DOM node, which with id `some-id`.

> **DONOT** change value of fixed properties, such as `uuid`, `type`, `stepUuid`, `stepIndex`, etc.

> `my-first-story` is story name.  
> `my-first-flow` is flow name.  
> `f6067c5d-f94d-4275-8263-1f33737b1b42` is the step uuid, global unique. On step json, value of `stepUuid` property.

> On start step (the first step), browser is not opened now.  
> On any other step, browser is opened now.

## Step On Error
Catch error raised on step replay, fix it or ignore.

Create file `workspace-folder/.scripts/my-first-story/my-first-flow/f6067c5d-f94d-4275-8263-1f33737b1b42/step-on-error.ts`.  

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

Replayer stops replaying when error raised. In this case, error caught by extension and ignored. Replayer will continue steps instead of stopping. Or returns given step to keep original replayer behaviour.

> `my-first-story` is story name.  
> `my-first-flow` is flow name.  
> `f6067c5d-f94d-4275-8263-1f33737b1b42` is the step uuid, global unique. On step json, value of `stepUuid` property.

> Error raised on start step (the first step) doesn't trigger this extension point.

> Browser is opened now.

## Step Accomplished
Do assertion here.

Create file `workspace-folder/.scripts/my-first-story/my-first-flow/f6067c5d-f94d-4275-8263-1f33737b1b42/step-accomplished.ts`.  

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

- Do assertion with your favorite library.
- Throw error when assertion failed
- Error will be caught by `Test Helper`
- Any assertion success and failure will be collected by replayer
- No `Step On Error` to handle the error thrown by this.

> `my-first-story` is story name.  
> `my-first-flow` is flow name.  
> `f6067c5d-f94d-4275-8263-1f33737b1b42` is the step uuid, global unique. On step json, value of `stepUuid` property.

> Browser is opened now.

## Flow Accomplished
Build output here.

Create file `workspace-folder/.scripts/my-first-story/my-first-flow/flow-accomplished.ts`.  

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

- Get predefined & input parameters from `flow.params`
- Each parameter has 3 properties: 
  - `name`: name of parameter
  - `type`: `in`, `out` and `both`  
    `both` means this parameter will be used both on input and output
  - `value`: default value of parameter, normally is empty string when not given
- Simply returns given flow object if no output parameter is needed
- If no special parameter value given, replayer use predefined parameters definition
- Attach your special parameter values on `flow._.output`, it's an object
  - `key`: parameter name
  - `value`: parameter value
  - Type is not needed
  - The predefined parameters definition should be ignored when `flow._.output` is declared and returned by this extension point


> `my-first-story` is story name.  
> `my-first-flow` is flow name.  

> Output is ignored in IDE.

> Browser is opened now.

# Compile Extension Package
Exactly same as plain typescript package.

```bash
yarn run compile
```

> Always keep your extension package compiled. IDE and CI don't compile automatically.  
> ES5 or any syntax supported by NodeJS also works here.

# Keep Data in Workspace Extension
It's OK if you keep data in workspace extension, data can be shared between steps.

> **DONOT** share data between flows or storys. Workspace extension is reloaded for each single flow to avoid data impact. If there is any data must be passed from one flow to another, by flow output parameters.

# Assertion Collecting
Only error of assertion are caught. If you catch the exception by yourself and doesn't re-throw it, test helper ignores it and treat it as passed.

# Helpers
## Broswer Helper
```typescript{numberLines: 1}
const { browser: browserHelper } = helpers;
```

> No browser helper passed if no browser opened at extension point.

Currently there are 3 methods are provided by browser helper.

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

> Get value from first page if no page uuid passed.

## Test Helper
```typescript{numberLines: 1}
const { test: testHelper } = helpers;
```

Only one method `test` is provided by test helper.

```typescript{numberLines: 1}
interface IWorkspaceExtensionTestHelper {
	test(title: string, fn: () => void | Promise<void>): Promise<this>;
}
```

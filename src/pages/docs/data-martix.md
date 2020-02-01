---
path: "/data-matrix"
date: 2020-02-01T21:07:25.962Z
title: "Data Matrix"
author: last-hit-aab
---

<p class="sub-title">For producing a large number of test cases based on one.</p>

Data matrix is designed for complex situations, for reusing flow which needs to be tested by numbers of data scenarios.

# Coverage
Here, the coverage we discussed, is about the coverage of entire system, not just about the standard processes. It is well known as the major indicator of testing, in a way is the best criterion of its measurement. But considering 100% coverage is hard to archieve, quite impractical, try our best to get closer to the goal is the major objective.  

# Scattering
To increase the coverage, we have to prepare a large numbers of cases. Unfortunately, Data always are scattered at everywhere in web pages, hardly to be extracted and organized, so we have to copy & paste case files, and update the values of fields manually.  
In [Tutorial](/tutorial/), we introduce the [parameterize of flow](/tutorial/flow-settings#parameterization), there is already a way to extract and organize parameters. And next, we have much pleasure in introducing the part of how to deal with numbers of data scenarios by these parameters.

# Step by Step
## Setup New Replayer
First of all, install a new replayer, which is based on standard replayer, and introduce the capability of data matrix.  

> Here is a shorcut to [CI](/ci/), help you recall the memory of how to build standard automation in CI server.

Now we use the following replayer instead of `last-hit-replayer`

```bash
yarn add last-hit-matrix
```

> Usage of `last-hit-matrix` is exactly same as `last-hit-replayer`.  
> It can be launched by `npx` or `yarn run` when installed at workspace,  or by `last-hit-matrix` when installed globally.  

## Prepare Data
For now, nothing changed but replayer. Matrix replayer keeps same behavior with standard when no matrix data scanned, and now let's prepare some data.

### Create Matrix Data Folder
- Find your workspace
- Create folder names `workspace-folder/.matrix`, under workspace root folder

### Create Data File
Back to the yandex search flow(`my-first-flow@my-first-story`), assume the keyword is extracted as parameter `keyword`.  

- Create file `workspace-folder/.matrix/my-first-story/my-first-flow.json`.
- Prepare 2 scenarios, with different keywords.
- `X` and `Y` are names of scenarios.

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

**Done.**
Now rerun testing, see what happens.

### Data Dependency
Sometimes there is data dependency between flows, matrix also support that. Assume
- There is a `my-second-flow` depends on `my-first-flow`,
- Parameter `keyword` of `my-first-flow` is also set as an output parameter.
- Also there is an input parameter `keyword` for `my-second-flow`.

Follow the steps as below,  
- Create file `workspace-folder/.matrix/my-first-story/my-second-flow.json`.
- Also prepare 2 scenarios, with different keywords.
- `A` and `B` are names of scenarios.
  - `my-second-flow?A` is depends on scenario `my-first-flow?X`
  - `my-second-flow?B` is depends on scenario `my-first-flow?Y`

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

Rerun testing, see what happens.

> Multiple data dependencies are also supported.

## Workspace Extension
There is a small upgrade when you using matrix replayer and workspace extension.  
Back to [define a workspace extension](/workspace-extension#define-extension-entry-point), like following:

```typescript
import { AbstractWorkspaceExtensionEntryPoint } from 'last-hit-workspace-extension';

class WorkspaceExtensionEntryPoint extends AbstractWorkspaceExtensionEntryPoint {
	getHandlerLocation(): string {
		return __dirname;
	}
}
```

Change to 

```typescript
import { AbstractMatrixWorkspaceExtensionEntryPoint } from 'last-hit-matrix-workspace-extension';

class WorkspaceExtensionEntryPoint extends AbstractMatrixWorkspaceExtensionEntryPoint {
	getHandlerLocation(): string {
		return __dirname;
	}
}
```

The only change is change the super class. Of course you need to install `last-hit-matrix-workspace-extension` to your workspace first.

# Best Practices
Feel free to [submit and share your best practice](https://github.com/last-hit-aab/last-hit-pages).

# Packages
- [last-hit-matrix](https://www.npmjs.com/package/last-hit-matrix)
- [last-hit-matrix-workspace-extension](https://www.npmjs.com/package/last-hit-matrix-workspace-extension)

# License
Data Matrix is under commerical license. Currently the first canary version is released, feel free to take a trail.
---
path: "/ci"
date: 2019-12-19T20:09:19.962Z
title: "Continuous Integration"
author: last-hit-aab
---

<p class="sub-title">Everybody loves continuous integration, we too.</p>

# Directly in any folder
## Install

```bash
npm install -g last-hit-replayer
```

or

```bash
yarn global add last-hit-replayer
```

Yarn is recommanded. For install Yarn, see [yarnpkg.com](https://yarnpkg.com/)

> [Node.js](https://nodejs.org/en/download/) 12 is required.

## Run

### Run whole workspace

```bash
last-hit-replayer --workspace=directory/to/your/workspace
```

### Specify Story

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name
```

### Specify Flow

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name
```


# In your project
## Install

```bash
npm install last-hit-replayer
```

or

```bash
yarn add last-hit-replayer
```

Yarn is recommanded. For install Yarn, see [yarnpkg.com](https://yarnpkg.com/)

## Add script

In `package.json`

```json{numberLines: 1}
"script": {
  "start": "last-hit-replayer"
}
```

## Run

### Run whole workspace

```bash
yarn start --workspace=directory/to/your/workspace
```

### Specify Story

```bash
yarn start --workspace=directory/to/your/workspace --story=your-story-name
```

### Specify Flow

```bash
yarn start --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name
```

> Flow name will be ignored when story name does not specify.

# Parallel
CI can be run in parallel, via `--parallel` cli argument.

Following are legal values of `--parallel`:
- `integer`, specify how many child processes uses in CI.
- `non-integer`, specify how many child processes uses in CI, base on CPU cores.

eg. 
- 8 child processes starts, not matter how many cpu cores there.

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --parallel=8
```

eg. 
- If there are 16 cores, then `16 * 0.8 = 12.8` -> 13 child processes starts.
- If there are 8 cores, then `8 * 0.8 = 6.4` -> 6 child processes starts.

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --parallel=0.8
```

eg. 
- If there are 16 cores, then `16 * 1.2 = 19` -> 19 child processes starts.
- If there are 8 cores, then `8 * 1.2 = 10` -> 10 child processes starts.

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --parallel=1.2
```

> CI is run synchronized if no `--parallel` specified.

# CLI Arguments
All CLI arguments are passed by prefix `--settings`, such as `--settings-sleepAfterChange`.

## Sleep after change
Sometimes the real change in memory data model will be invoked later.  Use `--settings-sleepAfterChange` to set as global.  

eg.
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

> Then wait 200ms for each change step.

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --settings-sleepAfterChange=200
```

## Slow Ajax Time
To count how many ajax requests are slow than given time, default is `500ms`.

eg.

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --settings-slowAjaxTime=300
```

> Ajax slower than 300ms should be counted.

# Environment
Environment can be specified in IDE.

## CLI Arguments
All CLI arguments can be set for each environments, unless they are given in CLI.

A workspace file with env settings as below,

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

And CLI as

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --env=demo-env
```

Then any ajax slower than 400ms should be counted as slow ajax.

Or via CLI, replace env settings,

```bash
last-hit-replayer --workspace=directory/to/your/workspace --story=your-story-name --flow=your-flow-name --env=demo-env --settings-slowAjaxTime=300
```

Then any ajax slower than 300ms should be counted as slow ajax.

## URL Replacement
Sometimes record in one environment, and replay on another environment. The recorded url can be replaced via environment settings.

A workspace file with env settings as below,
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

Then step url should be replace by the given regexp and replace to string.  
Regexps can be splitted by `&&`. 

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

> Make sure length of regexps and tos are same.

# Result Gathering
After run replayer, output files can be found under workspace folder and cli run folder, knitting them as you wish.  
We recommend attach key data and send notification mail to your team, simply using the features provided by CI Server.  
Another option is collecting data to our [Centralized Admin Server](/admin-server/), for further analysis.

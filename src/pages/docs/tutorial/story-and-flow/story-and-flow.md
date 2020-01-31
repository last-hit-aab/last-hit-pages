---
path: "/tutorial/story-and-flow"
date: 2019-12-19T20:09:19.962Z
title: "Story & Flow"
author: last-hit-aab
---

<p class="sub-title">This page is introducing the concept of story and flow.</p>

# Concept of Story and Flow
Flow is the core concept in Last-Hit, traditional called as test case. Flow is a set of steps, usually starts with an url.  
Story is a folder for organizing flows. A long business scenario should be separated as several flows, and stored under one story.  

## Advanced Flow Features
There are several advanced flow features, such as flow dependency, flow parameters, etc. They are useful on complex system, docs can be found in [following chapter](/tutorial/flow-settings/).

# Story
## Create Story
Click `create new one` link, then fill story name,

![Create Story Dialog](./create-story-dialog.png)

Click `OK` button, we have the first story now.

![Workspace with A Story](./workspace-with-a-story.png)

## Story Rename
Right click story, click `Rename` menu,

![Rename Story](./story-rename.png)

Get rename dialog, fill new story name, click `OK` button.

![Rename Story Dialog](./story-rename-dialog.png)

## Story Delete
Right click story, click `Delete` menu,

![Delete Story](./story-delete.png)

Get delete warning, click `OK` button.

![Delete Story Dialog](./story-delete-dialog.png)

> **Note:**  
> **Delete cannot be recovered, be very careful when you do this.**  
> **Flows under story will be deleted at the same time, and also cannot be recovered.**

# Flow
## Create Flow
Right click story, and click `Create Flow` menu,

![Create Flow](./create-flow.png)

Fill flow name,

![Create Flow Dialog](./create-flow-dialog.png)

Click `OK` button, we have the first flow now.

## Flow Rename
Right click flow, click `Rename` menu,

![Rename Flow](./flow-rename.png)

Get rename dialog, fill new flow name, click `OK` button.

![Rename Flow Dialog](./flow-rename-dialog.png)

## Flow Delete
Right click flow, click `Delete` menu,

![Delete Flow](./flow-delete.png)

Get delete warning, click `OK` button.

![Delete Flow Dialog](./flow-delete-dialog.png)

> **Note:**  
> **Delete cannot be recovered, be very careful when you do this.**  
> **Flow dependency will be broken, have to fix it by yourself.**


# Do Record
Now we have the workspace, story and flow. It's time to [do record](/tutorial/do-record/).

<div class="doc-page-links">
	<div>
		<a href="/tutorial/create-workspace/">Previous Chapter: Create Workspace</a>
	</div>
	<div>
		<a href="/tutorial/do-record/">Next Chapter: Record</a>
	</div>
</div>
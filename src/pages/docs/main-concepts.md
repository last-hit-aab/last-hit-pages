---
path: "/main-concepts"
date: 2019-12-19T20:09:19.962Z
title: "Main Concepts"
author: last-hit-aab
---

<p class="sub-title">This page is a discussion of why the Last-Hit is built.</p>

In the past 20 years, there are many proven techniques and tools in this domain. They can do UI automation testing, including recording, replaying, continuous integration, reporting, supporting plugins. Then why Last-Hit have to be built now?

# The Major Challenges
The major challenges of web automation is never about the tools themselves, it's about the methodolodgies, backgrounds and approaches.

## Background
Normally, test team has no or less techical backgrounds, they don't know deeply about how the UI works. And sometimes, they have to learn the technologies which is appointed by test tools. It will spending a long time and with steep learn curve. Obviously, those people who are experts in this tools, they have to understanding how the modern UI works now, and write mass of scripts to support testing the complex scenarios of their company's business. So, in a way, they are another kind of developers, by technologies provided by tools.

## Methodology
An UI automation provider usually provides the following features at least (free or not):
- A tool
  - Can do recording and debugging
  - Case maintenance
- CI supporting
- Report

They are more or less the same in features, no matter which technology is chosen. Here we want to clarify is the most important thing of automation testing is not about the features, but about case maintenance.  
Test team doesn't take participant in development, the real development work. They **DO** know changes of UIs and business logics, but they **DONOT** know under the perceivable world, how frontend developers consider the issues and requirements, and how HTML DOM and CSS change. Unfortunately, case maintenance is always about the underlying changes.  
So, how to detect changes in the underlying world? The only answer is `"ONLY DEVELOPERS KNOW"`, developers decide how to improve their frameworks, libraries and components; developers decides how to handle the special behaviors, developers decides how to fix issues, etc. Obviously, developers are the only choice, they know changes first, they can fix the test cases immediately once code changed.
According to these reasons, Last-Hit use the plain JSON format to save test cases, anybody can do maintenance easily. After all, they are structured data, we believe you can find the best way by yourself, even no tool helped.  
Again, the most important thing is, let developers in. They built website, they produced changes from one release to another, they know changes first and they are all experts at handling lots of structured data. No one is more suitable for case maintenance.  
And let test team focus on design and build more e2e scenarios, increase case coverages, etc. For a project or an enterprise, that's the thing really matters. And for this, learn our [Data Matrix](/data-matrix/) to quickly multiply cases.

## Approach
With the aid of Last-Hit, we introduce [our approaches](/thinking-in-last-hit/) to you, which let us improve our automation testing works.  
In the other hand, we believe there's no silver bullet, different approaches will be found on different situations, for different indudstries and different domains, the most suitable one is the best one. We love hearing from you, to help us and community, just [submit your best practice](https://github.com/last-hit-aab/last-hit-pages-src) to us, and the following section are prepare for you.

# Best Practices
Feel free to [submit and share your best practice](https://github.com/last-hit-aab/last-hit-pages-src).
---
path: "/thinking-in-last-hit"
date: 2019-12-19T20:09:19.962Z
title: "Thinking in Last-Hit"
author: last-hit-aab
---

<p class="sub-title">Last-Hit is not only a tool, but a way to build whole lifecycle of UI test automation.</p>

# Eco-System
Record & Replay is the very first thing on UI automation test lifecycle, but it's not the only thing. To build a whole eco-system of automation, there are many things left. With the aid of Last-Hit, we would like to introduce our opinion to you, hope it is helpful.

# IDE
IDE is necessary anyway, people do record, debugging and make replay more smooth. Flows built by IDE should be used on continuous integration, replay in CI server again and again, ensure system is not broken by releases.  
For more information about IDE, visit [quick start](/quick-start/) and [practical tutorial](/tutorial/).

# Continuous Integration
We build [replay package](https://www.npmjs.com/package/last-hit-replayer) both for IDE and CI. Flows replayed in IDE successfully also can be replayed in CI server. To avoid OS difference, we use [Puppetter](https://pptr.dev/) for record & replay, built-in chromium is used for IDE, and headless in CI server.  

Replay summary report is collected by IDE, summary UI is provided. In the meantime, report data is stored at same folder where you run replayer on CI server and workspace folder, it can be easily to collect by yourself, and build any kind of report.  

We also provide [data matrix](/data-matrix/) and [centralized admin server](/admin-server/) for enterprise, to make it more efficient using exists flows, collecting and analysising replay summary data.

# Case Maintenance
We are less providing of case maintenance features, in our opinion, nothing can be more efficient than maintain them programmatically. Any features provided by tools are experience by providers themselves, they are referable and valuable, but hardly say they are suitable.  

There are many kinds of industries, the ever changing requirements ask coordinated reactions, not to mention the upgrading from framework changes and user experiences. In this sense, to find a silver bullet for every perspectives is not possible now.  

We store case data by plain JSON format, leave it to you to find your best way on case maintenance. It can be easily search, match and replace. We are looking forward to the best practices from community, [submit and share](https://github.com/last-hit-aab/last-hit-pages-src), all these experiences can be synthesized and applied otherwhere, and easier to find a benefit thinking of your situation.  

In our opinion, test cases are not treated as test cases any more, we think and operate them same as the structured data which is produced by our softwares. Our developers and test teams are working together, developers get involved on test process earlier, problems and tricks can be found earlier. When test teams are released from mass of manual works, they can delve more on scenarios design, improve e2e coverage or something else instead of repetitive and boring manual tasks. We think that's the thing really matters, don't you?
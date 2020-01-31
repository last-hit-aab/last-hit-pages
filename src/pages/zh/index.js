import { Link } from "gatsby"
import React from "react"
import Layout from "./components/layout"
import SEO from "./components/seo"
import "./index.css"

const IndexPage = () => (
	<Layout>
		<SEO title="首页" />
		<header
			style={{
				backgroundColor: "#282c34",
				color: "#ffffff",
				marginTop: 60,
			}}
		>
			<div className="index-large-screen main-idea">
				<div style={{ position: "relative" }}>
					<div className="large-screen-content">
						<h1 className="index-large-screen-name">Last-Hit</h1>
						<p>首个为所有团队成员定制的自动化测试工具。</p>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div>
								<Link
									to="/zh/quick-start/"
									className="index-get-start-btn"
								>
									现在开始
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="index-large-screen main-content"
				style={{ backgroundColor: "#fff" }}
			>
				<div style={{ position: "relative" }}>
					<div className="large-screen-content columns-3">
						<div>
							<h3>录制和播放</h3>
							<p>
								Last-Hit让创建自动化测试更容易。仅仅需要提供您的网站URL，即可高效进行录制工作，所有测试用例都将被存储为文件。
							</p>
							<p>
								JSON格式的文件存储方式，提供更为精准和方便的维护方式。
							</p>
						</div>
						<div>
							<h3>扩展和插件生态</h3>
							<p>
								开放的扩展插件生态，您可以方便的构造您自己的工作空间扩展插件，让测试用例播放变得更符合您的要求。
							</p>
							<p>
								您仅需了解Javascript，与网站开发完全使用同样的技术栈，更易学习和掌握。
							</p>
						</div>
						<div>
							<h3>持续集成</h3>
							<p>
								我们没有对您使用的持续集成工具进行假设，您可以将自动测试添加到您的持续集成脚本的最后。
							</p>
							<p>
								提供一个简单的报告，包含所有您的测试用例的关键数据，以及在自动播放期间产生的丰富的中间数据。您可以利用这些数据进行进一步分析和挖掘。
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="index-large-screen squashed">
				<div style={{ position: "relative" }}>
					<div className="large-screen-content ">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div>
								<Link
									to="/zh/quick-start/"
									className="index-get-start-btn"
								>
									现在开始
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	</Layout>
)

export default IndexPage

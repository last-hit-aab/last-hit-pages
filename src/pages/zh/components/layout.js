/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteZhTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	return (
		<>
			<Header siteTitle="Last Hit" />
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<main style={{ flexGrow: 1 }}>{children}</main>
				<footer className="body-footer">
					<div className="large-screen-content">
						<div>
							<p className="body-footer-block">
								Copyright © 2019 Last-Hit Team.
							</p>
							<p>
								<a href={`https://github.com/last-hit-aab`}>
									@ last-hit-aab
								</a>
								<a href={`https://github.com/last-hit-a`}>
									@ last-hit-a
								</a>
								<a href={`https://github.com/last-hit-b`}>
									@ last-hit-b
								</a>
							</p>
						</div>
						<div>
							<div className="body-footer-block">
								<header>文档</header>
								<a href="/zh/quick-start/">快速开始</a>
								<a href="/zh/main-concepts/">核心观点</a>
								<a href="/zh/tutorial/">教程</a>
								<a href="/zh/thinking-in-last-hit/">
									如Last-Hit般思考
								</a>
								<a href="/zh/ci/">持续集成</a>
							</div>
							<div className="body-footer-block">
								<header>扩展与插件</header>
								<a href="/zh/extensions/">扩展总揽</a>
								<a href="/zh/workspace-extension/">
									工作空间扩展
								</a>
							</div>
						</div>
						<div>
							<div className="body-footer-block">
								<header>企业特性</header>
								<a href="/zh/admin-server/">中央管理服务器</a>
								<a href="/zh/data-matrix/">数据魔方</a>
							</div>
							<div className="body-footer-block">
								<header>开源代码库</header>
								<a href="https://github.com/last-hit-aab/last-hit">
									主代码库
								</a>
								<a href="https://github.com/last-hit-aab/last-hit-pages-src">
									文档库
								</a>
								<a href="https://github.com/last-hit-aab/a-demo">
									示例库
								</a>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout

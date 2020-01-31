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
		query SiteTitleQuery {
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
								<header>DOCS</header>
								<a href="/quick-start/">Quick Start</a>
								<a href="/main-concepts/">Main Concepts</a>
								<a href="/tutorial/">Tutorial</a>
								<a href="/thinking-in-last-hit/">
									Thinking in Last-Hit
								</a>
								<a href="/ci/">Continuous Integration</a>
							</div>
							<div className="body-footer-block">
								<header>EXTENSIONS</header>
								<a href="/extensions/">Extensions</a>
								<a href="/workspace-extension/">
									Workspace Extension
								</a>
							</div>
						</div>
						<div>
							<div className="body-footer-block">
								<header>Enterprise</header>
								<a href="/admin-server/">
									Centralized Admin Server
								</a>
								<a href="/data-matrix/">Data Matrix</a>
							</div>
							<div className="body-footer-block">
								<header>OPEN SOURCE</header>
								<a href="https://github.com/last-hit-aab/last-hit">
									Main Repo
								</a>
								<a href="https://github.com/last-hit-aab/last-hit-pages">
									Docs Repo
								</a>
								<a href="https://github.com/last-hit-aab/a-demo">
									Demo Repo
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

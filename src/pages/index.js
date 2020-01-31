import { Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const IndexPage = () => (
	<Layout>
		<SEO title="Home" />
		<header style={{ backgroundColor: "#282c34", color: "#ffffff", marginTop: 60 }}>
			<div className="index-large-screen main-idea">
				<div style={{ position: "relative" }}>
					<div className="large-screen-content">
						<h1 className="index-large-screen-name">Last-Hit</h1>
						<p>
							First automation testing tool design for all team
							members.
						</p>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div>
								<Link
									to="/quick-start/"
									className="index-get-start-btn"
								>
									Get Started
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
							<h3>Record & Replay</h3>
							<p>
								Last-Hit makes it painless to create automation
								test cases. Last-Hit will efficiently record and
								store to case file, just simply provides your
								website urls.
							</p>
							<p>
								Files on JSON format make your test cases more
								predictable and easier to maintain.
							</p>
						</div>
						<div>
							<h3>Extension Ecosystem</h3>
							<p>
								Open extension ecosystem, you can easily build
								your own workspace extension to customize the
								replay logic.
							</p>
							<p>
								Javascript is the only technology you need to
								know, absolutely same as your web deveopment
								technology stack.
							</p>
						</div>
						<div>
							<h3>Continuous Integration</h3>
							<p>
								We don’t make assumptions about your ci tool, so
								you can append CI package simply at the end of
								your CI jobs.
							</p>
							<p>
								Simple report with key data of your cases, and
								rich in matierals created in the replay session.
								You can do more analysis and digging by these.
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
									to="/quick-start/"
									className="index-get-start-btn"
								>
									Get Started
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

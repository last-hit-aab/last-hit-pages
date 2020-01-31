import { Link } from "gatsby"
import React from "react"
import Layout from "./components/layout"
import SEO from "./components/seo"

const NotFoundPage = () => (
	<Layout>
		<SEO title="404: 页面未找到" />
		<div className="index-large-screen" style={{ marginTop: 40 }}>
			<div style={{ position: "relative" }}>
				<div className="large-screen-content">
					<h1>页面没有找到</h1>
					<p>
						您访问了一个不存在的网络有路。。。
					</p>
					<p>
						<Link to="/zh">回到首页</Link>
					</p>
				</div>
			</div>
		</div>
	</Layout>
)

export default NotFoundPage

import { Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
	<Layout>
		<SEO title="404: Not found" />
		<div className="index-large-screen" style={{ marginTop: 40 }}>
			<div style={{ position: "relative" }}>
				<div className="large-screen-content">
					<h1>NOT FOUND</h1>
					<p>
						You just hit a route that doesn&#39;t exist... the
						sadness.
					</p>
					<p>
						<Link to="/">Back to Home</Link>
					</p>
				</div>
			</div>
		</div>
	</Layout>
)

export default NotFoundPage

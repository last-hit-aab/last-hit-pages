import { graphql } from "gatsby"
import React from "react"
import SEO from "../pages/zh/components/seo"
import "./docs.css" // make it pretty!
import Layout from "../pages/zh/components/layout"

export default function Template({
	data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
	const { markdownRemark: post } = data // data.markdownRemark holds your post data

	React.useEffect(() => {
		document.documentElement.setAttribute("data-on-doc", true)
		return () => {
			document.documentElement.setAttribute("data-on-doc", false)
		}
	})
	return (
		<Layout>
			<SEO title={post.frontmatter.title} />
			<div className="index-large-screen ">
				<div style={{ position: "relative" }}>
					<div className="large-screen-content doc-container">
						<div className="doc-content">
							<h1>{post.frontmatter.title}</h1>
							<div
								dangerouslySetInnerHTML={{ __html: post.html }}
							/>
							<div className="doc-footer">
								Last Modified @ {post.frontmatter.date} by{" "}
								<a
									href={`https://github.com/${post.frontmatter.author}`}
								>
									{post.frontmatter.author}
								</a>
							</div>
						</div>
						<div
							className="doc-toc"
							dangerouslySetInnerHTML={{
								__html: post.tableOfContents,
							}}
						/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const pageQuery = graphql`
	query ZhDocsByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			tableOfContents(pathToSlugField: "frontmatter.path")
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				path
				title
				author
			}
		}
	}
`

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
var rimraf = require("rimraf");


const fs = require('fs');

exports.onPostBuild = function () {
	// fs.renameSync(path.join(__dirname, 'public'), path.join(__dirname, 'temp'));

	// deleteFolderRecursive(path.join(__dirname, 'docs'))

	rimraf.sync(path.join(__dirname, 'docs'));
	// fs.rmdir(path.join(__dirname, 'docs'), { recursive: true })
	// fs.mkdirSync(path.join(__dirname, 'docs'));

	fs.renameSync(path.join(__dirname, 'public'), path.join(__dirname, 'docs'));
};


const deleteFolderRecursive = function (path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file, index) => {
			const curPath = path.join(path, file);
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};


exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions
	const docTemplate = path.resolve(`src/templates/docs.js`)
	const zhDocTemplate = path.resolve(`src/templates/zh-docs.js`)

	const result = await graphql(`
		{
			allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
				limit: 1000
			) {
				edges {
					node {
						frontmatter {
							path
						}
					}
				}
			}
		}
	`)
	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`)
		return
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		if (node.frontmatter.path.startsWith("/zh")) {
			createPage({
				path: node.frontmatter.path,
				component: zhDocTemplate,
				context: {}, // additional data can be passed via context
			})
		} else {
			createPage({
				path: node.frontmatter.path,
				component: docTemplate,
				context: {}, // additional data can be passed via context
			})
		}
	})
}

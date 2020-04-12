import React from "react"
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 124px;
	margin-bottom: 48px;
	> div:first-child {
		margin: auto;
		color: rgba(0,0,0,0.5);
		margin-bottom: 4px;
		font-size: 16px;
	}
	> div:nth-child(2) {
		margin: auto;
		font-size: 48px;
		font-weight: 700;
		line-height: 48px;
	}
`;
const Plans = styled.div`
	display: grid;
	grid-template-columns: 1fr repeat(4, 200px);
	padding-top: 48px;
	margin: auto;
	width: 1200px;
	> div[data-role=title] {
		display: flex;
		flex-direction: column;
		padding: 16px 24px 32px;
		border: 2px solid #2B95D6;
		border-bottom: 0;
		&:not(:nth-child(2)) {
			border-left: 0;
		}
		&:nth-child(2) {
			border-top-left-radius: 8px;
		}
		&:nth-child(5) {
			border-top-right-radius: 8px;
		}
		&:nth-child(2),
		&:nth-child(3) {
			> span {
				opacity: 0.7;
			}
		}
		&:nth-child(4),
		&:nth-child(5) {
			background-color: #106BA3;
			color: #fff;
		}
		> span:first-child {
			font-size: 24px;
			font-weight: 700;
			margin-bottom: 8px;
			text-align: center;
		}
		> span:nth-child(2) {
			font-size: 12px;
			opacity: 0.5;
			line-height: 1.2em;
			text-align: center;
		}
	}
	> div[data-role=feature] {
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 600;
		border: 2px solid #2B95D6;
		border-right: 0;
		> span {
			opacity: 0.7;
		}
		&:nth-child(6) {
			border-top-left-radius: 8px;
		}
		&:nth-last-child(10) {
			border-bottom-left-radius: 8px;
		}
		&:not(:nth-child(-n+10)) {
			border-top: 0;
		}
	}
	> div[data-role=feature-checked],
	> div[data-role=feature-unchecked] {
		padding: 8px 16px;
		text-align: center;
		border: 2px solid #2B95D6;
		&:not(:nth-child(5n+2)) {
			border-left: 0;
		}
		&:not(:nth-child(-n+10)) {
			border-top: 0;
		}
	}
	> div[data-role=feature-checked] {
		> svg {
			width: 15px;
			color: #2B95D6;
			margin-top: 3px;
			margin-bottom: -3px;
		}
	}
	> div[data-role=feature-unchecked] {
		> svg {
			width: 13px;
			color: #FF7373;
			margin-top: 4px;
			margin-bottom: -4px;
		}
	}
	> div[data-role=price-free] {
		font-size: 14px;
		font-weight: 600;
		text-align: center;
		padding: 8px 16px;
		border: 2px solid #2B95D6;
		border-top: 0;
		border-bottom-left-radius: 8px;
		> span {
			opacity: 0.7;
			> a {
				color: #106BA3;
			}
		}
	}
	> div[data-role=price-month] {
		font-size: 14px;
		font-weight: 600;
		text-align: center;
		padding: 8px 16px;
		border: 2px solid #2B95D6;
		border-top: 0;
		border-left: 0;
		> span {
			opacity: 0.7;
			> span:first-child {
				font-style: italic;
				color: #106BA3;
			}
			> span:nth-child(2) {
				font-size: 20px;
				margin-right: 4px;
				font-style: italic;
				color: #106BA3;
			}
			> span:nth-child(4) {
				font-size: 12px;
				opacity: 0.5;
				display: block;
				line-height: 1.2em;
			}
		}
	}
	> div[data-role=price-sales] {
		font-size: 14px;
		font-weight: 600;
		text-align: center;
		padding: 8px 16px;
		border: 2px solid #2B95D6;
		border-top: 0;
		border-left: 0;
		border-bottom-right-radius: 8px;
		> span {
			opacity: 0.7;
			> a {
				color: #106BA3;
				text-underline: none;
			}
		}
	}
`

const plans = [
	{
		title: 'Free', description: 'Last-Hit individual for every tester', ide: true, replayer: true, ext: true,
	},
	{
		title: 'Pro', description: 'Advanced data matrix for your project', ide: true, replayer: true, ext: true,
		matrix: true,
		upgrade: true
	},
	{
		title: 'Team',
		description: 'Essential management and security for small teams',
		ide: true,
		replayer: true,
		ext: true,
		matrix: true,
		admin: true,
		upgrade: true
	},
	{
		title: 'Enterprise',
		description: 'Security, compliance, and flexible deployment for enterprises',
		ide: true,
		replayer: true,
		ext: true,
		matrix: true,
		admin: true,
		upgrade: true
	},
]

const features = [
	{key: 'ide', description: 'Cross-platform IDE, supports Windows/MAC/Linux'},
	{key: 'replayer', description: 'Individual flow replayer'},
	{key: 'ext', description: 'Extension on flow replaying'},
	{key: 'matrix', description: 'Data matrix'},
	{key: 'admin', description: 'Centralize admin server edition'},
	{key: 'upgrade', description: 'One year free upgrading'}
]

export default () => {
	return <Layout>
		<SEO title="Home"/>
		<Container>
			<div>Pricing</div>
			<div>Plans for all teams</div>
			<Plans>
				<div/>
				{plans.map(plan => {
					return <div data-role={"title"} key={plan.title}>
						<span>{plan.title}</span><span>{plan.description}</span></div>
				})}
				{features.map(feature => {
					return <>
						<div data-role={"feature"} key={feature.key}>
							<span>{feature.description}</span>
						</div>
						{plans.map(plan => {
							if (plan[feature.key] === true) {
								return <div key={plan.title} data-role={"feature-checked"}>
									<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
									     role="img"
									     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
									     className="svg-inline--fa fa-check fa-w-16 fa-2x">
										<path fill="currentColor"
										      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
										      className=""/>
									</svg>
								</div>
							} else {
								return <div key={plan.title} data-role={"feature-unchecked"}>
									<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
									     role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"
									     className="svg-inline--fa fa-times fa-w-11 fa-3x">
										<path fill="currentColor"
										      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
										      className=""/>
									</svg>
								</div>
							}
						})}
					</>
				})}
				<div/>
				<div data-role={"price-free"}>
					<span>Go, find on <a href={"https://www.npmjs.com/search?q=last-hit"} target={"_blank"}
					                     rel="noopener noreferrer">NPM</a></span>
				</div>
				<div data-role={"price-month"}>
					<span><span>$</span><span>99</span><span>/ month</span><span>available for single project</span></span>
				</div>
				<div data-role={"price-month"}>
					<span><span>$</span><span>499</span><span>/ month</span><span>available for 1 - 20 members</span></span>
				</div>
				<div data-role={"price-sales"}>
					<span><a href={"mailto:last.hit.aab@yandex.com"}>Contact Me</a></span>
				</div>
			</Plans>
		</Container>
	</Layout>
}
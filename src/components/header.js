import {graphql, Link, useStaticQuery} from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"

const Image = () => {
    const data = useStaticQuery(graphql`
		query {
			placeholderImage: file(relativePath: { eq: "256x256.png" }) {
				childImageSharp {
					fixed(width: 32, height: 32) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`)

    return (
        <Img
            fixed={data.placeholderImage.childImageSharp.fixed}
            style={{
                marginRight: 8,
                marginBottom: -10,
                filter:
                    "invert(50%) sepia(42%) saturate(1637%) hue-rotate(164deg) brightness(103%) contrast(97%)",
            }}
        />
    )
}

const Header = ({siteTitle}) => (
    <header
        style={{
            backgroundColor: "#20232a",
            color: "#ffffff",
            position: "fixed",
            width: "100%",
            zIndex: 1000,
        }}
    >
        <div
            style={{
                margin: "0 auto",
                maxWidth: 1260,
                padding: "0 1.0875rem",
                display: "flex",
            }}
        >
            <h1 className="header-logo">
                <Link
                    to="/"
                    style={{
                        color: "#61dafb",
                        textDecoration: "none",
                        fontSize: 20,
                    }}
                >
                    <Image/>
                    <span>{siteTitle}</span>
                </Link>
            </h1>
            <div className="header-menus flex-grab">
                {[
                    {text: "Quick-Start Guide", location: "/quick-start/"},
                    {text: "Tutorial", location: "/tutorial/"},
                    {text: "Docs", location: "/docs/"},
                    {text: "CI", location: "/ci/"},
                    {text: "Extensions", location: "/extensions/"},
                    {text: "Price", location: "/price/"}
                ].map(item => {
                    return (
                        <Link
                            key={item.text}
                            to={item.location}
                        >
                            {item.text}
                        </Link>
                    )
                })}
            </div>
            <div className="header-menus">
                <Link
                    to="/languages/"
                    style={{
                        color: "#ffffff",
                        textDecoration: "none",
                        fontSize: 14,
                        padding: "0 20px 0 54px",
                        lineHeight: "60px",
                        position: "relative",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{
                            fill: "#ffffff",
                            position: "absolute",
                            top: "50%",
                            left: 20,
                            transform: "translateY(-50%)",
                        }}
                    >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "></path>
                    </svg>
                    Languages
                </Link>
                <a
                    href="https://github.com/last-hit-aab/last-hit"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "#ffffff",
                        textDecoration: "none",
                        fontSize: 14,
                        padding: "0 40px 0 20px",
                        lineHeight: "60px",
                        position: "relative",
                    }}
                >
                    Github
                    <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        width="15"
                        height="15"
                        style={{
                            opacity: 0.7,
                            fill: "#ffffff",
                            position: "absolute",
                            top: "50%",
                            right: 20,
                            transform: "translateY(-50%)",
                        }}
                    >
                        <path
                            fill="currentColor"
                            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                        ></path>
                        <polygon
                            fill="currentColor"
                            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                        ></polygon>
                    </svg>
                </a>
            </div>
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: "",
}

export default Header

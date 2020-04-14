import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

//all the shit from glomo-web
// import PreFooter from "../components/PreFooter/PreFooter"
// import FeaturedProse from "../components/FeaturedProse"
// import NewsFeed from "../components/NewsFeed"
// import SectionHeader from "../components/Headers"
import LogosFeed from "../components/LogosFeed/LogosFeed"
import ShowcaseTilesWrapper from "../components/ShowcaseTiles"
import Testimonial from "../components/Testimonial"
// import ArticleWrapper from "../components/Articles/ArticleWrapper"
import PageFade from "../components/PageFade"
import Footer from "../components/Footer"
import Menu from "../components/Menu"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          glomo web data
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }          
          excerpt
        }
      }
    }
  }
`
import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Header from "./header"

export default ({ children }) => {
  const data = useStaticQuery(  
    graphql`
      query {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }            
          }
        }
      }
    `
  )

  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 800px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
      {children}
    </div>
  )
}
import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Logo from "../assets/img/glomo-logo.svg"

const Splash = ({ siteTitle, menuLinks }) => (
  <div css={css`
    margin: 0 auto;
    max-width: 800px;
    padding: ${rhythm(2)};
    padding-top: ${rhythm(1.5)};
  `}
  >
    <Logo width="200px" css={css`
      margin: 0 auto;
      max-width: 800px;
    `}/>
  </div>
)


export default Splash
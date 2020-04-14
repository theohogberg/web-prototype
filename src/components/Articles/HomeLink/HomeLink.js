import React from 'react'
import Logo from 'assets/img/glomo-logo.svg'

const HomeLink = () => {
   return (
      <div className="home-link">
         <a href="/" className="home-link__link">
            <img src={Logo} className="home-link-logo" alt="Glomo Logo" />
         </a>
      </div>
   )
}
export default HomeLink

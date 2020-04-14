import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Socialmedia extends Component {
   render() {
      const { slug, link, icon } = this.props
      return (
         <div className={`${slug} socialmedia`}>
            <a
               className="link"
               target="_blank"
               rel="noopener noreferrer"
               href={link}
               aria-label="Icon images"
            >
               <svg
                  version="1.1"
                  className="social-media-logos"
                  background={icon}
                  baseProfile="full"
                  width="32px"
                  height="32px"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <image width="100%" height="100%" xlinkHref={icon} />
               </svg>
            </a>
         </div>
      )
   }
}

Socialmedia.propTypes = {
   slug: PropTypes.string,
   link: PropTypes.string,
   icon: PropTypes.string,
}
export default Socialmedia

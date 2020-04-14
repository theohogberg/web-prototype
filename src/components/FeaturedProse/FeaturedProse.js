import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import Scrolling from 'util/Scrolling'

/**
 * NOTE: styles inherited from from src/App.scss for html elements
 */

const FeaturedProse = ({ animate, title, text, showDot }) => {
   let titleComponent = title
   let textComponent = text

   if (typeof title === 'string') {
      titleComponent = <h6 className="featured-prose__label">{title}</h6>
   } else {
      titleComponent = cloneElement(titleComponent, {
         className: 'featured-prose__label',
      })
   }

   if (typeof text === 'string') {
      textComponent = <h2 className="featured-prose__text">{text}</h2>
   } else {
      textComponent = cloneElement(textComponent, {
         className: 'featured-prose__text',
      })
   }

   return (
      <article>
         <section>
            <Scrolling animate={animate}>
               {titleComponent}
               {textComponent}
               {showDot && <div className="featured-prose__point" />}
            </Scrolling>
         </section>
      </article>
   )
}

FeaturedProse.defaultProps = {
   showDot: true,
   animate: false,
}

FeaturedProse.propTypes = {
   title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
   text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
   showDot: PropTypes.bool,
   animate: PropTypes.bool,
}

export default FeaturedProse

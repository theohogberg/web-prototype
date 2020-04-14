import React from 'react'
import PropTypes from 'prop-types'
import { Hexagon } from 'glomo-boxes'
import Moment from 'react-moment'

const Author = ({ name, timestamp, minuteRead, image, colorTheme }) => {
   return (
      <div className="author">
         <div className="author__left">
            {image ? (
               <Hexagon width="88px" backgroundImage={image} />
            ) : (
               <Hexagon width="88px" backgroundColor={'#CCC'} />
            )}
         </div>

         <div
            className={`author__right ${colorTheme && 'theme-' + colorTheme}`}
         >
            <p className="author-name">{name}</p>
            {timestamp && (
               <p className="author-timestamp">
                  <Moment format="D MMMM Y">{timestamp}</Moment>
               </p>
            )}
            {minuteRead && (
               <p className="author-minute">{minuteRead} min read</p>
            )}
         </div>
      </div>
   )
}
Author.propTypes = {
   name: PropTypes.string,
   timestamp: PropTypes.string,
   minuteRead: PropTypes.number,
   image: PropTypes.string,
   colorTheme: PropTypes.oneOf(['dark', 'light']),
}
export default Author

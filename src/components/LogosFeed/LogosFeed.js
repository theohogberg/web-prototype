import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
// flytta index logos typ hit
import * as logos from '../../assets/img/logos'
import Media from '../Media'
const LogosFeed = props => {
   const { columns = 4 } = props

   const extractLogos = logos => {
      if (typeof logos === 'object') {
         return Object.values(logos)
      } else if (typeof logos !== 'object' && typeof logos !== 'array') {
         throw new Error(`LogosFeed: Imported logos are the incorrect format. 
         Received format: [${typeof logos}]. Expected formats: object, array`)
         return
      }

      return logos
   }

   const clamp = (num, min, max) => {
      if (num <= min) return min
      if (num >= max) return max

      return num
   }

   const extractedLogos = extractLogos(logos)
   const columnsClamped = clamp(columns, 1, 5)

   return (
      <article
         className={[
            'logosWrapper',
            `logosWrapper__columns-${columnsClamped}`,
         ].join(' ')}
      >
         {extractedLogos.map((logo, index) => (
            <Link className="link" key={index} to="/clients">
               <Media component="img" lazy className="image" src={logo} alt="Client Logo" />
            </Link>
         ))}
      </article>
   )
}

LogosFeed.propTypes = {
   /* Sets the amount of columns per row of logos. Only applies to viewports >764px */
   columns: PropTypes.oneOf([1, 2, 3, 4, 5]),
   className: PropTypes.string,
}

LogosFeed.uiName = 'LogosFeed'

export default LogosFeed

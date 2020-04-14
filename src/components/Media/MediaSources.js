import React from 'react'
import PropTypes from 'prop-types'

/**
 * Generic breakpoints
 */
const breakpoints = {
   xs: 0,
   sm: 600,
   md: 960,
   lg: 1280,
   xl: 1920,
}

/**
 * MediaSources is used to generate <source ... /> tags used
 * in a <picture /> element.
 */
const MediaSources = props => {
   const { srcSets, ...other } = props
   const keys = Object.keys(breakpoints).reverse()

   return keys.map(key => {
      const srcSet = srcSets[key]
      const width = breakpoints[key]
      const media = `(min-width: ${width}px)`

      if (srcSet === undefined) {
         return null
      }

      if (typeof srcSet === 'string') {
         return <source key={key} media={media} srcSet={srcSet} {...other} />
      }

      return srcSet.map(({ src, type }) => (
         <source key={`${type}_${key}`} type={type} srcSet={src} {...other} />
      ))
   })
}

const sourceType = PropTypes.shape({
   type: PropTypes.source,
   src: PropTypes.string.isRequired,
})

MediaSources.propTypes = {
   srcSets: PropTypes.shape({
      xs: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(sourceType)])
         .isRequired,
      sm: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.arrayOf(sourceType),
      ]),
      md: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.arrayOf(sourceType),
      ]),
      lg: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.arrayOf(sourceType),
      ]),
      xl: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.arrayOf(sourceType),
      ]),
   }).isRequired,
}

MediaSources.uiName = 'MediaSources'

export default MediaSources

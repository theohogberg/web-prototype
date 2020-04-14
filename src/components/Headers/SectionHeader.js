import React from 'react'
import PropTypes from 'prop-types'

const SectionHeader = ({ header, type, className, color, opacity }) => {
   let ComponentProp = type

   const classNames = [className, 'section-header uppercase'].join(' ')

   return (
      <ComponentProp style={{ color, opacity }} className={classNames}>
         {header}
      </ComponentProp>
   )
}

SectionHeader.defaultProps = {
   type: 'h6',
   color: '#000',
   opacity: 0.75,
}

SectionHeader.propTypes = {
   header: PropTypes.string.isRequired,
   type: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
   className: PropTypes.string,
   color: PropTypes.string,
   opacity: PropTypes.number,
}
export default SectionHeader

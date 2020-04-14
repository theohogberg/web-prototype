import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ isFetching }) => {
   return (
      <div className={`loader ${isFetching ? 'show' : ''}`}>
         <div className="loader-icon">
            <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
               <circle id="loading-inner" cx="75" cy="75" r="60" />
            </svg>
         </div>
      </div>
   )
}
Loader.propTypes = {}
export default Loader

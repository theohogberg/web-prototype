import React, { Component } from 'react'

class Hamburger extends Component {
   render() {
      const { open, toggle } = this.props
      const stateClass = open ? 'active' : 'inactive'
      const componentClasses = ['hamburger', stateClass]

      return (
         <div className={componentClasses.join(' ')} onClick={toggle}>
            <div className="hamburger-inner">
               <div className="hamburger__bar1" />
               <div className="hamburger__bar2" />
               <div className="hamburger__bar3" />
            </div>
         </div>
      )
   }
}
export default Hamburger

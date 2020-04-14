import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as ScrollMagic from 'scrollmagic'
import controller from './scrollmagic'

export default class Scrolling extends Component {
   static propTypes = {
      animate: PropTypes.bool,
   }

   constructor() {
      super()
      this.scene = null
   }

   componentDidMount() {
      this.scene = new ScrollMagic.Scene({
         triggerElement: this.myDiv,
         triggerHook: 0.68,
      })
         .setClassToggle(this.myDiv, 'active')
         .on('leave', this.keepClassActive)
         .addTo(controller) // assign the scene to the controller
   }

   componentWillUnmount() {
      this.scene.destroy()
   }

   keepClassActive = e => {
      const triggerElement = e.target.triggerElement()
      if (triggerElement.classList.contains('active')) {
         return
      }
      triggerElement.classList.add('active')
   }

   render() {
      const { animate } = this.props
      return (
         <div className={animate && 'scrollarea'} ref={el => (this.myDiv = el)}>
            {this.props.children}
         </div>
      )
   }
}

import React, { Component } from 'react'
import LoadImages from './LoadImages'
import * as ScrollMagic from 'scrollmagic'
import controller from 'util/scrollmagic'
import { resize } from 'glomo-boxes'

const BREAKPOINT = 480

export default class ClientPage extends Component {
   _isMounted = false
   constructor(props) {
      super(props)
      this.state = {
         images: [],
         isDesktop: null,
         windowWidth: null,
      }
      this.scenes = []
   }

   addCaseHoverScene = element => {
      if (element && window.innerWidth < BREAKPOINT) {
         const newScene = new ScrollMagic.Scene({
            triggerElement: element,
            offset: 10,
            duration: 196,
         })
            .setClassToggle(element, 'active')
            .addTo(controller) // assign the scene to the controller
         this.scenes.push(newScene)
      }
   }

   componentDidMount() {
      document.addEventListener('resize', this.resize)
   }
   componentWillUnmount() {
      document.removeEventListener('resize', this.resize)
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({
            isDesktop: true,
            windowWidth: window.innerWidth,
         })
         this.scenes.map(scene => {
            scene.enabled(false)
         })
         const cases = [].slice.call(
            document.getElementsByClassName('case-home')
         )
         cases.map(e => {
            e.classList.remove('active')
         })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({
            isDesktop: false,
            windowWidth: window.innerWidth,
         })
         this.scenes.map(scene => {
            scene.enabled(true)
         })
      }
   }

   render() {
      let clientImages = Object.values(LoadImages).map((val, i) => {
         const caseStyle = {
            backgroundImage: `url(${val.src})`,
            backgroundRepeat: 'no-repeat',
            borderRadius: '1vh',
         }
         const classes = ['case', 'case--full', `case-${i + 1}`]
         return (
            <div
               key={i}
               className={classes.join(' ')}
               style={caseStyle}
               ref={e => this.addCaseHoverScene(e)}
            >
               <div className="case__inner">
                  <div className="case__content">
                     <h3 className="case__title"> {val.title} </h3>
                     <p className="case__excerpt"> {val.text} </p>
                  </div>
               </div>
            </div>
         )
      })
      return (
         <div>
            <div className="case-list">{clientImages}</div>
         </div>
      )
   }
}

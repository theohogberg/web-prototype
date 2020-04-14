import React, { Component } from 'react'
import PropTypes from 'prop-types'
import linkedin from 'assets/img/linkedinShare.svg'
import facebook from 'assets/img/facebookShare.svg'
import twitter from 'assets/img/twitterShare.svg'
import { loadFbApi, facebookShare } from './facebook'
import { loadTwitterApi, twitterShare } from './twitter'
import { loadLinkedinApi, linkedinShare } from './linkedin'
import * as ScrollMagic from 'scrollmagic'

class ShareButtons extends Component {
   constructor(props) {
      super(props)
      this.state = {
         scene: null,
      }
   }

   componentDidMount() {
      loadFbApi()
      loadTwitterApi()
      loadLinkedinApi()
      const controller = new ScrollMagic.Controller({})
      const triggerElement = document.getElementById('articleTextParagraph')
      const scene = new ScrollMagic.Scene({
         triggerElement: '#articleTextParagraph',
         offset: 300,
         duration: triggerElement.offsetHeight,
      })
         .setClassToggle('#shareButtons', 'active')
         .addTo(controller) // assign the scene to the controller

      this.setState({ scene: scene })
   }
   componentDidUpdate() {
      const triggerElement = document.getElementById('articleTextParagraph')
      this.state.scene.duration(triggerElement.offsetHeight - 166)
   }
   render() {
      const { url } = this.props
      return (
         <div className="share-buttons" id="shareButtons">
            <span className="share-title">Share</span>
            <div className="buttons">
               <button
                  className="share-button"
                  onClick={() => facebookShare(url)}
               >
                  <img className="share-icon" src={facebook} />
               </button>
               <button
                  className="share-button"
                  onClick={() => linkedinShare(url)}
               >
                  <img className="share-icon" src={linkedin} />
               </button>
               <button
                  className="share-button twitter-share"
                  onClick={() => twitterShare(url)}
               >
                  <img className="share-icon" src={twitter} />
               </button>
            </div>
         </div>
      )
   }
}
ShareButtons.propTypes = {}
export default ShareButtons

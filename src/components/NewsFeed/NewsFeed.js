import React, { Component } from 'react'
import { Hexagon } from 'glomo-boxes'

import pascal from '@assets/img/pascal.png'
//import Media from '../Media'

const BREAKPOINT = 768

class NewsFeed extends Component {
   constructor(props) {
      super(props)

      this.state = {
         _isMounted: false,
         isDesktop: !(window.innerWidth < BREAKPOINT),
      }
   }

   componentDidMount() {
      document.addEventListener('resize', this.resize)

      if (this.scrollContainer != null) {
         this.scrollContainer.addEventListener('scroll', this.onScroll)
      }
   }
   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({ isDesktop: true, windowWidth: window.innerWidth })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({ isDesktop: false, windowWidth: window.innerWidth })
      }
      if (this.scrollContainer != null) {
         this.scrollContainer.addEventListener('scroll', this.onScroll)
      }
   }
   componentWillUnmount() {
      document.removeEventListener('resize', this.resize)
   }
   renderBlogContent = () => {}

   renderNewsContent = () => {
      return (
         <div className="news-signup">
            <Media
               component="picture"
               lazy
               className="news-signup__image"
               srcSets={{
                  xs: [
                     {
                        type: 'image/webp',
                        src: pascalWebp,
                     },
                  ],
               }}
               src={pascal}
               alt="pascal"
            />
            <h3 className="news-signup__title">GLOMO FLASH</h3>
            <Signup />
         </div>
      )
   }

   render() {
      const squareStyling = {
         backgroundColor: '#363636',
      }
      return (
         <div
            className="article-feature"
            ref={node => (this.scrollContainer = node)}
         >
            <div className="article-feature">
               {this.state.isDesktop ? (
                  <div className="article-feature__hex">
                     <Hexagon
                        gradientAngle={53}
                        backgroundColor={'#363636'}
                        shadow="drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.5))"
                     >
                        <div className="content">
                           {this.renderNewsContent()}
                        </div>
                     </Hexagon>
                  </div>
               ) : (
                  <div className="article-feature__square">
                     <div style={squareStyling}>{this.renderNewsContent()}</div>
                  </div>
               )}
            </div>
         </div>
      )
   }
}

export default NewsFeed
